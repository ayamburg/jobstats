import requests
from bs4 import BeautifulSoup


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
        done_links.append(job_URL + link[start:stop])

    return done_links


def get_job_description(URL):
    job = requests.get(URL)
    if job.status_code != 200:
        print("Error: " + job.status_code)
    else:
        soup = BeautifulSoup(job.text, "html.parser")
        result = soup.find(name='div', attrs={"class": "jobsearch-JobComponent-description icl-u-xs-mt--md"})
        return result.get_text()


if results.status_code != 200:
    print("Error: " + results.status_code)
else:
    for i in range(Number_of_pages):
        URL = URL + str(count * 10)
        results = requests.get(URL)
        soup = BeautifulSoup(results.text, "html.parser")
        result = soup.find(id='resultsCol')
        for k in extract_job_links(result):
            print("\n")
            print(k)
            print("\n")
            print(get_job_description(k))
        print("\n")
    print("done:\n")