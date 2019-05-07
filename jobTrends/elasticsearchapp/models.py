# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField

# Create your models here.

# Job listing to be indexed into ElasticSearch


class JobListing(models.Model):
    indeed_id = models.CharField(max_length=200, unique=True)
    posted_date = models.DateField(default=timezone.now)
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200, default='N/A')
    company = models.CharField(max_length=200, default='N/A')
    description = models.TextField(max_length=20000)


class Tile(models.Model):
    filters = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    locations = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    companies = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    titles = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    blacklists = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    whitelists = ArrayField(default=list, base_field=models.CharField(max_length=100, blank=True), blank=True)
    title = models.CharField(max_length=200)
    insights = JSONField(null=True, blank=True)
    top_skills = JSONField(null=True, blank=True)
    name = models.CharField(max_length=200)


class CustomTile(Tile):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class StandardTile(Tile):
    style = JSONField(null=True, blank=True)
