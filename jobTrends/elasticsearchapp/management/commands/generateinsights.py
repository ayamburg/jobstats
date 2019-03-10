from django.core.management.base import BaseCommand, CommandError
from .insights import *
from jobTrends.data_handler import DataHandler
import json
import os
import datetime

top_skills_path = "jobTrends/top_skills/"
insights_path = "jobTrends/insights/"
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


def generate_insights_for_location_page(name, filters, companies, titles, locations):
    # read top skills
    file = open(top_skills_path + name + ".json")
    skills_hash = json.load(file)['skills']
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

    # write to file
    timestamp = str(datetime.datetime.now())
    if os.path.isfile(insights_path + name + ".json"):
        os.rename(insights_path + name + ".json", insights_path + "historical/{0}{1}.json".format(name, timestamp))
    write_file = open(insights_path + name + ".json", "w+")
    json.dump({'insights': insights}, write_file)


def generate_insights(name, filters, companies, titles):
    # read top skills
    file = open(top_skills_path + name + ".json")
    skills_hash = json.load(file)['skills']
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
    insights.append(get_skill_location(city_datasets, raw_trend_data))
    insights.append(get_dominant_skill(weekly_trend_data))
    insights.append(get_correlation(daily_trend_data))

    # write to file
    timestamp = str(datetime.datetime.now())
    if os.path.isfile(insights_path + name + ".json"):
        os.rename(insights_path + name + ".json", insights_path + "historical/{0}{1}.json".format(name, timestamp))
    write_file = open(insights_path + name + ".json", "w+")
    json.dump({'insights': insights}, write_file)


class Command(BaseCommand):
    help = 'Generates Insights'

    def handle(self, *args, **options):
        generate_insights('frontend', [], [], ['front end', 'frontend'])
