#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
from math import sqrt
from numpy import random
from sklearn.metrics import mean_squared_error

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
    # sims = np.zeros((N_MOVIE, N_MOVIE))

    movie_mean = train_data.sum(axis=0)/(train_data != 0).sum(axis=0)
    sub_ratings = np.where(
        (train_data != 0), train_data - movie_mean[None, :], train_data)
    print(len(sub_ratings))
    sub_ratings = np.transpose(sub_ratings).copy()
    sims = np.array([cosine_sim(sub_ratings[i], sub_ratings[j])
                     for i in range(N_MOVIE) for j in range(i, N_MOVIE)])
    # for i in range(N_MOVIE):
    #     for j in range(i, N_MOVIE):
    #         sim = cosine_sim(sub_ratings[i], sub_ratings[j])
    #         sims[i, j] = sim
    #         sims[j, i] = sim

    return sims


def similarities(train_matrix):
    sim_matrix = adj_cosine_sim(train_matrix)
    sim_matrix = np.where((sim_matrix < 0), 0, sim_matrix)
    return sim_matrix


def sort_by_dissimilarity(sim):
    idx_arr = np.empty(shape=[0, 3])
    for row_idx, row in enumerate(sim):
        for col_idx, similarity in enumerate(row):
            idx_arr = np.append(
                idx_arr, [[row_idx, col_idx, similarity]], axis=0)

    idx_arr = idx_arr[np.argsort(idx_arr[:, 2])[::-1]]
    return idx_arr

# def get_dissimilr_movies(sim):


#     return users


def wrtie_to_file(sim):
    output_file_name = DATA_PATH + OUTPUT_PATH
    with open(output_file_name, 'w') as file:
        file.write("{\n")

        file.write("}")
    return


if __name__ == "__main__":
    train = init_data()
    print(f'done init data')
    sim = similarities(train)
    print("done sim")
    sorted_sim = sort_by_dissimilarity(sim)
    print(sim)
    # print(f'done sim')
    # wrtie_to_file(sim)
    # print("DONE!")
