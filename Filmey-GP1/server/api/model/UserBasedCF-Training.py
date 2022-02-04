import pandas as pd
import psycopg2
import pandas.io.sql as sqlio
import pandas as pd

conn = psycopg2.connect(
    host="localhost",
    database="filmey",
    user="postgres",
    password="pgAdmin123")

# Create a cursor to perform database operations
cursor = conn.cursor()

import pandas as pd

from sklearn.model_selection import cross_val_score
from surprise import Dataset, Reader

from surprise.model_selection import cross_validate

rating =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\MLratings&DB.csv', low_memory=False)

ratingDB = sqlio.read_sql_query('SELECT *  FROM "Rating"', conn)

rating=ratingDB.append(rating)

rating.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\MLratings&DB.csv', index=False)


reader = Reader()

# get just top 1M rows for faster run time
data = Dataset.load_from_df(rating[['UserID','movieId','Rating']][:], reader)

from surprise import KNNWithMeans

# To use item-based cosine similarity
sim_options = {
    "name": "cosine",
    'min_support': 5,
    "user_based": True,  # Compute  similarities between items
}
algo = KNNWithMeans(sim_options=sim_options)


from surprise.model_selection import  train_test_split

trainset, testset = train_test_split(data, test_size=0.2)
algo.fit(trainset)



import pickle 

# Its important to use binary mode 
knnPickle = open('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\UserBasedKNN', 'wb') 

# source, destination 
pickle.dump(algo, knnPickle)

# # load the model from disk
# import pickle 
# loaded_model = pickle.load(open('knnpickle_file2', 'rb'))
# result = loaded_model.predict(1, 2848, verbose=True)

