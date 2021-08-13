#!/usr/bin/env python3

import pandas as pd

# RESULT_COLUMN = ['id', 'user_id', 'movie_id', 'rating', 'timestamp']
RATINGS_COLUMN = ['user_id', 'movie_id', 'rating', 'timestamp']


if __name__ == "__main__":
    ratings = pd.read_csv('../ratings.csv', header=None, names=RATINGS_COLUMN)

    ratings.to_csv('./rating_to_database.csv',
                   sep=',', na_rep='NaN', index=True)
    print("DONE!")
