from elasticsearchapp.tile_models import StandardTile
from django.db import migrations
import json
import re

citynames = [
    "Charlotte, NC",
    "Tulsa, OK",
    "Milwaukee, WI",
    "Madison, WI",
    "Seattle, WA",
    "San Antonio, TX",
    "Cincinnati, OH",
    "New York, NY",
    "Raleigh, NC",
    "Jacksonville, FL",
    "Baltimore, MD",
    "Indianapolis, IN",
    "Rochester, NY",
    "Richmond, VA",
    "Minneapolis, MN",
    "St. Louis, MO",
    "Sacramento, CA",
    "San Diego, CA",
    "Knoxville, TN",
    "Dallas, TX",
    "Tampa, FL",
    "Reno, NV",
    "Pittsburgh, PA",
    "Nashville, TN",
    "Salt Lake City, UT",
    "Albany, NY",
    "Atlanta, GA",
    "Kansas City, MO",
    "Oakland, CA",
    "Los Angeles, CA",
    "Austin, TX",
    "Tucson, AZ",
    "San Jose, CA",
    "San Francisco, CA",
    "Miami, FL",
    "Boston, MA",
    "Columbus, OH",
    "Philadelphia, PA",
    "Memphis, TN",
    "Louisville, KY",
    "Brooklyn, NY",
    "Las Vegas, CA",
    "Denver, CO",
    "Washington, DC",
    "Albuquerque, NM",
    "Phoenix, AZ",
    "Detroit, MI",
    "Bellingham, WA",
    "Chicago, IL",
    "Fort Worth, TX",
    "Fresno, CA",
    "Boise, ID",
    "Bakersfield, CA",
    "Little Rock, AR",
    "Portland, OR",
    "Buffalo, NY",
    "Cleveland, OH",
    "Houston, TX",
    "Orlando, FL",
]


def create_location_tiles(apps, schema_editor):
    regex = re.compile('[^a-zA-Z]')
    # First parameter is the replacement, second parameter is your input string
    for city in citynames:
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
        ('elasticsearchapp', '0034_auto_20190512_0749'),
    ]

    operations = [
        migrations.RunPython(create_location_tiles),
    ]
