#script to find skill/language trends in job listings
####################################
# TASKS:
# 1. find percentage
from data import data, pct_data
import time
import datetime as dt
from dateutil.parser import parse
import pandas as pd
from tabulate import tabulate
import numpy as np

# class container for skills dataset and associated operations
class KeywordData(object):
    def __init__(self, data):
        self.keywords = data['keywords']
        self.pct_keywords = pct_data['keywords']
        self.datasets = {}
        self.pct_datasets = {}
        for kw in range(len(self.keywords)):
            self.datasets[self.keywords[kw]] = pd.DataFrame(data['y'][kw],index=pd.to_datetime(data['x'][kw]), columns=[self.keywords[kw]])
            self.datasets[self.keywords[kw]].index.name = 'Date'
        self.dataset= pd.concat(list(self.datasets.values()),axis=1)
        for kw in range(len(self.pct_keywords)):
            self.pct_datasets[self.pct_keywords[kw]] = pd.DataFrame(pct_data['y'][kw],index=pd.to_datetime(pct_data['x'][kw]), columns=[self.pct_keywords[kw]])
            self.pct_datasets[self.pct_keywords[kw]].index.name = 'Date'
        self.pct_dataset= pd.concat(list(self.pct_datasets.values()),axis=1)

    def print_keyword_dataframes(self):
            print("\n\ndataframe:\n", tabulate(self.dataset, headers='keys', tablefmt='psql'), "\n\n")

            # working
    def find_correlation(self):
        """Computes column-wise correlation calculation for all column pairs
         in dataframe. Self-correlation is not displayed"""
        for i in (range(len(self.keywords)-1)):
            for j in range(i,len(self.keywords)):
                corr = self.dataset[self.keywords[i]].corr(self.dataset[self.keywords[j]])
                if corr > .90 and (self.keywords[i] != self.keywords[j]):
                    print("significant correlation between %s and %s" % (self.keywords[i],self.keywords[j]))

        # working
    def monthly_leader(self):
        """computes the current skill leader in terms of number of jobs
        added in the last 30 days, then finds the rate at which it's
        found in job applications"""
        monthly_totals = keyword_data.dataset.tail(30).sum(axis=0) #get cumulative job postings for last 30 days rtype: df
        monthly_pct = keyword_data.pct_dataset.resample('M').mean() #get average percentage of all jobs for last 30 days rtype: df
        top_skill= monthly_totals.idxmax() # get name of skill with most jobs in last 30 days
        num_jobs = monthly_totals.max() # get number of jobs for this skill
        avg_pct = monthly_pct.tail(1).max(axis=1)[0] # find proportion of this skills in all job postings
        print("Over the past month, %s has been the most featured skill, with %f%% of posted jobs requiring it." %(top_skill,avg_pct*100))


print('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
keyword_data = KeywordData(data)
keyword_data.find_correlation()
