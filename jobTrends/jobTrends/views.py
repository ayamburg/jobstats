# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from .data_handler import DataHandler
from .request_parser import *
from django.http.response import JsonResponse, HttpResponseForbidden
from django.views.generic import View
from django.dispatch import receiver
from allauth.account.signals import user_signed_up, user_logged_in
from elasticsearchapp.models import CustomTile
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
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
        print("--- get_trend_data Run Time: %s seconds ---" % (time.time() - start_time))

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
        print("--- get_bar_data Run Time: %s seconds ---" % (time.time() - start_time))

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
        print("--- get_top_skills Run Time: %s seconds ---" % (time.time() - start_time))

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


class UserInfo(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return JsonResponse({'first': request.user.first_name, 'last': request.user.last_name, 'signed_in': True})
        else:
            return JsonResponse({'signed_in': False})


class CustomTiles(View):
    # return all custom tiles
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            custom_tiles = CustomTile.objects.filter(user_id=request.user.id)
            data = []
            for custom_tile in custom_tiles:
                data += [model_to_dict(custom_tile)]
            return JsonResponse({'custom_tiles': data})
        else:
            return JsonResponse({'custom_tiles': []})

    # create a custom tile
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            request_data = json.loads(request.body)
            print('---Creating Custom Tile with Params---')
            print(request_data)
            filters = request_data['filters']
            locations = request_data['locations']
            companies = request_data['companies']
            titles = request_data['titles']
            blacklists = request_data['blacklists']
            whitelists = request_data['whitelists']
            title = request_data['title']
            user_id = request.user

            new_custom_tile = CustomTile.objects.create(
                filters=filters,
                locations=locations,
                companies=companies,
                titles=titles,
                blacklists=blacklists,
                whitelists=whitelists,
                title=title,
                user_id=user_id)
            new_custom_tile.save()
            print('---Success---')
            return JsonResponse({'tile': model_to_dict(new_custom_tile), 'success': True})
        else:
            return JsonResponse({'error': 'Not Signed In', 'success': False}, status=403)


@receiver(user_signed_up)
def populate_profile(sociallogin, user, **kwargs):
    if sociallogin.account.provider == 'linkedin_oauth2':
        user_data = user.socialaccount_set.filter(provider='linkedin_oauth2')[0].extra_data
        picture_url = user_data['profilePicture']['displayImage']
        first_name = user_data['firstName']['localized']['en_US']
        last_name = user_data['lastName']['localized']['en_US']
        user_id = user_data['id']
        print(user_data)

        user.avatar_url = picture_url
        user.first_name = first_name
        user.last_name = last_name
        user.save()
