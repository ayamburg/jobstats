from django.core.management.base import BaseCommand, CommandError
from jobTrends.data_handler import DataHandler
from elasticsearchapp.tile_models import Tile


class Command(BaseCommand):
    help = 'Determines which skills are the top skills for all pages'

    def handle(self, *args, **options):
        tiles = Tile.objects.all()
        for tile in tiles:
            tile.generate_top_skills()
