# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField
from jobTrends.data_handler import DataHandler
from .insights import get_trending_up, get_trending_down, get_dominant_skill, get_skill_location, \
    get_correlation
import time


class Tile(models.Model):
    filters = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    locations = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    companies = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    titles = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    blacklists = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    whitelists = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    title = models.CharField(max_length=200)
    insights = JSONField(null=True, blank=True)
    top_skills = JSONField(null=True, blank=True)
    name = models.CharField(max_length=200)

    def generate_insights_for_location_page(self):
        name = self.name
        skills_hash = self.top_skills
        filters = self.filters
        companies = self.companies
        titles = self.titles
        locations = self.locations

        data_handler = DataHandler(1541203200000)

        top_skills = []
        for skill in skills_hash:
            top_skills.append(skill['key'])

        # get data
        percent_trend_data = data_handler.get_trend_data(filters, top_skills, '0', 'day', companies, titles, locations)
        weekly_trend_data = data_handler.get_trend_data(filters, top_skills, '0', 'week', companies, titles, locations)
        daily_trend_data = data_handler.get_trend_data(filters, top_skills, '0', 'day', companies, titles, locations)

        # get insights
        insights = []
        insights.append(get_trending_up(percent_trend_data))
        insights.append(get_trending_down(percent_trend_data))
        insights.append(get_dominant_skill(weekly_trend_data))
        insights.append(get_correlation(daily_trend_data))

        insights = [insight for insight in insights if insight['score'] > 2]
        self.insights = insights
        super().save()

        return True

    def generate_insights(self):
        name = self.name
        skills_hash = self.top_skills
        filters = self.filters
        companies = self.companies
        titles = self.titles
        locations = self.locations

        if locations:
            self.generate_insights_for_location_page()
            return True

        data_handler = DataHandler(1541203200000)
        cities = ['new york',
                  'austin',
                  'baltimore',
                  'charlotte',
                  'boston',
                  'colorado springs',
                  'boulder',
                  'seattle',
                  'san jose',
                  'san francisco']

        top_skills = []
        for skill in skills_hash:
            top_skills.append(skill['key'])

        # get data
        percent_trend_data = data_handler.get_trend_data(filters, top_skills, '0', 'day', companies, titles, [])
        raw_trend_data = data_handler.get_trend_data(filters, top_skills, '1', 'day', companies, titles, [])
        city_datasets = []
        for city in cities:
            city_datasets.append(
                data_handler.get_trend_data(filters, top_skills, '1', 'day', companies, titles, [city]))
        weekly_trend_data = data_handler.get_trend_data(filters, top_skills, '0', 'week', companies, titles, [])
        daily_trend_data = data_handler.get_trend_data(filters, top_skills, '0', 'day', companies, titles, [])

        # get insights
        insights = []
        insights.append(get_trending_up(percent_trend_data))
        insights.append(get_trending_down(percent_trend_data))
        if name != 'amazon':
            insights.append(get_skill_location(city_datasets, raw_trend_data))
        insights.append(get_dominant_skill(weekly_trend_data))
        insights.append(get_correlation(daily_trend_data))

        insights = [insight for insight in insights if insight['score'] > 2]
        self.insights = insights
        super().save()

        return True

    def generate_top_skills(self):
        week = 604800000
        month = 2592000000
        start = int(time.time() * 1000 - month * 6)

        filters = self.filters
        companies = self.companies
        titles = self.titles
        locations = self.locations

        data_handler = DataHandler(start)

        self.top_skills = data_handler.get_top_skills(10, filters, companies, titles, locations)
        super().save()

        return True


class CustomTile(Tile):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class StandardTile(Tile):
    style = JSONField(null=True, blank=True)
