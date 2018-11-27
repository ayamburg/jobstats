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

SCRAPE_DATA_START = 1541203200000


def home(request):
    filters = request.GET.getlist('filters[]')
    keywords = request.GET.getlist('keywords[]')
    raw = request.GET.get('raw')
    queries = Q()
    if not keywords:
        keywords = ['Java', 'Python', 'Ruby', 'PHP', 'iOS', 'Android']

    for f in filters:
        queries = queries & Q("match", description=f)

    data = []

    if raw != '1':
        total_y = calculate_totals(queries)

    # calculate number of entries and add trace for each keyword
    for keyword in keywords:
        query = queries & Q("match", description=keyword)
        listings_search = JobListingDocument.search().query(query)

        listings_search.aggs.bucket('listings_per_day', 'date_histogram', field='posted_date', interval='day')
        listings_search = listings_search.execute()

        x = []
        y = []
        idx = 0
        for bucket in listings_search.aggregations.listings_per_day.buckets:
            if bucket.key >= SCRAPE_DATA_START:
                x.append(datetime.utcfromtimestamp(bucket.key/1000).strftime('%m/%d'))
                if raw != '1':
                    try:
                        y.append(bucket.doc_count / total_y[idx])
                    except ZeroDivisionError:
                        y.append(0)
                else:
                    y.append(bucket.doc_count)
                idx += 1
        trace = go.Scatter(
            x=x,
            y=y,
            name=keyword,
            mode='lines+markers'
        )
        data.append(trace)

    if raw != '1':
        layout = go.Layout(showlegend=True, yaxis=dict(tickformat=".2%"))
    else:
        layout = go.Layout(showlegend=True)
    fig = go.Figure(data=data, layout=layout)
    ply.plot(fig, filename='templates/job-trends.html', auto_open=False)

    return render(request, 'JobTrendsLandingPage.html')


def calculate_totals(queries):
    total_search = JobListingDocument.search().query(queries)
    total_search.aggs.bucket('listings_per_day', 'date_histogram', field='posted_date', interval='day')
    total_search = total_search.execute()
    total_buckets = total_search.aggregations.listings_per_day.buckets
    total_y = []
    for bucket in total_buckets:
        if bucket.key >= SCRAPE_DATA_START:
            total_y.append(bucket.doc_count)
    return total_y
