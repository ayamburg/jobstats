# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
from elasticsearchapp.documents import JobListingDocument
from elasticsearch_dsl import Q

SCRAPE_DATA_START = 1541203200000


# Returns data for given filters and keywords
# filters: filters applied on data
# keywords: keywords displayed on data
# raw: determines if raw values are given: 1 for raw values, 0 for percent values
# period: Determines granularity of data, eg: 'week', 'day'
def get_data(filters, keywords, raw, period):
    all_x = []
    all_y = []
    all_keywords = []

    queries = Q()
    # apply filters
    for f in filters:
        queries = queries & Q("match_phrase", description=f)

    # calculate totals in order to display percentages
    if raw != '1':
        total_y = calculate_totals(queries, period)

    # Get array of data for each keyword
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
                x.append(datetime.utcfromtimestamp(bucket.key / 1000).isoformat())
                if raw != '1':
                    try:
                        y.append(bucket.doc_count / total_y[bucket.key])
                    except ZeroDivisionError:
                        y.append(0)
                else:
                    y.append(bucket.doc_count)
                idx += 1
        all_x.append(x)
        all_y.append(y)
        all_keywords.append(keyword)
    return {'x': all_x, 'y': all_y, 'keywords': all_keywords}


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