from django.core.management.base import BaseCommand, CommandError
from .insights import *
from jobTrends.data_handler import DataHandler
import json


class Command(BaseCommand):
    help = 'Generates Insights'

    def handle(self, *args, **options):
        top_skills_path = "jobTrends/top_skills/"
        insights_path = "jobTrends/insights/"
        data_handler = DataHandler(1541203200000)

        #frontend
        insights = []
        file = open(top_skills_path + "frontend.json")
        top_skills = json.load(file)['skills']
        top_skills = (skill['key'] for skill in top_skills)
        percent_trend_data = data_handler.get_trend_data([], top_skills, '0', 'day', [], ['front end', 'frontend'], [])
        insights.append(get_trending_up(percent_trend_data))
        insights.append(get_trending_down(percent_trend_data))
        write_file = open(insights_path + "frontend.json", "w+")
        json.dump({'insights': insights}, write_file)
