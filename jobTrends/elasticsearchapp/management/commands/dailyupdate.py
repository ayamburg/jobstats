import time
from django.core.management import BaseCommand, CommandError, call_command


class Command(BaseCommand):
    help = 'Scrapes, gets top skills, generates insights'

    def add_arguments(self, parser):
        parser.add_argument(
            '--noscrape',
            action='store_true',
            dest='noscrape',
            help='Skip the scraping part of the script',
        )

    def handle(self, *args, **options):
        print('Running Daily Update')
        start_time = time.time()
        if not options['noscrape']:
            print('Scraping...')
            call_command('scrapebydate', 1)
            print("<<< Scraper Run Time: %s seconds >>>" % (time.time() - start_time))
        print('Calculating Top Skills...')
        top_skills_time = time.time()
        call_command('gettopskills')
        print("<<< Top Skills Run Time: %s seconds >>>" % (time.time() - top_skills_time))
        print('Generating Insights...')
        insights_time = time.time()
        call_command('generateinsights')
        print("<<< Insights Run Time: %s seconds >>>" % (time.time() - insights_time))
        print('Daily Update Done')
        print("<<< Total Run Time: %s seconds >>>" % (time.time() - start_time))
