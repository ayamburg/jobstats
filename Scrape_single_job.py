import requests
from bs4 import BeautifulSoup
import datetime
import re
#from .models import jobListing

currentDT = datetime.datetime.now()
URL_old = "https://www.indeed.com/viewjob?jk=3066ae8ec74ce378"
URL_Macys = "https://www.indeed.com/viewjob?jk=9501aff9dc385475"
URL = "https://www.indeed.com/viewjob?jk=3b41e994ff3547a1"


#car = Car(
#    name="Car one",
#    color="red",
#    type=1,
#    description="A beautiful car"
#)
#car.save()


def get_job_description(URL, indeed_id):
    job = requests.get(URL)
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
        print(num)
        date_posted = get_date_posted(date_text, currentDT, num)
        location = soup.find("split")
        location = location.get_text()
        print(location)
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
        print(currentDT)
        difference = currentDT - datetime.timedelta(hours=int(hours))
        print(difference)
        return difference.date()
    elif relative_time.find('just') != -1:
        return currentDT.date()
    else:
        print("ERROR: date format not recognized")


get_job_description(URL, 0)