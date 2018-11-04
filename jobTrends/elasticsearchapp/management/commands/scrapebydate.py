from django.core.management.base import BaseCommand, CommandError
from elasticsearchapp.models import JobListing

import requests
from bs4 import BeautifulSoup
import datetime
import re
import sys


currentDT = datetime.datetime.now()
Number_of_pages = 7
count = 0
URL = "https://www.indeed.com/jobs?q=computer+science&sort=date&filter=0&start="
job_URL = "https://www.indeed.com/viewjob?jk="
results = requests.get(URL)
soup = BeautifulSoup(results.text, "html.parser")
result = soup.find(id='resultsCol')


def get_oldest_acceptable_date(days_old):
    date_of_oldest = currentDT - datetime.timedelta(days=days_old - 1)
    return date_of_oldest


def extract_job_links(soup):
    jobLinks = [link.get('href') for link in result.find_all('a')]
    jobLinks = [link for link in jobLinks if '/rc/' in str(link)]
    done_links = []

    for link in jobLinks:
        start = link.find('jk') + 3
        stop = link.find('&fccid=')
        # done_links.append(job_URL + link[start:stop])
        done_links.append(link[start:stop])

    return done_links


def get_location(soup):
    posting_start = soup.find(name='div', attrs={'class': 'jobsearch-JobComponent icl-u-xs-mt--sm'})
    header_div = posting_start.find('div')
    rating_and_location = header_div.findAll(name='div', attrs={'class': 'icl-u-lg-mr--sm icl-u-xs-mr--xs'})
    location = rating_and_location[-1].nextSibling.get_text()
    return location


def get_company(soup):
    meta_data = soup.find(name='div', attrs={"class": "jobsearch-JobMetadataFooter"})
    date_text = meta_data.get_text()
    splits = date_text.split(' -', 1)
    return splits[0]


def get_description(soup):
    result = soup.find(name='div', attrs={"class": "jobsearch-JobComponent-description icl-u-xs-mt--md"})
    return result.get_text()


def get_title(soup):
    title = soup.find(name='h3', attrs={"class": "icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title"})
    return title.get_text()


def get_date_posted(soup):
    date_info = soup.find(name='div', attrs={"class": "jobsearch-JobMetadataFooter"})
    date_text = date_info.get_text()
    num = re.search(r'\d+', date_text).group()
    date_posted = process_date_posted(date_text, currentDT, num)
    return date_posted


def process_date_posted(relative_time, currentDT, num):
    if relative_time.find('+') != -1:
        difference = currentDT - datetime.timedelta(days=31)
        return difference.date()
    elif relative_time.find('day') != -1:
        days = num
        difference = currentDT - datetime.timedelta(days=int(days))
        return difference.date()
    elif relative_time.find('hour') != -1:
        hours = num
        difference = currentDT - datetime.timedelta(hours=int(hours))
        return difference.date()
    elif relative_time.find('just') != -1:
        return currentDT.date()
    else:
        print("ERROR: date format not recognized")


class Command(BaseCommand):
    help = 'Scrapes Job Listings'

    def add_arguments(self, parser):
        parser.add_argument('scrape_days', nargs='+', type=int)

    def handle(self, *args, **options):
        global results, count, soup, result
        oldest_date_not_encountered = True
        print(options)
        oldest_date = get_oldest_acceptable_date(int(options['scrape_days'][0]))
        if results.status_code != 200:
            print("Error: " + results.status_code)
        else:
            while oldest_date_not_encountered:
                current_URL = URL + str(count * 10)
                print(current_URL)
                results = requests.get(current_URL)
                soup = BeautifulSoup(results.text, "html.parser")
                result = soup.find(id='resultsCol')
                counter = 0
                for j in extract_job_links(result):
                    listing_URL = job_URL + j
                    single_job = requests.get(listing_URL)
                    if single_job.status_code != 200:
                        print("Error: " + single_job.status_code)
                    else:
                        job_soup = BeautifulSoup(single_job.text, "html.parser")
                        date = get_date_posted(job_soup)
                        if date != oldest_date:
                            # TODO hook these into database model
                            print("LISTING...")
                            print(j)  # jk indeed id
                            print(get_title(job_soup))
                            print(date)
                            print(get_location(job_soup))
                            print(get_company(job_soup))
                            #print(get_description(job_soup))
                            listing = JobListing(indeed_id=j,
                                                 title=get_title(job_soup),
                                                 posted_date=date,
                                                 location=get_location(job_soup),
                                                 company=get_company(job_soup),
                                                 description=get_description(job_soup))
                            listing.save()
                        else:
                            print("Hit job posted ", oldest_date, ", shutting down...")
                            oldest_date_not_encountered = False
                        print("\n")
                    counter = counter + 1
                count = count + 1
            print("done:\n")
