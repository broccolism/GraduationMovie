#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
from math import sqrt
from numpy import random
from sklearn.metrics import mean_squared_error
import sklearn.preprocessing as pp
import scipy as sp

COLUMN_USERID = "userId"
COLUMN_MOVIEID = "itemId"
COLUMN_RATING = "rating"
COLUMN_TIMESTAMP = "timestamp"

TRAIN_COLUMNS = [COLUMN_USERID, COLUMN_MOVIEID,
                 COLUMN_RATING, COLUMN_TIMESTAMP]
MOVIES_COLUMNS = ["movieId", "title", "genre"]

DATA_PATH = "../../data/ml-latest-small/"
RATINGS_PATH = "ratings.csv"
MOVIES_PATH = "movies.csv"
SEPERATOR = ","
OUTPUT_PATH = "dissimilar_movies.json"
N_USER = -1
N_MOVIE = -1
N_RECOMMENDATIONS = 5
N_DISSIMILARS = 21


def init_data():
    global N_USER, N_MOVIE
    train_data = pd.read_table(DATA_PATH + RATINGS_PATH,
                               sep=SEPERATOR, header=None, names=TRAIN_COLUMNS, skiprows=[0]).astype({COLUMN_USERID: np.float, COLUMN_MOVIEID: np.float, COLUMN_RATING: np.float}).astype({COLUMN_USERID: int, COLUMN_MOVIEID: int, COLUMN_RATING: np.float})

    train_data.drop([COLUMN_TIMESTAMP], inplace=True, axis=1)
    N_USER = train_data.userId.max()
    N_MOVIE = train_data.itemId.max()

    rating = np.zeros((N_USER, N_MOVIE))
    for row in train_data.itertuples():
        rating[row[1] - 1, row[2] - 1] = row[3]

    train_matrix = np.copy(rating)
    return train_matrix


def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def adj_cosine_sim(train_data):
    sims = np.zeros((N_MOVIE, N_MOVIE))

    movie_mean = train_data.sum(axis=0)/(train_data != 0).sum(axis=0)
    sub_ratings = np.where(
        (train_data != 0), train_data - movie_mean[None, :], train_data)

    col_normed_mat = pp.normalize(
        sp.sparse.csc_matrix(sub_ratings).tocsc(), axis=0)
    sims = col_normed_mat.T * col_normed_mat

    return sims


def sorted_set_by_dissimilarity(sim):
    row_idx = (sim.nonzero()[0]).astype(np.int0)
    col_idx = (sim.nonzero()[1]).astype(np.int0)

    val_with_idx = list(zip(row_idx, col_idx, sim.data))
    sorted_all = sorted(val_with_idx, key=lambda item: item[2])

    sorted_sim = set()
    for (row, col, _) in sorted_all:
        sorted_sim.add(row)
        if len(sorted_sim) == N_DISSIMILARS:
            break
        else:
            sorted_sim.add(col)
            if len(sorted_sim) == N_DISSIMILARS:
                break

    return sorted_sim


def write_to_file(sorted_set):
    output_file_name = DATA_PATH + OUTPUT_PATH
    with open(output_file_name, 'w') as file:
        file.write(str(list(sorted_set)))

    return


if __name__ == "__main__":
    train = init_data()
    print(f'done init data')
    sim = adj_cosine_sim(train)
    print("done sim")
    sorted_set = sorted_set_by_dissimilarity(sim)
    write_to_file(sorted_set)
    print("DONE!")
