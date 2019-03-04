
from django.core.management import BaseCommand, CommandError, call_command


class Command(BaseCommand):
    help = 'Scrapes, gets top skills, generates insights'

    def handle(self, *args, **options):
        print('topskills')
        call_command('scrapebydate')
