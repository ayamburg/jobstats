# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.apps import apps
from elasticsearchapp.documents import JobListingDocument
from elasticsearch_dsl import Q
JobListing = apps.get_model('elasticsearchapp', 'JobListing')


# Create your views here.
def home(request):
    params = request.GET.getlist('keywords[]')
    queries = Q()

    for param in params:
        queries = queries & Q("match", description=param)

    listings_search = JobListingDocument.search().query(queries)

    total = listings_search.count()
    listings_search = listings_search[0:total]

    listings = {
        'job_listings': listings_search
    }

    return render(request, 'JobTrendsLandingPage.html', listings)
