#!/usr/bin/env python3

import pandas as pd

# RESULT_COLUMN = ['id', 'title', 'imdb_id', 'tmdb_id', 'genres', 'year']
LINKS_COLUMN = ['id', 'imdb_id', 'tmdb_id']
MOVIES_COLUMN = ['id', 'title', 'genres']


def title_and_year_seperator(row):
    title_and_year = row['title']
    year_str = title_and_year[-7:]
    title = title_and_year.replace(year_str, "")
    year = year_str.replace(" (", "").replace(")", "")

    row['title'] = title
    return year


if __name__ == "__main__":
    movies = pd.read_csv('../movies.csv', header=None, names=MOVIES_COLUMN)
    links = pd.read_csv('../links.csv', header=None, names=LINKS_COLUMN)

    joined = movies.merge(links, how='left', on='id')
    joined = joined.iloc[1:]

    joined['year'] = joined.apply(title_and_year_seperator, axis=1)

    joined.to_csv('./movie_to_database.csv',
                  sep=',', na_rep='NaN', index=False)
    print("DONE!")
