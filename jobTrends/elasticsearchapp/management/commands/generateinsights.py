from django.core.management.base import BaseCommand
from elasticsearchapp.tile_models import Tile


class Command(BaseCommand):
    help = 'Generates Insights'

    def handle(self, *args, **options):
        tiles = Tile.objects.all()
        for tile in tiles:
            print("generate insights for tile ", tile.title, " with locations: ", tile.locations)
            tile.generate_insights()
