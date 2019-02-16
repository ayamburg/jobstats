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
from django.views import View
from elasticsearchapp.models import JobListing

SCRAPE_DATA_START = 1541203200000


def home(request):
    # get the parameters
    get_filters = request.GET.get('filters')
    get_keywords = request.GET.get('keywords')
    raw = request.GET.get('raw')

    # parse parameters and set defaults if needed
    if get_keywords:
        keywords = get_keywords.split(',')
    else:
        keywords = ['Java', 'Python', 'C++', 'iOS', 'Android']
        get_keywords = ''

    if get_filters:
        filters = get_filters.split(',')
    else:
        filters = []
        get_filters = ''

    plot_trends(filters, keywords, raw, 'week', 'templates/job-trends.html')
    return render(request, 'JobTrendsLandingPage.html', {'filters': get_filters, 'keywords': get_keywords})


class JobListings(View):
    title = "Jobs"
    template = 'jobs.html'

    def get(self, request):
        get_filters = request.GET.get('filters')
        get_keywords = request.GET.get('keywords')
        raw = request.GET.get('raw')

        # parse parameters and set defaults if needed
        if get_keywords:
            keywords = get_keywords.split(',')
        else:
            keywords = ['Java', 'Python']
            get_keywords = ''

        if get_filters:
            filters = get_filters.split(',')
        else:
            filters = ['Machine Learning']
            get_filters = ''

        plot_trends(filters, keywords, raw, 'week', 'static/html/ml-trends.html')
        jobs = list(JobListing.objects.values('pk', 'title'))

        context = {
            'title': self.title,
            'props': jobs,
            'filters': get_filters,
            'keywords': get_keywords
        }
        return render(request, self.template, context)


# Plot a line graph in plotly
# filters: filters applied on graph
# keywords: keywords displayed on graph
# raw: determines if raw values are displayed: 1 for raw values, 0 for percent values
# period: Determines granularity of data, eg: 'week', 'day'
# file: path to html file where graph will be stored
def plot_trends(filters, keywords, raw, period, file):
    queries = Q()

    # apply filters
    for f in filters:
        queries = queries & Q("match_phrase", description=f)

    data = []

    # calculate totals in order to display percentages
    if raw != '1':
        total_y = calculate_totals(queries, period)

    max_percent = 0

    # calculate number of entries and add trace for each keyword
    for keyword in keywords:
        query = queries & Q("match_phrase", description=keyword)
        listings_search = JobListingDocument.search().query(query)

        listings_search.aggs.bucket('listings_per_day', 'date_histogram', field='posted_date', interval=period)
        listings_search = listings_search.execute()

        x = []
        y = []
        idx = 0
        for bucket in listings_search.aggregations.listings_per_day.buckets:
            if bucket.key >= SCRAPE_DATA_START:
                x.append(datetime.utcfromtimestamp(bucket.key/1000))
                if raw != '1':
                    try:
                        y.append(bucket.doc_count / total_y[bucket.key])
                    except ZeroDivisionError:
                        y.append(0)
                else:
                    y.append(bucket.doc_count)
                idx += 1
        if len(y) != 0:
            if max(y) > max_percent:
                max_percent = max(y)
        trace = go.Scatter(
            x=x,
            y=y,
            name=keyword,
            mode='lines+markers'
        )
        data.append(trace)

    # display raw data if requested
    if raw != '1':
        y_settings = dict(tickformat=".2%", range=[0, max_percent+0.01])
    else:
        y_settings = dict()

    # plotly settings
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

    # generate plotly graph and render landing page
    ply.plot(fig, filename=file, auto_open=False, show_link=False, config=button_config)


# calculate the total number of postings for each day with the applied filters
def calculate_totals(queries, period):
    total_search = JobListingDocument.search().query(queries)
    total_search.aggs.bucket('listings_per_day', 'date_histogram', field='posted_date', interval=period)
    total_search = total_search.execute()
    total_buckets = total_search.aggregations.listings_per_day.buckets
    total_y = {}
    for bucket in total_buckets:
        if bucket.key >= SCRAPE_DATA_START:
            total_y[bucket.key] = bucket.doc_count
    return total_y
