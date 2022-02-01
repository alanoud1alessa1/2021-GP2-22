from flask import Flask
import numpy as np
from flask import Flask, request, jsonify
import pickle
from operator import itemgetter
import psycopg2
import pandas as pd
import pandas.io.sql as sqlio
from sklearn.metrics import consensus_score




app = Flask(__name__)

model = pickle.load(open('/Users/nouf/Desktop/knnpickle_file2','rb')) 

@app.route('/userBasedCF', methods=['POST'])
def index():


    # try:
    #     connection = psycopg2.connect(user="localhost",
    #                                 password="ppgAdmin123",
    #                                 port="5432",
    #                                 database="filmey")
    #     cursor = connection.cursor()
    #     postgreSQL_select_Query = "select * from mobile"

    #     cursor.execute(postgreSQL_select_Query)
    #     print("Selecting rows from mobile table using cursor.fetchall")
    #     mobile_records = cursor.fetchall()

    #     print("Print each row and it's columns values")
    #     for row in mobile_records:
    #         print("Id = ", row[0], )
    #         print("Model = ", row[1])
    #         print("Price  = ", row[2], "\n")

    # except (Exception, psycopg2.Error) as error:
    #     print("Error while fetching data from PostgreSQL", error)

    # finally:
    #     # closing database connection.
    #     if connection:
    #         cursor.close()
    #         connection.close()
    #         print("PostgreSQL connection is closed")

    conn = psycopg2.connect(
        host="localhost",
        database="filmey",
        user="postgres",
        password="pgAdmin123")

    # Create a cursor to perform database operations
    cursor = conn.cursor()

    # return cursor.feachall()



# from surprise import Dataset, Reader

# reader = Reader()

# # get just top 100K rows for faster run time
# data = Dataset.load_from_df(review[['user_id','movie_id','rating']][:], reader)



    # Get the data from the POST request.
    data = request.get_json(force=True)

    movieIdArray = data["filteredMovies"]
    userID = data["userID"]
    # return jsonify(movieIdArray)

    predectionArray=[]
    for id in movieIdArray:
        predection=model.predict(userID,int(id))
        movieId=predection.iid
        # return jsonify(movieId)
        predictedRating=predection.est
        predectionArray.append([movieId , predictedRating])
    predectionArray=sorted(predectionArray, key = itemgetter(1) , reverse=True)
    predectionArray=predectionArray[0:10]
    # return [predectionArray]
    # return jsonify(predectionArray[0][0])




    # ratingDB = sqlio.read_sql_query('SELECT * FROM "Rating"', conn)
    movies = []
    for i in predectionArray:
        # return jsonify(i[0])

        cursor.execute('SELECT movie_id  ,poster FROM "Movie" WHERE movie_id = %s' ,[i[0]] )
        # return jsonify(cursor.fetchall()[0])
        movies.append(cursor.fetchall()[0])
    return jsonify(movies)
    



from datetime import date
import datetime

# Load Movies 
df = pd.read_csv('movieData.csv', low_memory=False)


@app.route('/contentBasedRecommendations', methods=['POST'])
def sec():
# Function that takes in user fav genres and age  as input and outputs sautible movies

    def get_age(birthdate):
        today = date.today()
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
        #print("age:", age)
        return age


    def is_found(favGenres, genre):
        found=False
        for i in range(len(favGenres)):
            if (favGenres[i] == genre):
                found=True
        return found
                

        
    def get_recommendations(favGenres, birthDate):
        sautibleAgeGuide=[]
        sautibleMovies = pd.DataFrame()  
        age = get_age(birthDate) 
        
        if(age>0 and age<19):
                    
            #add Animation and Family genre in fav genre if not already exists
            if(not is_found(favGenres,"Animation")):
                favGenres.append("Animation")
            if(not is_found(favGenres,"Family")):
                favGenres.append("Family")
            
            sautibleAgeGuide.append("G")


        if(age>=7 and age<19):
                            
            sautibleAgeGuide.append("TV-Y7")

        if(age>=8 and age<19):
                            
            sautibleAgeGuide.append("PG")
            sautibleAgeGuide.append("GP")
            sautibleAgeGuide.append("TV-PG")
            
        if(age>=12 and age<19):
            
            sautibleAgeGuide.append("PG12")
            sautibleAgeGuide.append("R12")

            
        if(age>=13 and age<19):
            
            sautibleAgeGuide.append("PG-13")
            

        if(age>=15 and age<19):
            
            sautibleAgeGuide.append("R15")
            sautibleAgeGuide.append("M/PG")

            
        
        if(age>=17 and age<19):
            
            sautibleAgeGuide.append("TV-MA")
            sautibleAgeGuide.append("X")
            sautibleAgeGuide.append("R")

                
        if (age==18):
                
            sautibleAgeGuide.append("R18")
            sautibleAgeGuide.append("NC-17")
            sautibleAgeGuide.append("X")

                
        if(age>=50):

                #add History genre in fav genre if not already exists
                if(not is_found(favGenres,"History")):
                    
                    favGenres.append("History")


        for i in range(len(df)):

            for a in range(len(favGenres)):
                
                if (favGenres[a] in df['genres'][i]):
                    
                
                    if (len(sautibleAgeGuide) != 0):
                
                        for j in  range(len(sautibleAgeGuide)):
            
                            if (sautibleAgeGuide[j] == df['ageGuide'][i]):
                                
                                sautibleMovies= sautibleMovies.append(df.iloc[i])             

                    else:
                    
                        sautibleMovies= sautibleMovies.append(df.iloc[i])

                    
            
        sautibleMovies.drop_duplicates(keep = "first", inplace = True)

        #sautibleMovies.to_csv('sautibleMovies.csv',index=False)
        
        moviesIds = sautibleMovies['movieId'].tolist()
            
        return moviesIds

    x = get_recommendations(['comedy'], datetime.datetime(2010, 6, 1))
    x = x[:10]
    return jsonify(x)


        








if __name__ == "__main__":
    app.run(port=5000, debug=True)
    # index()
    # sec()





