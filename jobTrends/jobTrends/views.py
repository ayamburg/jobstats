# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.apps import apps
JobListing = apps.get_model('elasticsearchapp', 'JobListing')


# Create your views here.
def home(request):
    data = JobListing.objects.all()
    listings = {
        "job_listings": data
    }

    return render(request, 'JobTrendsLandingPage.html', listings)
