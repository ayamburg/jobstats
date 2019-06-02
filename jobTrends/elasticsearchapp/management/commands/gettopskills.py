from django.core.management.base import BaseCommand, CommandError
from jobTrends.data_handler import DataHandler
from elasticsearchapp.tile_models import Tile
import time


class Command(BaseCommand):
    help = 'Determines which skills are the top skills for all pages'

    def handle(self, *args, **options):
        tiles = Tile.objects.all()
        for tile in tiles:
            start_time = time.time()
            tile.generate_top_skills()
            print("<<< %s: %s seconds >>>" % (tile.name, time.time() - start_time))
