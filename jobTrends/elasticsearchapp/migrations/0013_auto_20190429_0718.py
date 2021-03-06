# Generated by Django 2.1.2 on 2019-04-29 07:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('elasticsearchapp', '0012_auto_20190425_0203'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomTile',
            fields=[
                ('tile_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='elasticsearchapp.Tile')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            bases=('elasticsearchapp.tile',),
        ),
        migrations.RemoveField(
            model_name='tile',
            name='custom',
        ),
        migrations.RemoveField(
            model_name='tile',
            name='user_id',
        ),
    ]
