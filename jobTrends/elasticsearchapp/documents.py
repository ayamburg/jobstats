from django_elasticsearch_dsl import DocType, Index
from .models import JobListing

# Name of the Elasticsearch index
job_listing = Index('joblistings')
# See Elasticsearch Indices API reference for available settings
job_listing.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@job_listing.doc_type
class JobListingDocument(DocType):
    class Meta:
        model = JobListing  # The model associated with this DocType

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'indeed_id',
            'posted_date',
            'title',
            'location',
            'description',
        ]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True
        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False
        # Paginate the django queryset used to populate the index with the specified size
        # (by default there is no pagination)
        # queryset_pagination = 5000