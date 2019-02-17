# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from .data_handler import get_data


def home(request):
    return render(request, 'index.html')


def jobs(request):
    get_filters = request.GET.get('filters')
    get_keywords = request.GET.get('keywords')
    raw = request.GET.get('raw')
    if raw != 1:
        raw = 0

    # parse parameters and set defaults if needed
    if get_keywords:
        keywords = get_keywords.split(',')
    else:
        keywords = ['Java', 'Python']

    if get_filters:
        filters = get_filters.split(',')
    else:
        filters = ['Machine Learning']

    page_data = get_data(filters, keywords, raw, 'week')
    page_data['raw'] = raw
    page_data['filters'] = filters
    context = {
        'title': 'Jobs',
        'props': page_data,
    }
    return render(request, 'jobs.html', context)
