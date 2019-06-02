from elasticsearchapp.tile_models import StandardTile
from django.db import migrations
import json
import re

new_citynames = [
    "Mountain View, CA",
    "Cupertino, CA",
    "Palo Alto, CA",
    "Sunnyvale, CA",
]


def create_location_tiles(apps, schema_editor):
    regex = re.compile('[^a-zA-Z]')
    # First parameter is the replacement, second parameter is your input string
    for city in new_citynames:
        print("city is: ", city.split(',')[0])
        print("name is: ", regex.sub('', city))
        print("locations is: ", city.split(',')[0])
        new_custom_tile = StandardTile.objects.create(
            filters=[],
            locations=[city.split(',')[0]],
            companies=[],
            titles=[],
            blacklists=[],
            whitelists=[],
            title=city,
            name=regex.sub('', city))
        new_custom_tile.save()

    # regex = re.compile('[^a-zA-Z]')
    # # First parameter is the replacement, second parameter is your input string
    #
    # include = open("jobTrends/location_data/col.json", "r")
    # include = json.load(include)
    # for city in include.keys():
    #     print("city is: ", city.split(',')[0])
    #     print("name is: ", regex.sub('', city))
    #     print("locations is: ", city.split(',')[0])
    #     new_custom_tile = StandardTile.objects.create(
    #         filters=[],
    #         locations=[city.split(',')[0]],
    #         companies=[],
    #         titles=[],
    #         blacklists=[],
    #         whitelists=[],
    #         title=city,
    #         name=regex.sub('', city))
    #     new_custom_tile.save()


class Migration(migrations.Migration):
    dependencies = [
        ('elasticsearchapp', '0036_make_location_tiles'),
    ]

    operations = [
        migrations.RunPython(create_location_tiles),
    ]
