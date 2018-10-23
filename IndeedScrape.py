import requests
from bs4 import BeautifulSoup

URL = "https://www.indeed.com/jobs?q=computer+science&l="

result = requests.get(URL)
if result.status_code != 200:
    print "Error: " + result.status_code
else:
    soup = BeautifulSoup(result.text, "html.parser")
    print(soup.prettify())

