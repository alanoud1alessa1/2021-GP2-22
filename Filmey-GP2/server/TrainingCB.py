from flask import Flask
from flask import Flask, request, jsonify
import pickle
import psycopg2
import pandas as pd
import pandas.io.sql as sqlio
from surprise import Dataset, Reader
from flask_cors import CORS
from sqlalchemy import false



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/reTrainUserCB', methods=['POST'])
def train():

    
        conn = psycopg2.connect(host="localhost",database="filmey",user="postgres",password="pgAdmin123")

        # Create a cursor to perform database operations
        cursor = conn.cursor()

        #Routes:
        #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\ratings.csv'
        #NoufD:'./api/model/ratings.csv'

        rating =pd.read_csv('./api/model//ratings.csv', low_memory=False)


        ratingDB = sqlio.read_sql_query('SELECT *  FROM "Rating"', conn)

        rating=ratingDB.append(rating)
        #Routes:
        #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\MLratings&DB.csv'
        #NoufD:'./api/model//MLratings&DB.csv'

        rating.to_csv('./api/model//MLratings&DB.csv', index=False)


        reader = Reader()

        # get just top 1M rows for faster run time
        data = Dataset.load_from_df(rating[['user_id','movie_id','rating']][:], reader)

        from surprise import KNNWithMeans

        # To use item-based cosine similarity
        param_grid = {'k': 60,
              'sim_options': {"name": "cosine",
                              "min_support":  5,
                              "user_based": True,
                             }
              }
        param_grid = {"sim_options": param_grid}
        algo = KNNWithMeans(sim_options=param_grid)

        from surprise.model_selection import cross_validate
        cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)


        # from surprise.model_selection import  train_test_split

        # trainset, testset = train_test_split(data, test_size=0.2)
        # algo.fit(trainset)



 

        # Its important to use binary mode 
        #Routes:
        #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\UserBasedKNN'
        #NoufD:./api/model/UserBasedKNN
        try:
            knnPickle = open('./api/model/UserBasedKNN', 'wb') 
            # source, destination 
            pickle.dump(algo, knnPickle)
            print("re trained the model")

            return jsonify("re trained the model")

        except:
            return jsonify("Error")



if __name__ == "__main__":
    app.run(port=4000, debug=True)
