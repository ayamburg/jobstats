import requests
from bs4 import BeautifulSoup

URL = "https://www.indeed.com/jobs?q=computer+science&l="


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


result = requests.get(URL)
if result.status_code != 200:
    print "Error: " + result.status_code
else:
    soup = BeautifulSoup(result.text, "html.parser")
    for i, j in zip(extract_job_titles(soup), extract_job_summary(soup)):
        print "\n"
	print "NEW JOB************"
	print i, j
	print "\n"

