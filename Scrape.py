import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

URL = "https://www.indeed.com/jobs?q=computer+science&l="
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


def extract_job_summary(soup):
    summaries = []
    spans = soup.findAll('span', attrs={'class' : 'summary'})
    for span in spans:
        summaries.append(span.text.strip())
    return summaries


def extract_job_titles(soup):
    jobTitles = []
    for div in soup.findAll(name='div', attrs={"class" : "row"}):
        for a in div.find_all(name="a", attrs={"data-tn-element" : "jobTitle"}):
            jobTitles.append(a["title"])
    return jobTitles


if results.status_code != 200:
    print("Error: " + results.status_code)
else:
    for i, j in zip(extract_job_titles(result), extract_job_summary(result)):
        print("\n")
        print("NEW JOB************")
        print(i, j)
        print("\n")

    print("links: ")
    for k in extract_job_links(result):
        print("\n")
        print(k)
    print("\n")