from django.core.management.base import BaseCommand, CommandError
from elasticsearchapp.models import JobListing

import os

class Command(BaseCommand):
    help = 'Scrapes Job Listings'

    def add_arguments(self, parser):
        parser.add_argument('scrape_days', nargs='+', type=int)

    def handle(self, *args, **options):
        for i in range(1, int(options['scrape_days'][0]) + 1, 1):
            print("scraping jobs posted " + str(i) + " days ago...")
            comm = "python3 manage.py scrapebydate " + str(i)
            os.system(comm)
