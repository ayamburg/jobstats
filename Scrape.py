import requests
from bs4 import BeautifulSoup
import datetime
import re
# TODO grab salary and scrape by date
# TODO grab only non sponsored job info
#for x in listings:
#...     date = x.find(name='span', attrs={"class":"date"})
#...     print(date)


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


#def extract_location_from_result(soup):
#    locations = []
#    spans = soup.findAll('span', attrs={'class': 'location'})
#    for span in spans:
#        locations.append(span.text)
#    return locations


def get_location(soup):
    posting_start = soup.find(name='div', attrs={'class': 'jobsearch-JobComponent icl-u-xs-mt--sm'})
    header_div = posting_start.find('div')
    rating_and_location = header_div.findAll(name='div', attrs={'class': 'icl-u-lg-mr--sm icl-u-xs-mr--xs'})
    location = rating_and_location[-1].nextSibling.get_text()
    return location


#def get_company(soup):
#    companies = []
#    for div in soup.find_all(name='div', attrs={'class': 'row'}):
#        name = div.find_all(name='span', attrs={'class': 'company'})
#        if len(name) > 0:
#            for x in name:
#                companies.append(x.text.strip())
#        else:
#            other = div.find_all(name='span', attrs={'class': 'result-linklsource'})
#            for y in other:
#                companies.append(y.text.strip())
#    return companies


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


if results.status_code != 200:
    print("Error: " + results.status_code)
else:
    for i in range(Number_of_pages):
        current_URL = URL + str(count * 10)
        print(current_URL)
        results = requests.get(current_URL)
        soup = BeautifulSoup(results.text, "html.parser")
        result = soup.find(id='resultsCol')
        #locations = extract_location_from_result(result)
        #names = get_company(soup)
        counter = 0
        for j in extract_job_links(result):
            listing_URL = job_URL + j
            single_job = requests.get(listing_URL)
            if single_job.status_code != 200:
                print("Error: " + single_job.status_code)
            else:
                job_soup = BeautifulSoup(single_job.text, "html.parser")
                print("LISTING...")
                print(j)  # jk indeed id
                print(get_title(job_soup))
                print(get_date_posted(job_soup))
                print(get_location(job_soup))
                print(get_company(job_soup))
                #print(get_description(job_soup))

                print("\n")
            counter = counter + 1
        count = count + 1
    print("done:\n")