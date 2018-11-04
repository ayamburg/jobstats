# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Job listing to be indexed into ElasticSearch


class JobListing(models.Model):
    indeed_id = models.CharField(max_length=200, unique=True)
    posted_date = models.DateField(default=timezone.now)
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200, default='N/A')
    company = models.CharField(max_length=200, default='N/A')
    description = models.TextField(max_length=20000)
