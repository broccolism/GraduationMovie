#!/usr/bin/env python3

from random_username.generate import generate_username
import pandas as pd

# RESULT_COLUMN = ['id', 'name']
MIN_ID = 1
MAX_ID = 610

if __name__ == "__main__":
    id_data = [i for i in range(MIN_ID, MAX_ID + 1)]
    name_data = generate_username(MAX_ID)
    user_data = {'id': id_data, 'name': name_data}

    users = pd.DataFrame(data=user_data)

    users.to_csv('./user_to_database.csv',
                 sep=',', na_rep='NaN', index=False)
    print("DONE!")
