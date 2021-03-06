# Generated by Django 2.1.2 on 2019-04-25 01:50

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('elasticsearchapp', '0008_tile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tile',
            name='blacklist',
        ),
        migrations.RemoveField(
            model_name='tile',
            name='whitelist',
        ),
        migrations.AddField(
            model_name='tile',
            name='blacklists',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=100), default=list, size=None),
        ),
        migrations.AddField(
            model_name='tile',
            name='whitelists',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=100), default=list, size=None),
        ),
    ]
