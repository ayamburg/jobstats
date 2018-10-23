from datetime import datetime
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import Document, Date, Long, Text
from elasticsearch import Elasticsearch
from . import models

connections.create_connection()


class JobListingIndex(Document):
    linkedin_id = Long()
    posted_date = Date()
    title = Text()
    description = Text()

    class Index:
        name = 'joblisting'
        settings = {
            "number_of_shards": 2,
        }

    def save(self, **kwargs):
        self.lines = len(self.body.split())
        return super(JobListingIndex, self).save(**kwargs)


# create the mappings in elasticsearch
JobListingIndex.init()

# create and save and article
article = JobListingIndex(meta={'id': 42}, title='Hello world!')
article.description = ''' looong text '''
article.save()

article = JobListingIndex.get(id=42)
print(article.is_published())

# Display cluster health
print(connections.get_connection().cluster.health())

def bulk_indexing():
    JobListingIndex.init()
    es = Elasticsearch()
    bulk(client=es, actions=(b.indexing() for b in models.JobListing.objects.all().iterator()))