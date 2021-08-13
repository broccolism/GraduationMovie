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
OUTPUT_PATH = "dissimilar-movies.json"

N_USER = -1
N_MOVIE = -1
N_RECOMMENDATIONS = 5
N_DISSIMILARS = 21


def init_data():
    global N_USER, N_MOVIE
    train_data = pd.read_table(DATA_PATH + RATINGS_PATH,
                               sep=SEPERATOR, header=None, names=TRAIN_COLUMNS, engine='python',
                               skiprows=[0]).astype({COLUMN_USERID: np.float, COLUMN_MOVIEID: np.float, COLUMN_RATING: np.float}).astype({COLUMN_USERID: int, COLUMN_MOVIEID: int, COLUMN_RATING: np.float})

    train_data.drop([COLUMN_TIMESTAMP], inplace=True, axis=1)

    N_USER = train_data.userId.max()
    N_MOVIE = train_data.itemId.max()

    rating = np.zeros((N_USER, N_MOVIE))
    for row in train_data.itertuples():
        rating[row[1] - 1, row[2] - 1] = row[3]

    train_matrix = np.copy(rating)
    test_matrix = np.zeros((N_USER, N_MOVIE))

    u = 0
    for row in train_matrix:
        nonzero_indicies = np.nonzero(row)
        per_20 = int(len(nonzero_indicies[0]) * 0.2)
        rand = random.choice(nonzero_indicies[0], per_20, replace=False)
        for i in range(per_20):
            test_matrix[u, rand[i]] = train_matrix[u, rand[i]]
            train_matrix[u, rand[i]] = 0
        u = u + 1

    return train_matrix, test_matrix


def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def adj_cosine_sim(train_data):
    sims = np.zeros((N_MOVIE, N_MOVIE))
    # user_mean = train_data.sum(
    #     axis=0)/((train_data != 0).sum(axis=0)) if (train_data != 0).sum(axis=0) else 0
    user_mean = np.array([
        np.sum(train_data[i])/(train_data != 0).sum(axis=0)[i]
        if (train_data != 0).sum(axis=0)[i] > 0
        else 0
        for i in range(N_USER)
    ])

    # sub_ratings = np.where(
    #     (train_data != 0), train_data - (user_mean.T)[None, :], train_data)

    sub_ratings = np.array([
        train_data[row, col] - user_mean[row]
        if train_data[row, col] != 0
        else 0
        for row in range(N_USER)
        for col in range(N_MOVIE)])

    for i in range(N_MOVIE):
        for j in range(i, N_MOVIE):
            sim = cosine_sim(sub_ratings[i], sub_ratings[j])
            sims[i, j] = sim
            sims[j, i] = sim

    return sims


def similarities(train_matrix):
    sim_matrix = adj_cosine_sim(train_matrix)
    sim_matrix = np.where((sim_matrix < 0), 0, sim_matrix)
    return sim_matrix


def predictions(train_matrix, sim_matrix):
    top = train_matrix.dot(sim_matrix)
    bottom = np.zeros((N_USER, N_MOVIE))
    for user in range(N_USER):
        nonzeros = np.nonzero(train_matrix[user])
        for movie in range(N_MOVIE):
            bottom[user, movie] = (sim_matrix[movie, nonzeros]).sum()

    pred_matrix = top / bottom
    np.nan_to_num(pred_matrix, copy=False)
    return pred_matrix


def err_rmse(test_matrix, pred_matrix):
    mse = mean_squared_error(
        test_matrix[test_matrix != 0], pred_matrix[test_matrix != 0])
    rmse = sqrt(mse)
    return rmse


def get_recommendations(pred, user_id):
    print(np.argsort(pred[user_id - 1]))
    descending_indicies = np.argsort(
        pred[user_id - 1])[(-1 * N_RECOMMENDATIONS):]
    print(descending_indicies)
    movie_data = pd.read_table(DATA_PATH + MOVIES_PATH,
                               sep=SEPERATOR, header=None, names=MOVIES_COLUMNS)

    recommendations = movie_data.iloc[descending_indicies + 1]
    return recommendations


def sort_by_dissimilarity(sim):
    idx_arr = np.empty(shape=[0, 3])
    for row_idx, row in enumerate(sim):
        for col_idx, similarity in enumerate(row):
            idx_arr = np.append(
                idx_arr, [[row_idx, col_idx, similarity]], axis=0)

    idx_arr = idx_arr[np.argsort(idx_arr[:, 2])[::-1]]
    return idx_arr


def get_dissimilar_movies(sorted_sim):
    result = []

    return


def write_to_file(target):
    output_file_name = DATA_PATH + OUTPUT_PATH
    with open(output_file_name, 'w') as file:
        file.write("{\n")

        file.write("}")
    return

    return


if __name__ == "__main__":
    train, test = init_data()
    print(f'done init data')
    sim = similarities(train)
    print(f'done sim')
    print(sort_by_dissimilarity(sim))
    # pred = np.copy(predictions(train, sim))
    # print(f'done pred')
    # err = err_rmse(test, pred)
    # print(f'done training. RMSE = ', err)

    # target_user = int(input("user id for recommendation: ")) - 1
    # print(get_recommendations(pred, target_user))
