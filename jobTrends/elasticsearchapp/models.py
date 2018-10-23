# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from .search import JobListingIndex

# Create your models here.

# Job listing to be indexed into ElasticSearch


class JobListing(models.Model):
    linkedin_id = models.BigIntegerField()
    posted_date = models.DateField(default=timezone.now)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=10000)


# Add indexing method to JobListing
def indexing(self):
    obj = JobListingIndex(
      meta={'id': self.id},
      linkedin_id=self.linkedin_id,
      posted_date=self.posted_date,
      title=self.title,
      description=self.description
    )
    obj.save()
    return obj.to_dict(include_meta=True)
