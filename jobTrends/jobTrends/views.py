# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from .data_handler import *
from .request_parser import *
from django.http.response import JsonResponse
from django.views.generic import View


def home(request):
    return render(request, 'index.html')


def jobs(request):
    request_data = parse_data_request(request)
    filters = request_data['filters']
    keywords = request_data['keywords']
    raw = request_data['raw']
    period = request_data['period']

    if not filters:
        filters = ['machine learning']
    if not keywords:
        keywords = ['python', 'java']

    page_data = get_trend_data(filters, keywords, raw, period)
    page_data['raw'] = raw
    page_data['filters'] = filters
    context = {
        'title': 'Jobs',
        'props': page_data,
    }
    return render(request, 'jobs.html', context)


class TrendData(View):
    def get(self, request, *args, **kwargs):
        print('Api got TrendData request:')
        request_data = parse_data_request(request)
        filters = request_data['filters']
        keywords = request_data['keywords']
        raw = request_data['raw']
        period = request_data['period']
        page_data = get_trend_data(filters, keywords, raw, period)

        return JsonResponse(page_data)
