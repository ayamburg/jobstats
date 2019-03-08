# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from .data_handler import DataHandler
from .request_parser import *
from django.http.response import JsonResponse, HttpResponseForbidden
from django.views.generic import View
import time
import json

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
        companies = request_data['companies']
        titles = request_data['titles']
        locations = request_data['locations']

        if not start:
            start = SCRAPE_DATA_START
        start_time = time.time()
        page_data = DataHandler(start).get_trend_data(filters, keywords, raw, period, companies, titles, locations)
        print("--- Run Time: %s seconds ---" % (time.time() - start_time))

        return JsonResponse(page_data)


class BarData(View):
    def get(self, request, *args, **kwargs):
        request_data = parse_data_request(request)
        filters = request_data['filters']
        keywords = request_data['keywords']
        raw = request_data['raw']
        start = request_data['start']
        companies = request_data['companies']
        titles = request_data['titles']
        locations = request_data['locations']

        if not start:
            start = SCRAPE_DATA_START
        start_time = time.time()
        page_data = DataHandler(start).get_bar_data(filters, keywords, raw, companies, titles, locations)
        print("--- Run Time: %s seconds ---" % (time.time() - start_time))

        return JsonResponse(page_data)


class TopSkills(View):
    def get(self, request, *args, **kwargs):
        request_data = parse_data_request(request)
        filters = request_data['filters']
        start = request_data['start']
        count = request_data['count']
        include = request_data['include']
        companies = request_data['companies']
        titles = request_data['titles']
        locations = request_data['locations']

        if not start:
            start = SCRAPE_DATA_START
        start_time = time.time()
        page_data = DataHandler(start).get_top_skills(count, filters, companies, titles, locations, include=include)
        print("--- Run Time: %s seconds ---" % (time.time() - start_time))

        return JsonResponse(page_data)


class GetJsonFile(View):
    def get(self, request, *args, **kwargs):
        category = request.GET.get('category')
        name = request.GET.get('name')
        if category not in ['insights', 'top_skills']:
            return HttpResponseForbidden()
        folder_path = "jobTrends/" + category + "/"

        file = open(folder_path + name + ".json")
        file_data = json.load(file)

        return JsonResponse(file_data)
