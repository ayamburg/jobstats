# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
from django.shortcuts import render
from django.apps import apps
from elasticsearchapp.documents import JobListingDocument
from elasticsearch_dsl import Q
import numpy as np
import plotly.graph_objs as go
import plotly.offline as ply
import plotly.tools as tls
JobListing = apps.get_model('elasticsearchapp', 'JobListing')


def home(request):
    filters = request.GET.getlist('filters[]')
    keywords = request.GET.getlist('keywords[]')
    queries = Q()
    if not keywords:
        keywords = ['Java', 'C++', 'Python', 'Ruby']

    for f in filters:
        queries = queries & Q("match", description=f)

    data = []

    for keyword in keywords:
        query = queries & Q("match", description=keyword)
        listings_search = JobListingDocument.search().query(query)
        total = listings_search.count()
        listings_search = listings_search[0:total]

        listings_search.aggs.bucket('listings_per_day', 'date_histogram', field='posted_date', interval='day')
        listings_search = listings_search.execute()

        x = []
        y = []
        for bucket in listings_search.aggregations.listings_per_day.buckets:
            x.append(datetime.utcfromtimestamp(bucket.key/1000).strftime('%x'))
            y.append(bucket.doc_count)

        trace = go.Scatter(
            x=x,
            y=y,
            name=keyword,
            mode='lines+markers'
        )
        data.append(trace)

    layout = go.Layout(showlegend=True)
    fig = go.Figure(data=data, layout=layout)
    ply.plot(fig, filename='templates/job-trends.html', auto_open=False)

    return render(request, 'JobTrendsLandingPage.html')
