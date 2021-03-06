# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
from elasticsearchapp.documents import JobListingDocument
from elasticsearch_dsl import Q
import json


class DataHandler:
    def __init__(self, start):
        self.start = start

    # Returns data for given filters and keywords
    # filters: filters applied on data
    # keywords: keywords displayed on data
    # raw: determines if raw values are given: 1 for raw values, 0 for percent values
    # period: Determines granularity of data, eg: 'week', 'day'
    def get_trend_data(self, filters, keywords, raw, period, companies, titles, locations):
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

        if titles:
            title_queries = Q("match_phrase", title=titles[0])
            remaining_titles = titles[1:]
            for title in remaining_titles:
                title_queries = title_queries | Q("match_phrase", title=title)
            queries = queries & title_queries

        if companies:
            company_queries = Q("match_phrase", company=companies[0])
            remaining_companies = companies[1:]
            for company in remaining_companies:
                company_queries = company_queries | Q("match_phrase", company=company)
            queries = queries & company_queries

        if locations:
            location_queries = Q("match_phrase", location=locations[0])
            remaining_locations = locations[1:]
            for location in remaining_locations:
                location_queries = location_queries | Q("match_phrase", location=location)
            queries = queries & location_queries

        # calculate totals in order to display percentages
        if raw != '1':
            total_y = self.calculate_trend_totals(queries, period)

        # Get array of data for each keyword

        max_length = 0
        max_dates = []
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
            if len(x) > max_length:
                max_length = len(x)
                max_dates = x

        # make sure all arrays have values for all dates
        idx = 0
        for keyword in keywords:
            while len(all_y[idx]) < max_length:
                all_y[idx].append(0)
            all_x[idx] = max_dates
            idx += 1
        return {'x': all_x,
                'y': all_y,
                'keywords': all_keywords,
                'raw': raw,
                'filters': filters,
                'period': period,
                'companies': companies,
                'titles': titles,
                'locations': locations}

    # Returns data for given filters and keywords
    # filters: filters applied on data
    # keywords: keywords displayed on data
    # raw: determines if raw values are given: 1 for raw values, 0 for percent values
    # period: Determines granularity of data, eg: 'week', 'day'
    def get_bar_data(self, filters, keywords, raw, companies, titles, locations):

        all_y = []
        all_keywords = []
        total_y = 0

        if not keywords:
            raise ValueError("get_bar_data must be called with at least one keywords arg")

        queries = Q()
        queries = queries & Q("range", posted_date={'gte': str(datetime.utcfromtimestamp(self.start/1000).date())})
        # apply filters
        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        if titles:
            title_queries = Q("match_phrase", title=titles[0])
            remaining_titles = titles[1:]
            for title in remaining_titles:
                title_queries = title_queries | Q("match_phrase", title=title)
            queries = queries & title_queries

        if companies:
            company_queries = Q("match_phrase", company=companies[0])
            remaining_companies = companies[1:]
            for company in remaining_companies:
                company_queries = company_queries | Q("match_phrase", company=company)
            queries = queries & company_queries

        if locations:
            location_queries = Q("match_phrase", location=locations[0])
            remaining_locations = locations[1:]
            for location in remaining_locations:
                location_queries = location_queries | Q("match_phrase", location=location)
            queries = queries & location_queries

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
                    y = 0
            all_y.append(y)
            all_keywords.append(keyword)
        return {'y': all_y,
                'keywords': all_keywords,
                'raw': raw,
                'filters': filters,
                'companies': companies,
                'titles': titles,
                'locations': locations}

    def get_top_skills(self, count, filters, companies, titles, locations, include=None):
        queries = Q()

        if not count:
            count = 10

        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        if titles:
            title_queries = Q("match_phrase", title=titles[0])
            remaining_titles = titles[1:]
            for title in remaining_titles:
                title_queries = title_queries | Q("match_phrase", title=title)
            queries = queries & title_queries

        if companies:
            company_queries = Q("match_phrase", company=companies[0])
            remaining_companies = companies[1:]
            for company in remaining_companies:
                company_queries = company_queries | Q("match_phrase", company=company)
            queries = queries & company_queries

        if locations:
            location_queries = Q("match_phrase", location=locations[0])
            remaining_locations = locations[1:]
            for location in remaining_locations:
                location_queries = location_queries | Q("match_phrase", location=location)
            queries = queries & location_queries

        filter_terms = [] + filters + titles + companies + locations

        queries = queries & Q("range", posted_date={'gte': self.start})
        search = JobListingDocument.search().params(request_timeout=60).query(queries)
        search.aggs.bucket('word_count', 'terms', field='keywords', size=1500)
        search.aggs.bucket('shingle_word_count', 'terms', field='shingles', size=1500)
        #search.aggs.bucket('triple_shingle_word_count', 'terms', field='triple_shingles', size=1500)
        search = search.execute()
        words = search.aggregations.word_count.to_dict()['buckets']
        shingle_words = search.aggregations.shingle_word_count.to_dict()['buckets']
        #triple_shingle_words = search.aggregations.triple_shingle_word_count.to_dict()['buckets']

        words = words + shingle_words# + triple_shingle_words
        skills = []
        whitelist = open("jobTrends/word_lists/whitelist.txt", "r")
        whitelist = whitelist.read().split('\n')
        whitelist = [skill.lower() for skill in whitelist]
        for word in words:
            if (word['key'] in whitelist) & (word['key'] not in filters):
                    skills.append(word)
        skills = sorted(skills, key=lambda k: k['doc_count'], reverse=True)
        return skills[:count]

    def get_top_locations(self, count, filters, companies, titles, include=None):
        queries = Q()

        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        if titles:
            title_queries = Q("match_phrase", title=titles[0])
            remaining_titles = titles[1:]
            for title in remaining_titles:
                title_queries = title_queries | Q("match_phrase", title=title)
            queries = queries & title_queries

        if companies:
            company_queries = Q("match_phrase", company=companies[0])
            remaining_companies = companies[1:]
            for company in remaining_companies:
                company_queries = company_queries | Q("match_phrase", company=company)
            queries = queries & company_queries

        queries = queries & Q("range", posted_date={'gte': self.start})
        search = JobListingDocument.search().params(request_timeout=60).query(queries)
        search.aggs.bucket('word_count', 'terms', field='location_keywords', size=500)
        search.aggs.bucket('shingle_word_count', 'terms', field='location_shingles', size=500)
        #search.aggs.bucket('triple_shingle_word_count', 'terms', field='location_triple_shingles', size=500)
        search = search.execute()
        words = search.aggregations.word_count.to_dict()['buckets']
        shingle_words = search.aggregations.shingle_word_count.to_dict()['buckets']
        #triple_shingle_words = search.aggregations.triple_shingle_word_count.to_dict()['buckets']

        words = words + shingle_words# + triple_shingle_words
        locations = []
        cityObjs = []

        include = open("jobTrends/location_data/col.json", "r")
        include = json.load(include)
        cityNamesFilter = []
        for city in include.keys():
            cityObjs.append({city.split(',')[0].lower(): city})
            cityNamesFilter.append(city.split(',')[0].lower())
        #print(cityNamesFilter)
        for word in words:
            if word['key'] in cityNamesFilter:
                #locations.append(word)
                for city in cityObjs:
                    #print("%s, %s", city.keys(), word['key'])
                    if list(city)[0] == word['key']:
                        locations.append({"city": city[list(city)[0]], "doc_count": word['doc_count']})
        #print(locations)

        locations = sorted(locations, key=lambda k: k['doc_count'], reverse=True)

        return locations

    def get_job_listings(self, count, filters, companies, titles, locations):
        if not count:
            count = 5

        queries = Q()
        queries = queries & Q("range", posted_date={'gte': str(datetime.utcfromtimestamp(self.start / 1000).date())})
        # apply filters
        for f in filters:
            queries = queries & Q("match_phrase", description=f)

        if titles:
            title_queries = Q("match_phrase", title=titles[0])
            remaining_titles = titles[1:]
            for title in remaining_titles:
                title_queries = title_queries | Q("match_phrase", title=title)
            queries = queries & title_queries

        if companies:
            company_queries = Q("match_phrase", company=companies[0])
            remaining_companies = companies[1:]
            for company in remaining_companies:
                company_queries = company_queries | Q("match_phrase", company=company)
            queries = queries & company_queries

        if locations:
            location_queries = Q("match_phrase", location=locations[0])
            remaining_locations = locations[1:]
            for location in remaining_locations:
                location_queries = location_queries | Q("match_phrase", location=location)
            queries = queries & location_queries

        # Get array of data for each keyword
        listings_search = JobListingDocument.search().query(queries).sort('-posted_date')
        listings_search = listings_search.execute()
        job_listing_documents = listings_search[:count]
        job_listings = []
        for doc in job_listing_documents:
            job_listings += [{
                'indeed_id': doc.indeed_id,
                'posted_date': doc.posted_date.isoformat(),
                'title': doc.title,
                'location': doc.location,
                'company': doc.company,
                'description': doc.description
            }]

        return {'job_listings': job_listings,
                'filters': filters,
                'companies': companies,
                'titles': titles,
                'locations': locations}

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
        total_search = JobListingDocument.search().query(queries)
        return total_search.count()
