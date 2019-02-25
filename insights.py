#script to find skill/language trends in job listings
from data import data
import time
import datetime as dt
from dateutil.parser import parse
import pandas as pd
from tabulate import tabulate

class KeywordData(object):
    def __init__(self, data):
        self.keywords = data['keywords']
        self.datasets = {}
        # At a later time, refactor the following code to create a multiindex (heirarchical) dataframe to simplify things
        # Alternatively, assuming all skills have same date_range, put all skills in same dataframe with timestamp as index
        for kw in range(len(self.keywords)):
            self.datasets[self.keywords[kw]] = pd.DataFrame(data['y'][kw],index=pd.to_datetime(data['x'][kw]), columns=['Jobs'])
            self.datasets[self.keywords[kw]].index.name = 'Timestamp'

    def print_keyword_dataframes(self):
        for kw in self.datasets:
            print("keyword: ", kw, "\n\ndataframe:\n", tabulate(self.datasets[kw], headers='keys', tablefmt='psql'), "\n\n")

    def most_jobs(self):
        most = 0
        for kw,df in self.datasets.items():
            if df.sum(axis=0)[0] > most:
                most = df.sum(axis=0)[0]
        print("%s had the greatest demand with %d jobs posted" %(kw, most))

    def find_correlation(self):
        for kw1,df1 in self.datasets.items():
            for kw2,df2 in self.datasets.items():
                corr = df1['Jobs'].corr(df2['Jobs'])
                if corr > .75 and corr != 1:
                    print("Demand for %s and %s seem to be highly correlated, with %f" %(kw1,kw2,corr))

                    

# date = (data['x'][0][0])
# print(date)
# date = parse(date)
# print(date.month)
# df = pd.DataFrame(data, columns = ['x', 'y'])
#pd.to_datetime(df['x'][0])

print('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
keyword_data = KeywordData(data)
print(keyword_data.keywords)
keyword_data.print_keyword_dataframes()
keyword_data.most_jobs()
print(keyword_data.datasets['python'].index.dtype)
keyword_data.find_correlation()
