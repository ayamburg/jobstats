from django_elasticsearch_dsl import DocType, Index, fields
from .models import JobListing
from elasticsearch_dsl import analyzer, tokenizer, token_filter

# Name of the Elasticsearch index
job_listing = Index('joblistings')
# See Elasticsearch Indices API reference for available settings
job_listing.settings(
    number_of_shards=1,
    number_of_replicas=0
)

custom_tokenizer = tokenizer(
    "pattern",
    "pattern",
    pattern="\s|-|\n|/|,|\.\s"
)

keyword_analyzer = analyzer("default", type="custom", tokenizer=custom_tokenizer, filter=["lowercase"])
job_listing.analyzer(keyword_analyzer)


filter_shingle = token_filter(name_or_instance="filter_shingle", type="shingle", max_shingle_size=2, min_shingle_size=2, output_unigrams="false")
shingle_analyzer = analyzer("shingle", tokenizer=custom_tokenizer, type="custom", filter=["lowercase", filter_shingle])
job_listing.analyzer(shingle_analyzer)

triple_filter_shingle = token_filter(name_or_instance="triple_filter_shingle", type="shingle", max_shingle_size=3, min_shingle_size=3, output_unigrams="false")
triple_shingle_analyzer = analyzer("triple_shingle", tokenizer=custom_tokenizer, type="custom", filter=["lowercase", triple_filter_shingle])
job_listing.analyzer(triple_shingle_analyzer)


@job_listing.doc_type
class JobListingDocument(DocType):
    keywords = fields.TextField(attr="description", fielddata=True)
    shingles = fields.TextField(attr="description", analyzer="shingle", fielddata=True)
    triple_shingles = fields.TextField(attr="description", analyzer="triple_shingle", fielddata=True)

    class Meta:
        model = JobListing  # The model associated with this DocType

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'indeed_id',
            'posted_date',
            'title',
            'location',
            'company',
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

    @staticmethod
    def get_analyzer():
        return keyword_analyzer
