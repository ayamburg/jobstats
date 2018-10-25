import requests
from bs4 import BeautifulSoup
import datetime
import re

currentDT = datetime.datetime.now()
Number_of_pages = 2
count = 0
URL = "https://www.indeed.com/jobs?q=computer+science&start="
job_URL = "https://www.indeed.com/viewjob?jk="
results = requests.get(URL)
soup = BeautifulSoup(results.text, "html.parser")
result = soup.find(id='resultsCol')


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


def get_job_description(one_job_URL):
    indeed_id = one_job_URL
    listing_URL = job_URL + one_job_URL
    job = requests.get(listing_URL)
    print(listing_URL)
    if job.status_code != 200:
        print("Error: " + job.status_code)
    else:
        soup = BeautifulSoup(job.text, "html.parser")
        result = soup.find(name='div', attrs={"class": "jobsearch-JobComponent-description icl-u-xs-mt--md"})
        title = soup.find(name='h3', attrs={"class" : "icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title"})
        # get the job posted time and clean it to "1 day ago" format
        date_info = soup.find(name='div', attrs={"class" : "jobsearch-JobMetadataFooter"})
        date_text = date_info.get_text()
        num = re.search(r'\d+',  date_text).group()
        print(date_text)
        date_posted = get_date_posted(date_text, currentDT, num)
        location = soup.find("title")
        location = location.get_text()
        start = location.find('-') + 2
        stop = location.find('-', start + 1)
        final_location = date_text[start:stop]
        print(final_location)
        print(indeed_id)
        print(date_posted)
        print(title.get_text())
        print("\n")
        return result.get_text()


def get_date_posted(relative_time, currentDT, num):
    if relative_time.find('+') != -1:
        difference = currentDT - datetime.timedelta(days=31)
        return difference.date()
    elif relative_time.find('days') != -1:
        days = num
        difference = currentDT - datetime.timedelta(days=int(days))
        return difference.date()
    elif relative_time.find('hours') != -1:
        hours = num
        difference = currentDT - datetime.timedelta(hours=int(hours))
        return difference.date()
    elif relative_time.find('just') != -1:
        return currentDT.date()
    else:
        print("ERROR: date format not recognized")


if results.status_code != 200:
    print("Error: " + results.status_code)
else:
    for i in range(Number_of_pages):
        URL = URL + str(count * 10)
        results = requests.get(URL)
        soup = BeautifulSoup(results.text, "html.parser")
        result = soup.find(id='resultsCol')
        for k in extract_job_links(result):
            get_job_description(k)
    print("done:\n")