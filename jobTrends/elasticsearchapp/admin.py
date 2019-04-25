# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import JobListing
from .models import Tile

# Register your models here.
admin.site.register(JobListing)
admin.site.register(Tile)
