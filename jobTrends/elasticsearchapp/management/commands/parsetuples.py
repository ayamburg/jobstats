from django.core.management.base import BaseCommand, CommandError
from elasticsearchapp.models import JobListing
from ast import literal_eval as make_tuple


class Command(BaseCommand):
    help = 'Parse Tuples in DB'

    def handle(self, *args, **options):
        listings = JobListing.objects.filter(posted_date__range=["2019-01-01", "2019-04-20"])
        for listing in listings:
            company = listing.company
            location = listing.location
            title = listing.title
            description = listing.description
            hasTuple = False
            if (listing.company[:2] == "(\"") | (listing.company[:2] == "('"):
                company = make_tuple(listing.company)[0]
                print("company***************************************")
                hasTuple = True

            if (listing.location[:2] == "(\"") | (listing.location[:2] == "('"):
                location = make_tuple(listing.location)[0]
                print("location**************************************")
                hasTuple = True

            if (listing.title[:2] == "(\"") | (listing.title[:2] == "('"):
                title = make_tuple(listing.title)[0]
                print("title*****************************************")
                hasTuple = True

            if (listing.description[:2] == "(\"") | (listing.description[:2] == "('"):
                description = make_tuple(listing.description)[0]
                print("description***********************************")
                hasTuple = True
            if hasTuple:
                new_listing = JobListing.objects.update_or_create(
                    indeed_id=listing.indeed_id,
                    defaults={'title': title,
                              'posted_date': listing.posted_date,
                              'location': location,
                              'company': company,
                              'description': description})
                if not new_listing[1]:
                    new_listing[0].save()
                    print(new_listing[0].company)
                    print(new_listing[0].location)
                    print(new_listing[0].title)
                    print(new_listing[0].posted_date)
