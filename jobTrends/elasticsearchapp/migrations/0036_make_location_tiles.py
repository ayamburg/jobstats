from elasticsearchapp.tile_models import StandardTile
from django.db import migrations
import json
import re


def create_location_tiles(apps, schema_editor):
    regex = re.compile('[^a-zA-Z]')
    #First parameter is the replacement, second parameter is your input string   

    include = open("jobTrends/location_data/col.json", "r")
    include = json.load(include)
    for city in include.keys():
        print("city is: ", city)
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

class Migration(migrations.Migration):
    dependencies = [
        ('elasticsearchapp', '0034_auto_20190512_0749'),
    ]

    operations = [
        migrations.RunPython(create_location_tiles),
    ]
