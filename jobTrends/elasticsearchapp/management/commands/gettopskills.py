from django.core.management.base import BaseCommand, CommandError
from jobTrends.data_handler import DataHandler
from elasticsearchapp.models import Tile


data_handler = None


def generate_top_skills(count, filters, companies, titles, locations, include=None):
    skills = data_handler.get_top_skills(count, filters, companies, titles, locations, include=include)
    return skills


class Command(BaseCommand):
    help = 'Determines which skills are the top skills for all pages'

    def add_arguments(self, parser):
        parser.add_argument('start', nargs='+', type=int)

    def handle(self, *args, **options):
        global data_handler
        data_handler = DataHandler(int(options['start'][0]))

        tiles = Tile.objects.all()
        for tile in tiles:
            tile.top_skills = generate_top_skills(10,
                                                  tile.filters,
                                                  tile.companies,
                                                  tile.titles,
                                                  tile.locations)
            tile.save()

