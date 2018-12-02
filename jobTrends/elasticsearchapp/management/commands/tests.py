from django.core.management.base import BaseCommand, CommandError
from elasticsearchapp.documents import JobListingDocument
from elasticsearch_dsl import Q


# Test joblistings elasticsearch setup
def test_search(keyword):
    Q("match_phrase", description=keyword)
    listings_search = JobListingDocument.search().query(Q("match_phrase", description=keyword)).execute()
    result = listings_search.to_dict()
    return result['_shards']['successful'] == 1


class Command(BaseCommand):
    help = 'Usage: python3 manage.py tests'

    # If necessary add more tests here as if else blocks in the same format
    def handle(self, *args, **options):
        if test_search('Data Science'):
            print('Elastic Search Setup: PASSED')
        else:
            print('Elastic Search Setup: FAILED')
