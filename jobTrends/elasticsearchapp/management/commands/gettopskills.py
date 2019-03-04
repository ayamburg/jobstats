from django.core.management.base import BaseCommand, CommandError
from jobTrends.data_handler import DataHandler


class Command(BaseCommand):
    help = 'Determines which skills are the top skills'

    def add_arguments(self, parser):
        parser.add_argument('start', nargs='+', type=int)

    def handle(self, *args, **options):
        data_handler = DataHandler(int(options['start'][0]))

        # frontend
        skills = DataHandler