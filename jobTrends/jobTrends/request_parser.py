def parse_data_request(request):
    get_filters = request.GET.get('filters')
    get_keywords = request.GET.get('keywords')
    period = request.GET.get('period')
    get_start = request.GET.get('start')
    mode = request.GET.get('mode')
    raw = request.GET.get('raw')
    count = request.GET.get('count')
    include = request.GET.get('include')

    if raw != '1':
        raw = '0'

    if mode not in ['bar', 'trend', 'list']:
        mode = 'trend'

    if period not in ['day', 'week', 'month']:
        period = 'week'

    if get_start:
        start = int(get_start)
    else:
        start = None

    if get_keywords:
        keywords = get_keywords.split(',')
    else:
        keywords = []

    if get_filters:
        filters = get_filters.split(',')
    else:
        filters = []

    if count:
        count = int(count)
    else:
        count = None

    return {'filters': filters,
            'keywords': keywords,
            'raw': raw,
            'period': period,
            'start': start,
            'mode': mode,
            'count': count,
            'include': include}
