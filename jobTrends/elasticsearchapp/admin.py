# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import JobListing
from .tile_models import Tile, CustomTile, StandardTile

# Register your models here.
admin.site.register(JobListing)
admin.site.register(Tile)
admin.site.register(CustomTile)
admin.site.register(StandardTile)
