from django.core.management.base import BaseCommand, CommandError
from jobTrends.data_handler import DataHandler
import json
import os
import datetime


class Command(BaseCommand):
    help = 'Determines which skills are the top skills for all pages'

    def add_arguments(self, parser):
        parser.add_argument('start', nargs='+', type=int)

    def handle(self, *args, **options):
        print(int(options['start'][0]))
        data_handler = DataHandler(int(options['start'][0]))
        folder_path = "jobTrends/top_skills/"
        timestamp = str(datetime.datetime.now())

        # frontend
        skills = data_handler.get_top_skills(10, [], [], ['front end', 'frontend'], [])
        if os.path.isfile(folder_path + "frontend.json"):
            os.rename(folder_path + "frontend.json", folder_path + "historical/frontend{0}.json".format(timestamp))
        write_file = open(folder_path + "frontend.json", "w+")
        json.dump(skills, write_file)

