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
    "char_group",
    "char_group",
    tokenize_on_chars=[
        "whitespace",
        "-",
        "\n",
        "/",
        ","
    ]
)

keyword_analyzer = analyzer("default", type="custom", tokenizer=custom_tokenizer, filter=["lowercase"])
job_listing.analyzer(keyword_analyzer)


filter_shingle = token_filter(name_or_instance="filter_shingle", type="shingle", max_shingle_size=2, min_shingle_size=2, output_unigrams="false")
shingle_analyzer = analyzer("shingle", tokenizer=custom_tokenizer, type="custom", filter=["lowercase", filter_shingle])
job_listing.analyzer(shingle_analyzer)


@job_listing.doc_type
class JobListingDocument(DocType):
    keywords = fields.TextField(attr="description", fielddata=True)
    shingles = fields.TextField(attr="description", analyzer="shingle", fielddata=True)

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
