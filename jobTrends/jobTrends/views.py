# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from .data_handler import DataHandler
from .request_parser import *
from django.http.response import JsonResponse
from django.views.generic import View
import time

SCRAPE_DATA_START = 1541203200000


def home(request):
    return render(request, 'index.html')


class TrendData(View):
    def get(self, request, *args, **kwargs):
        request_data = parse_data_request(request)
        filters = request_data['filters']
        keywords = request_data['keywords']
        raw = request_data['raw']
        period = request_data['period']
        start = request_data['start']
        if not start:
            start = SCRAPE_DATA_START
        start_time = time.time()
        page_data = DataHandler(start).get_trend_data(filters, keywords, raw, period)
        print("--- Run Time: %s seconds ---" % (time.time() - start_time))

        return JsonResponse(page_data)


class BarData(View):
    def get(self, request, *args, **kwargs):
        request_data = parse_data_request(request)
        filters = request_data['filters']
        keywords = request_data['keywords']
        raw = request_data['raw']
        start = request_data['start']
        if not start:
            start = SCRAPE_DATA_START
        start_time = time.time()
        page_data = DataHandler(start).get_bar_data(filters, keywords, raw)
        print("--- Run Time: %s seconds ---" % (time.time() - start_time))

        return JsonResponse(page_data)


class TopSkills(View):
    def get(self, request, *args, **kwargs):
        request_data = parse_data_request(request)
        filters = request_data['filters']
        start = request_data['start']
        count = request_data['count']
        include = request_data['include']
        start_time = time.time()
        page_data = DataHandler(start).get_top_skills(count, filters, include=include)
        print("--- Run Time: %s seconds ---" % (time.time() - start_time))

        return JsonResponse(page_data)
