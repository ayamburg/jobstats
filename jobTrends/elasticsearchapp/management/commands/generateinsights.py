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


def frontend():
    # read top skills
    file = open(top_skills_path + "frontend.json")
    skills_hash = json.load(file)['skills']
    top_skills = []
    for skill in skills_hash:
        top_skills.append(skill['key'])

    # get data
    percent_trend_data = data_handler.get_trend_data([], top_skills, '0', 'day', [], ['front end', 'frontend'], [])
    raw_trend_data = data_handler.get_trend_data([], top_skills, '1', 'day', [], ['front end', 'frontend'], [])
    city_datasets = []
    for city in cities:
        city_datasets.append(
            data_handler.get_trend_data([], top_skills, '1', 'day', [], ['front end', 'frontend'], [city]))
    weekly_trend_data = data_handler.get_trend_data([], top_skills, '0', 'week', [], ['front end', 'frontend'], [])
    daily_trend_data = data_handler.get_trend_data([], top_skills, '0', 'day', [], ['front end', 'frontend'], [])

    # get insights
    insights = []
    insights.append(get_trending_up(percent_trend_data))
    insights.append(get_trending_down(percent_trend_data))
    insights.append(get_skill_location(city_datasets, raw_trend_data))
    insights.append(get_dominant_skill(weekly_trend_data))
    insights.append(get_correlation(daily_trend_data))

    # write to file
    timestamp = str(datetime.datetime.now())
    if os.path.isfile(insights_path + "frontend.json"):
        os.rename(insights_path + "frontend.json", insights_path + "historical/frontend{0}.json".format(timestamp))
    write_file = open(insights_path + "frontend.json", "w+")
    json.dump({'insights': insights}, write_file)


class Command(BaseCommand):
    help = 'Generates Insights'

    def handle(self, *args, **options):
        frontend()
