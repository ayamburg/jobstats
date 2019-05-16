from elasticsearchapp.tile_models import StandardTile
from django.db import migrations


def create_standard_tiles(apps, schema_editor):
    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=['amazon.com'],
        titles=[],
        blacklists=[],
        whitelists=[],
        title='Top Skills for Amazon',
        name='amazon')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=['apple'],
        titles=[],
        blacklists=[],
        whitelists=[],
        title='Top Skills for Apple',
        name='apple')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=['google'],
        titles=[],
        blacklists=[],
        whitelists=[],
        title='Top Skills for Google',
        name='google')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=['microsoft'],
        titles=[],
        blacklists=[],
        whitelists=[],
        title='Top Skills for Microsoft',
        name='microsoft')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=[],
        titles=['front end', 'frontend'],
        blacklists=[],
        whitelists=[],
        title='Top Front End Skills',
        name='frontend')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=[],
        titles=['back end', 'backend'],
        blacklists=[],
        whitelists=[],
        title='Top Back End Skills',
        name='backend')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=[],
        titles=['full stack', 'fullstack'],
        blacklists=[],
        whitelists=[],
        title='Top Full Stack Skills',
        name='fullstack')
    new_custom_tile.save()

    new_custom_tile = StandardTile.objects.create(
        filters=[],
        locations=[],
        companies=[],
        titles=['cyber security', 'malware', 'infosec', 'security', 'penetration', 'pen tester'],
        blacklists=[],
        whitelists=[],
        title='Top Cyber Security Skills',
        name='cybersecurity')
    new_custom_tile.save()


class Migration(migrations.Migration):
    dependencies = [
        ('elasticsearchapp', '0016_tile_name'),
    ]

    operations = [
        migrations.RunPython(create_standard_tiles),
    ]
