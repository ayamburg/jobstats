from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Generates Insights'

    def handle(self, *args, **options):
        print('topskills')
