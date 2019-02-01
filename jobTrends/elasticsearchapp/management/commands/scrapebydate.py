from django.core.management.base import BaseCommand, CommandError
from elasticsearchapp.models import JobListing

import requests
from bs4 import BeautifulSoup
import datetime
import re
import sys

currentDT = datetime.datetime.now()
Number_of_pages = 20
count = 0
URL = "https://www.indeed.com/jobs?q=computer+science&sort=date&filter=0&limit=50&start="
job_URL = "https://www.indeed.com/viewjob?jk="
results = requests.get(URL)
soup = BeautifulSoup(results.text, "html.parser")
result = soup.find(id='resultsCol')
log_name = str(datetime.datetime.now()) + "_scrape.log"
log_file = open(log_name, "a+")
sys.stderr = log_file # redirect errors to logfile


def get_oldest_acceptable_date(days_old):
    date_of_oldest = currentDT - datetime.timedelta(days=days_old - 1)
    return date_of_oldest


def log_err(err):
    if err != '':
        log_file.write(err)
        return True
    return False

def extract_job_links(soup):
    #No fail safes yet, might need them
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
    err = ''
    location = ''
    posting_start = soup.find(name='div', attrs={'class': 'jobsearch-JobComponent icl-u-xs-mt--sm'})
    if posting_start is None:
        err = "ERROR: in get_location, posting_start not found"
        return location, err
    header_div = posting_start.find('div')
    if header_div is None:
        err = "ERROR: in get_location, header_div not found"
        return location, err
    rating_and_location = header_div.findAll(name='div', attrs={'class': 'icl-u-lg-mr--sm icl-u-xs-mr--xs'})
    location = ''
    if len(rating_and_location) == 0:
        err = "ERROR: in get_location, rating_and_location empty"
        return location, err
    elif rating_and_location[-1]:
        location = rating_and_location[-1].nextSibling.get_text()
    return location, err


def get_company(soup):
    err = ''
    meta_data = soup.find(name='div', attrs={"class": "jobsearch-JobMetadataFooter"})
    if meta_data is None:
        err = "META_DATA_COMPANY_NOT_FOUND"
        return '', err
    date_text = meta_data.get_text()
    splits = date_text.split(' -', 1)
    return splits[0], err


def get_description(soup):
    err = ''
    result = soup.find(name='div', attrs={"class": "jobsearch-JobComponent-description icl-u-xs-mt--md"})
    if result is None:
        err = "DESCRIPTION_NOT_FOUND"
        return '', err
    return result.get_text(), err


def get_title(soup):
    err = ''
    title = soup.find(name='h3', attrs={"class": "icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title"})
    if title is None:
        err = "TITLE_NOT_FOUND"
    return title.get_text(), err


def get_date_posted(soup):
    date_info = soup.find(name='div', attrs={"class": "jobsearch-JobMetadataFooter"})
    if date_info is None:
        return datetime.date(2000, 1, 1)
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
        log_file.write("ERROR: date format not recognized")
        return datetime.date(2000, 1, 1)


class Command(BaseCommand):
    help = 'Scrapes Job Listings'

    def add_arguments(self, parser):
        parser.add_argument('scrape_days', nargs='+', type=int)

    def handle(self, *args, **options):
        global results, count, soup, result, log_file
        oldest_date_not_encountered = True
        log_file.write(str(options))
        job_count = 0
        new_jobs = 0
        oldest_date = get_oldest_acceptable_date(int(options['scrape_days'][0]))
        if results.status_code != 200:
            log_file.write("Error: " + str(results.status_code))
        else:
            while oldest_date_not_encountered and count != Number_of_pages:
                current_URL = URL + str(count * 50)
                log_file.write('\n')
                log_file.write(current_URL)
                log_file.write('\n')
                print('page---------')
                results = requests.get(current_URL)
                soup = BeautifulSoup(results.text, "html.parser")
                result = soup.find(id='resultsCol')
                counter = 0
                for j in extract_job_links(result):
                    listing_URL = job_URL + j
                    single_job = requests.get(listing_URL)
                    if single_job.status_code != 200:
                        log_file.write("Error: " + str(single_job.status_code))
                    else:
                        err = ''
                        job_soup = BeautifulSoup(single_job.text, "html.parser")
                        date = get_date_posted(job_soup)
                        title, err = get_title(job_soup)
                        if log_err(err): continue
                        location, err = get_location(job_soup)
                        if log_err(err): continue
                        company, err = get_company(job_soup)
                        if log_err(err): continue
                        description, err = get_description(job_soup)
                        if log_err(err): continue
                        if date != oldest_date:
                            log_file.write("LISTING...")
                            log_file.write(j)  # jk indeed id
                            log_file.write(', ')
                            log_file.write(title)
                            log_file.write(', ')
                            log_file.write(str(date))
                            log_file.write(', ')
                            log_file.write(location)
                            log_file.write(', ')
                            log_file.write(company)
                            log_file.write(', ')
                            log_file.write(str(len(description)))
                            listing = JobListing.objects.update_or_create(
                                indeed_id=j,
                                defaults={'title': get_title(job_soup),
                                          'posted_date': date,
                                          'location': get_location(job_soup),
                                          'company': get_company(job_soup),
                                          'description': get_description(job_soup)})
                            listing[0].save()
                            job_count += 1
                            if listing[1]:
                                log_file.write(', NEW JOB')
                                print('*', end='')
                                new_jobs += 1
                            print(str(job_count))
                        else:
                            log_file.write("Hit job posted " + str(oldest_date) + ", shutting down...")
                            oldest_date_not_encountered = False
                        log_file.write("\n")
                    counter = counter + 1
                count = count + 1
            log_file.write("done!")
            log_file.write("\ntotal jobs scraped: " + str(job_count))
            log_file.write("\nnew jobs scraped: " + str(new_jobs))
            print("done!\n")
            print("\ntotal jobs scraped: " + str(job_count))
            print("\nnew jobs scraped: " + str(new_jobs))
