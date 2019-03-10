import pandas as pd
import numpy as np

#scan folder containing dataset json objects and load them in
def create_df(dataset):
    #create dictionary out of keywords and associated data, creating a Series out of each data list
    #so that we can create a dataframe with all keywords in it, even if some keywords have fewer
    #data points
    data = {key:pd.Series(value) for (key, value) in zip(dataset['keywords'], dataset['y'])}
    df = pd.DataFrame(data)
    #Pandas freaks out when I try to set a timeseries index in the dataframe's constructor,
    #so I have to do it separately
    df.set_index(pd.to_datetime(dataset['x'][0]),inplace=True)
    df.index.name='Date'
    if dataset['raw'] != '1':
        df=df*100 #convert decimal to percentage
    # fill NaN values with 0
    df.fillna(0,inplace=True)
    return df

def trendline(df_col):
    """find the slope for the last month for a particular keyword"""
    # df_col.plot()
    # plt.show()
    past_month = df_col.rolling(7,center=True).mean().dropna(axis=0)
    # past_month.plot()
    # plt.show()
    coefficients, residuals, _, _, _ = np.polyfit(range(len(past_month.index)),past_month,1,full=True)
    mse = residuals[0]/(len(past_month.index))
    nrmse = np.sqrt(mse)/(past_month.max() - past_month.min())
    # print('Slope ' + str(coefficients[0]))
    # print('NRMSE: ' + str(nrmse))
    return coefficients[0]

def get_trending_up(dataset):
    """Returns the skill with highest upward trend, its slope, and confidence score.

    Arguments: Takes in 1 dict
    Constraints: The data should be daily and in percent format.
    """
    insight_hash = {}
    insight_hash['type'] = 'Trending Up'
    df = create_df(dataset)
    kw = {}
    maxVal=0
    slopes = {}
    for col in df:
        slopes[trendline(df[[col]])[0]] = col
    sort = sorted(slopes)
    sort.reverse()
    insight_hash['skill'] = slopes[sort[0]]
    insight_hash['value'] = sort[0]
    insight_string = "%s is trending up" %slopes[sort[0]]
    insight_hash['insight'] = insight_string
    return insight_hash

def get_trending_down(dataset):
    """Returns the skill with lowest downward trend, its slope, and confidence score.

    Arguments: Takes in a single dataset in the form of a dict
    Constraints: The data should be daily and in percent format.
    """
    insight_hash = {}
    insight_hash['type'] = 'Trending Down'
    df = create_df(dataset)
    kw = {}
    maxVal=0
    slopes = {}
    for col in df:
        slopes[trendline(df[[col]])[0]] = col
    sort = sorted(slopes)
    insight_hash['skill'] = slopes[sort[0]]
    insight_hash['value'] = sort[0]
    insight_string = "%s is trending down" %slopes[sort[0]]
    insight_hash['insight'] = insight_string
    return insight_hash

def get_skill_location(city_datasets,non_city_dataset):
    """Finds the most dominant skill and city pair and its ratio of jobs added
    over the next closest city. Returns skill, city, and ratio.

    Arguments: List of dicts representing datasets filtered by a city, and
    a single dataset with same keywords, but without location filtering
    Constraints: All datasets must be in raw format. Frequency does not matter,
    so long as cumulative sums for the entire scraping period are being used.
    """
    insight_hash={}
    insight_hash['type'] = 'Location Insight'

    #create dictionary with city names and their associated dataset
    city_df_dict = {}
    for city_dataset in city_datasets:
        city_df_dict[city_dataset['location']] = create_df(city_dataset).sum()
    main_dataset = create_df(non_city_dataset).sum()
    #for each skill in all dataframes, sum the number of jobs posted over
    #entire scraping period
    city_index=[]
    for city in city_df_dict:
        city_index.append(city)
    skill_by_cities = []
    for skill in main_dataset.index:
        skill_by_cities.append(pd.Series([data[skill] for city,data in city_df_dict.items()], index=city_index,name=skill))

    greatest_ratio = 0
    skill_name = []
    dominant_city = []
    as_pct_of_all_jobs = 0

    for series in skill_by_cities:
        series.sort_values(axis=0,ascending=True,inplace=True)
        print(series)
        pct_change = series.pct_change()
        # print(pct_change)
        # print(pct_change.tail(1).index[0])
        if pct_change.tail(1)[0] > greatest_ratio:
            greatest_ratio = pct_change.tail(1)[0]
            skill_name = series.name
            dominant_city = series.tail(1).index[0]
            as_pct_of_all_jobs = (series.tail(1)[0] / main_dataset[series.name]) * 100

    insight_string = "%s has been dominant in %s, with %dx more jobs than the next closest city." %(skill_name,dominant_city,greatest_ratio)
    insight_hash['insight'] = insight_string
    insight_hash['skill'] = skill_name
    insight_hash['city'] = dominant_city
    insight_hash['ratio'] = greatest_ratio
    # print(skill_name, "has been very dominant in", dominant_city, "with %dx more jobs than the next closest city\n" %greatest_ratio, "This represents %d%% of the total market for this skill" %as_pct_of_all_jobs)
    # print(main_dataset)
    return insight_hash

def get_dominant_skill(dataset):
    """Returns a skill, if any, that has averaged at least 25% appearance in job
    listings since the start date of scraping.

    Arguments: Takes in a single dataset in the form of a dict
    Constraints: The dataset should be in percent format, with weekly frequency
    """
    insight_hash={}
    insight_hash['type'] = 'Dominant Skill'
    df = create_df(dataset)
    mean_series = df.mean().sort_values(axis=0,ascending=False)
    insight_hash['skill'] = mean_series.index[0]
    insight_hash['value'] = mean_series.iloc[0]
    scraping_period =df.index[(len(df.index)-1)] - df.index[0]
    insight_string = "Over the past " + str(scraping_period.days) + " days, %s has averaged the highest demand, required in %d%% of jobs." %(mean_series.index[0],mean_series.iloc[0])
    insight_hash['insight'] = insight_string
    return insight_hash

def get_correlation(dataset):
    """Returns the pair of skills for which the greatest pairwise correlation
    exists.

    Arguments: A single dataset in dict format
    Constraints: Data must be percent format. Any frequency can be used, but
    daily is preferred.
    """
    insight_hash={}
    insight_hash['type'] = 'Correlation'
    df = create_df(dataset).corr().replace(to_replace=1,value=0)
    max=df.max().max()
    print(df.max().max(), "\n", df.max().idxmax())
    print(df.loc[df[df.max().idxmax()] == df.max().max()].index[0])
    insight_hash['skill_one'] = df.max().idxmax()
    insight_hash['skill_two'] = df.loc[df[df.max().idxmax()] == df.max().max()].index[0]
    insight_hash['correlation'] = max
    insight_string = "Demand for %s and %s is tightly linked, with a correlation of %f" %(insight_hash['skill_one'],insight_hash['skill_two'],max)
    insight_hash['insight'] = insight_string

    return insight_hash

# trendline(city_data['boston'][0][['python']])
# print(city_data['boston'][0][['javascript']].rolling(7,center=True).mean().dropna(axis=0).resample('M').mean())
# print(get_trending_up(json_objects[0]))
# print(get_trending_down(json_objects[0]))
# print(get_dominant_skill(json_objects[2]))
# get_skill_location([json_objects[1],json_objects[3]], json_objects[5])
# get_correlation(json_objects[4])
