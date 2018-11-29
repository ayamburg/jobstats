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
    get_filters = request.GET.get('filters')
    get_keywords = request.GET.get('keywords')
    raw = request.GET.get('raw')
    queries = Q()

    if get_keywords:
        keywords = get_keywords.split(',')
    else:
        keywords = ['Java', 'Python', 'Ruby', 'PHP', 'iOS', 'Android']
        get_keywords = ''

    if get_filters:
        filters = get_filters.split(',')
    else:
        filters = []
        get_filters = ''

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
                x.append(datetime.utcfromtimestamp(bucket.key/1000))
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
        y_settings = dict(tickformat=".2%")
    else:
        y_settings = dict()

    x_settings = dict(
        range=[datetime.utcfromtimestamp(SCRAPE_DATA_START/1000 - 8000), datetime.today()],
        type='date'
    )
    button_config = dict(displaylogo=False,
                         modeBarButtonsToRemove=[
                             'sendDataToCloud',
                             'zoomOut2d',
                             'zoomIn2d',
                             'zoom2d',
                             'select2d',
                             'lasso2d',
                             'autoScale2d'])
    layout = go.Layout(showlegend=True, yaxis=y_settings, xaxis=x_settings)
    fig = go.Figure(data=data, layout=layout)
    ply.plot(fig, filename='templates/job-trends.html', auto_open=False, show_link=False, config=button_config)

    return render(request, 'JobTrendsLandingPage.html', {'filters': get_filters, 'keywords': get_keywords})


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
