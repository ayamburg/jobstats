from django.core.management.base import BaseCommand, CommandError
from jobTrends.data_handler import DataHandler
import json
import os
import datetime


data_handler = None
folder_path = "jobTrends/top_skills/"
timestamp = str(datetime.datetime.now())


def generate_top_skills(name, count, filters, companies, titles, locations, include=None):
    skills = data_handler.get_top_skills(count, filters, companies, titles, locations, include=include)
    if os.path.isfile(folder_path + name + ".json"):
        os.rename(folder_path + name + ".json", folder_path + "historical/{0}{1}.json".format(name, timestamp))
    write_file = open(folder_path + name + ".json", "w+")
    json.dump(skills, write_file)


class Command(BaseCommand):
    help = 'Determines which skills are the top skills for all pages'

    def add_arguments(self, parser):
        parser.add_argument('start', nargs='+', type=int)

    def handle(self, *args, **options):
        global data_handler
        data_handler = DataHandler(int(options['start'][0]))

        generate_top_skills('frontend', 10, [], [], ['front end', 'frontend'], [])

