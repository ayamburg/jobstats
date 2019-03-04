import time
from django.core.management import BaseCommand, CommandError, call_command


class Command(BaseCommand):
    help = 'Scrapes, gets top skills, generates insights'

    def handle(self, *args, **options):
        print('Running Daily Update')
        print('Scraping...')
        call_command('scrapebydate', 1)
        week = 604800000
        month = 2592000000
        start = int(time.time() * 1000 - month * 6)
        print('Calculating Top Skills...')
        call_command('gettopskills', start)
        print('Generating Insights...')
        call_command('generateinsights')
        print('Daily Update Done')
