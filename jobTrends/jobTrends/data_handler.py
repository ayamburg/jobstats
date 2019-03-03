# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
from elasticsearchapp.documents import JobListingDocument
from elasticsearch_dsl import Q
import os


class DataHandler:
    def __init__(self, start):
        self.start = start

    # Returns data for given filters and keywords
    # filters: filters applied on data
    # keywords: keywords displayed on data
    # raw: determines if raw values are given: 1 for raw values, 0 for percent values
    # period: Determines granularity of data, eg: 'week', 'day'
    def get_trend_data(self, filters, keywords, raw, period):
        all_x = []
        all_y = []
        all_keywords = []
        total_y = []

        if not keywords:
            raise ValueError("get_trend_data must be called with at least one keywords arg")

        queries = Q()
        # apply filters
        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        # calculate totals in order to display percentages
        if raw != '1':
            total_y = self.calculate_trend_totals(queries, period)

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
                if bucket.key >= self.start:
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
        return {'x': all_x, 'y': all_y, 'keywords': all_keywords, 'raw': raw, 'filters': filters, 'period': period}

    # Returns data for given filters and keywords
    # filters: filters applied on data
    # keywords: keywords displayed on data
    # raw: determines if raw values are given: 1 for raw values, 0 for percent values
    # period: Determines granularity of data, eg: 'week', 'day'
    def get_bar_data(self, filters, keywords, raw):
        all_y = []
        all_keywords = []
        total_y = 0

        if not keywords:
            raise ValueError("get_bar_data must be called with at least one keywords arg")

        queries = Q()
        queries = queries & Q("range", posted_date={'gte': self.start})
        # apply filters
        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        # calculate totals in order to display percentages
        if raw != '1':
            total_y = self.calculate_bar_totals(queries)

        # Get array of data for each keyword
        for keyword in keywords:
            query = queries & Q("match_phrase", description=keyword)
            listings_search = JobListingDocument.search().query(query)
            y = listings_search.count()
            if raw != '1':
                try:
                    y = y / total_y
                except ZeroDivisionError:
                    y.append(0)
            all_y.append(y)
            all_keywords.append(keyword)
        return {'y': all_y, 'keywords': all_keywords, 'raw': raw, 'filters': filters}

    def get_top_skills(self, count, filters, include=None):
        queries = Q()

        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        queries = queries & Q("range", posted_date={'gte': self.start})
        search = JobListingDocument.search().params(request_timeout=60).query(queries)
        search.aggs.bucket('word_count', 'terms', field='keywords', size=1500)
        search.aggs.bucket('shingle_word_count', 'terms', field='shingles', size=1500)
        search.aggs.bucket('triple_shingle_word_count', 'terms', field='triple_shingles', size=1500)
        search = search.execute()
        words = search.aggregations.word_count.to_dict()['buckets']
        shingle_words = search.aggregations.shingle_word_count.to_dict()['buckets']
        triple_shingle_words = search.aggregations.triple_shingle_word_count.to_dict()['buckets']

        words += shingle_words + triple_shingle_words
        skills = []
        if include:
            open("word_lists/{0}.txt".format(include), "r")
        else:
            exclude = open("jobTrends/word_lists/exclude.txt", "r")
            exclude = exclude.read().split('\n')
            exclude_shingles = open("jobTrends/word_lists/exclude_shingles.txt", "r")
            exclude += exclude_shingles.read().split('\n')
            exclude_triple_shingles = open("jobTrends/word_lists/exclude_triple_shingles.txt", "r")
            exclude += exclude_triple_shingles.read().split('\n')
            for word in words:
                if word['key'] not in exclude:
                    skills.append(word)
                    exclude.append(word['key'])
        skills = sorted(skills, key=lambda k: k['doc_count'], reverse=True)

        for skill in skills:
            print(skill['key'])

        return {'skills': skills}

    def get_significant_terms(self, count, filters):
        queries = Q()

        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        queries = queries & Q("range", posted_date={'gte': self.start})
        search = JobListingDocument.search().query(queries)
        search.aggs.bucket('word_count', 'significant_terms', field='keywords')
        search = search.execute()
        aggs = search.aggregations.word_count
        print(aggs)
        return aggs.to_dict()

    # calculate the total number of postings for each day with the applied filters
    def calculate_trend_totals(self, queries, period):
        total_search = JobListingDocument.search().query(queries)
        total_search.aggs.bucket('listings_per_day', 'date_histogram', field='posted_date', interval=period)
        total_search = total_search.execute()
        total_buckets = total_search.aggregations.listings_per_day.buckets
        total_y = {}
        for bucket in total_buckets:
            if bucket.key >= self.start:
                total_y[bucket.key] = bucket.doc_count
        return total_y

    # calculate the total number of postings with the applied filters
    def calculate_bar_totals(self, queries):
        queries = queries & Q("range", posted_date={'gte': self.start})
        total_search = JobListingDocument.search().query(queries)
        return total_search.count()
