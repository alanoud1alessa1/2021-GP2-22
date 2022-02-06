from lib2to3.pgen2.pgen import DFAState
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



# @app.route('/userBasedCFTraining', methods=['POST'])
# def userBasedCFTraining():
#     import pandas as pd
#     import psycopg2
#     import pandas.io.sql as sqlio
#     import pandas as pd

#     conn = psycopg2.connect(
#         host="localhost",
#         database="filmey",
#         user="postgres",
#         password="pgAdmin123")

#     # Create a cursor to perform database operations
#     cursor = conn.cursor()

#     import pandas as pd

#     from sklearn.model_selection import cross_val_score
#     from surprise import Dataset, Reader

#     from surprise.model_selection import cross_validate

#     rating =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\MLratings&DB.csv', low_memory=False)

#     ratingDB = sqlio.read_sql_query('SELECT *  FROM "Rating"', conn)

#     rating=ratingDB.append(rating)

#     rating.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\MLratings&DB.csv', index=False)


#     reader = Reader()

#     # get just top 1M rows for faster run time
#     data = Dataset.load_from_df(rating[['UserID','movieId','Rating']][:], reader)

#     from surprise import KNNWithMeans

#     # To use item-based cosine similarity
#     sim_options = {
#         "name": "cosine",
#         'min_support': 5,
#         "user_based": True,  # Compute  similarities between items
#     }
#     algo = KNNWithMeans(sim_options=sim_options)


#     from surprise.model_selection import  train_test_split

#     trainset, testset = train_test_split(data, test_size=0.2)
#     algo.fit(trainset)



#     import pickle 

#     # Its important to use binary mode 
#     try:
#         knnPickle = open('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\UserBasedKNN', 'wb') 
#         # source, destination 
#         pickle.dump(algo, knnPickle)
#         return jsonify("success")

#     except:
#         return jsonify("Error")




@app.route('/userBasedCF', methods=['POST'])
def index():
    import psycopg2
    import pandas.io.sql as sqlio
    import pandas as pd
    from surprise import Dataset, Reader
    import pickle
    # Get the data from the POST request.
    data = request.get_json(force=True)

    #threshold=data['threshold']
    userID = data["userID"]
    
    #Check if model has already been trained with this user 
    rating =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\MLratings&DB.csv', low_memory=False)
    rating = rating['user_id'].tolist()
    numberOrRatingsInModel=rating.count(userID)
    
    if(numberOrRatingsInModel<20):
        conn = psycopg2.connect(host="localhost",database="filmey",user="postgres",password="pgAdmin123")

        # Create a cursor to perform database operations
        cursor = conn.cursor()


        rating =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\ratings.csv', low_memory=False)

        usersId = pd.Series(list(rating['user_id']))
        userInRating=(usersId==userID).any()
        if userInRating:
            return jsonify(userInRating)

        ratingDB = sqlio.read_sql_query('SELECT *  FROM "Rating"', conn)

        rating=ratingDB.append(rating)

        rating.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\MLratings&DB.csv', index=False)


        reader = Reader()

        # get just top 1M rows for faster run time
        data = Dataset.load_from_df(rating[['user_id','movie_id','rating']][:], reader)

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



 

        # Its important to use binary mode 
        try:
            knnPickle = open('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\UserBasedKNN', 'wb') 
            # source, destination 
            pickle.dump(algo, knnPickle)

        except:
            return jsonify("Error")

    


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
    model = pickle.load(open('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\api\\model\\UserBasedKNN','rb')) 

    conn = psycopg2.connect(
        host="localhost",
        database="filmey",
        user="postgres",
        password="pgAdmin123")

    # Create a cursor to perform database operations
    cursor = conn.cursor()



    
    data = request.get_json(force=True)
    param= (str(userID),str(userID))

    #Get filtered Movies 
    filteredMovie = sqlio.read_sql_query('SELECT movie_id  FROM "Movie" WHERE movie_id NOT IN(SELECT movie_id FROM "Rating" WHERE user_id=%s AND is_deleted=false) AND movie_id NOT IN(SELECT movie_id FROM "Review" WHERE user_id=%s AND is_deleted=false) AND is_deleted=false', conn, params=param)
    movieIdArray = filteredMovie['movie_id'].tolist()
    
    #Predict 
    predectionArray=[]
    for id in movieIdArray:
        predection=model.predict(userID,int(id))
        movieId=predection.iid
        predictedRating=predection.est
        predectionArray.append([movieId , predictedRating])
    predectionArray=sorted(predectionArray, key = itemgetter(1) , reverse=True)
    predectionArray=predectionArray[0:20]


    #Get poters of recommended movies
    movies = []
    for i in predectionArray:
        cursor.execute('SELECT movie_id  ,poster FROM "Movie" WHERE movie_id = %s' ,[i[0]] )
        movies.append(cursor.fetchall()[0])
    return jsonify(movies)

    



from datetime import date
import datetime

# Load Movies 
df = pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv', low_memory=False)


@app.route('/modelBased', methods=['POST'])
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

@app.route('/contentBasedPreprocessing', methods=['POST'])
def contentBasedPreprocessing():
    import psycopg2
    import pandas.io.sql as sqlio

    conn = psycopg2.connect(
        host="localhost",
        database="filmey",
        user="postgres",
        password="pgAdmin123")

    # Create a cursor to perform database operations
    cursor = conn.cursor()

    data = request.get_json(force=True)
    movieID=data['movieID']
    status=data['status']
    param = (str(movieID))
    if status=="Add" or status=="Edit":
        movieDB = pd.read_sql_query('SELECT *  FROM "Movie"  where movie_id=%s',conn, params=[param])
        

        genresDB = sqlio.read_sql_query('SELECT * from "Movie_Genre" inner join "Genre" ON "Movie_Genre".genre_id = "Genre".genre_id where movie_id=%s' , conn,params=[param])
        genresDB=genresDB[['movie_id','genre']]
        genresDB = genresDB.groupby('movie_id')['genre'].apply(list).reset_index(name="genre")

        languagesDB = sqlio.read_sql_query('SELECT * from "Movie_Language" inner join "Language" ON "Movie_Language".language_id = "Language".language_id where movie_id=%s', conn,params=[param])
        languagesDB=languagesDB[['movie_id','language']]
        languagesDB = languagesDB.groupby('movie_id')['language'].apply(list).reset_index(name="language")

        directorsDB = sqlio.read_sql_query('SELECT * from "Movie_Director" inner join "Director" ON "Movie_Director".director_id = "Director".director_id where movie_id=%s', conn, params=[param])
        directorsDB = directorsDB.groupby('movie_id')['director'].apply(list).reset_index(name="director")

        writersDB = sqlio.read_sql_query('SELECT * from "Movie_Writer" inner join "Writer" ON "Movie_Writer".writer_id = "Writer".writer_id where movie_id=%s', conn,params=[param])
        writersDB = writersDB.groupby('movie_id')['writer'].apply(list).reset_index(name="writer")

        actorsDB = sqlio.read_sql_query('SELECT "Role".movie_id,"Role".actor_id,"Role".role,"Actor".actor,"Actor".actor_image_url from "Role" inner join "Actor" ON "Role".actor_id = "Actor".actor_id where movie_id=%s', conn,params=[param])

        actorColumn=actorsDB[['actor','role','actor_image_url']].to_numpy().tolist()
        actorColumn=pd.Series(actorColumn)
        actorColumn = pd.DataFrame (actorColumn, columns = ['actors'])
        actorsDB["actors"]=actorColumn
        actorsDB=actorsDB[['movie_id','actors']]
        actorsDB = actorsDB.groupby('movie_id')['actors'].apply(list).reset_index(name="actors")

        from functools import reduce
        dfs = [movieDB,genresDB,languagesDB,directorsDB,writersDB,actorsDB]
        movieData = reduce(lambda left,right: pd.merge(left,right,on='movie_id'), dfs)
        df=movieData

        from rake_nltk import Rake

        from imdb import IMDb
        ia = IMDb()

        # initializing the new column
        df['keywords']=df['description']

        for i in range(len(df)):
            try:
                black_panther = ia.get_movie(df['imdbId'][i], info='keywords')
                print(df['imdbTitle'][i] , ":" , black_panther['keywords'])
                print()
                df['keywords'][i]=black_panther['keywords']
            except KeyError:
                print("error in imdb")
                plot = df['description'][i]
                r = Rake()
                key=r.extract_keywords_from_text(plot)
                key_words_dict_scores = r.get_word_degrees()
                df['keywords'][i] = list(key_words_dict_scores.keys())
                
        df['description']=df['keywords']
        df.drop(['keywords'], axis='columns', inplace=True)

        for i in range(len(df)):
            
            df['actors'][i] = str(df['actors'][i]).replace("[" , "")
            df['actors'][i] = str(df['actors'][i]).replace("]" , "")
            df['actors'][i] = str(df['actors'][i]).replace("'" , "")
            df['actors'][i] = str(df['actors'][i]).replace('"', "")
            df['actors'][i] = str(df['actors'][i]).rstrip()
            df['actors'][i] = str(df['actors'][i]).lstrip()


            actorList = list(df['actors'][i].split(", "))
                
                
            count = 0 
            actorNames=[]
            
            
            for k in range((len(actorList)//3)):
                
                actorNames.append(actorList[count]) 

                count = count+1
                print(actorNames)


                actorRole = actorList[count]
                count = count+1

                actorImg = actorList[count]
                count = count+1
                
                if ( k == (len(actorList)//3)-1 ):
                    df['actors'][i] = actorNames

        import re

        for i in range(len(df)):
            
            
            df['genre'][i] = str(df['genre'][i]).replace("[" , "")
            df['genre'][i] = str(df['genre'][i]).replace("]" , "")
            df['genre'][i] = str(df['genre'][i]).replace("'" , "")
            df['genre'][i] = str(df['genre'][i]).replace("," , "")
            
            df['language'][i] = str(df['language'][i]).replace("[" , "")
            df['language'][i] = str(df['language'][i]).replace("]" , "")
            df['language'][i] = str(df['language'][i]).replace("'" , "")
            df['language'][i] = str(df['language'][i]).replace("," , "")
            
            df['director'][i] = str(df['director'][i]).replace("[" , "")
            df['director'][i] = str(df['director'][i]).replace("]" , "")
            df['director'][i] = str(df['director'][i]).replace("'" , "")
            df['director'][i] = str(df['director'][i]).replace('"' , "")
            df['director'][i] = str(df['director'][i]).rstrip()
            df['director'][i] = str(df['director'][i]).lstrip()
            df['director'][i] = re.sub("[\(\[].*?[\)\]]", "",  str(df['director'][i]))
            df['director'][i] = str(df['director'][i]).replace(" " , "")
            df['director'][i] = str(df['director'][i]).replace("," , " ")
            
            df['writer'][i] = str(df['writer'][i]).replace("[" , "")
            df['writer'][i] = str(df['writer'][i]).replace("]" , "")
            df['writer'][i] = str(df['writer'][i]).replace("'" , "")
            df['writer'][i] = str(df['writer'][i]).replace('"' , "")
            df['writer'][i] = str(df['writer'][i]).rstrip()
            df['writer'][i] = str(df['writer'][i]).lstrip()
            df['writer'][i] = re.sub("[\(\[].*?[\)\]]", "",  str(df['writer'][i]))
            df['writer'][i] = str(df['writer'][i]).replace(" " , "")
            df['writer'][i] = str(df['writer'][i]).replace("," , " ")
            
            df['actors'][i]  = ",".join(df['actors'][i] )
            df['actors'][i] = df['actors'][i].rstrip()
            df['actors'][i] = df['actors'][i].lstrip()
            df['actors'][i] = re.sub("[\(\[].*?[\)\]]", "",  df['actors'][i])
            df['actors'][i] = df['actors'][i].replace(" " , "")
            df['actors'][i] = df['actors'][i].replace("," , " ")
            
            df['description'][i]  = ",".join(df['description'][i] )
            df['description'][i] = df['description'][i].rstrip()
            df['description'][i] = df['description'][i].lstrip()
            df['description'][i] = re.sub("[\(\[]*?[\)\]]", "",  df['description'][i])
            df['description'][i] = df['description'][i].replace(" " , "")
            df['description'][i] = df['description'][i].replace("," , " ")
            if status=="Add":
                movieDataFromCSV =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv', low_memory=False)
                movieData=movieDataFromCSV.append(df)
                movieData.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv',index=False) 

            if status=="Edit":
                movieDataFromCSV =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv', low_memory=False)
                movieDataFromCSV=movieDataFromCSV.drop(movieDataFromCSV.index[movieDataFromCSV['movie_id']==movieID])
                movieData=movieDataFromCSV.append(df)
                movieData.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv',index=False) 
    if status=="Delete":
        movieDataFromCSV =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv', low_memory=False)
        movieDataFromCSV=movieDataFromCSV.drop(movieDataFromCSV.index[movieDataFromCSV['movie_id']==movieID])
        movieDataFromCSV.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv',index=False) 

    return jsonify("Done")

    



@app.route('/contentBased', methods=['POST'])
def third():
    import pandas as pd
    import sys
    import json

    # Load Movies Metadata
    df2 = pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP1\\server\\movieData.csv', low_memory=False)



    def create_soup(x):
        return ''.join(x['genre']) + ' ' +x['language']   + ' ' + x['director'] + ' ' +  x['writer'] +  ' ' +  x['actors'] + ' ' +  x['description']     

        
        
        
    df2['soup'] = df2.apply(create_soup, axis=1)


    # Import CountVectorizer and create the count matrix
    from sklearn.feature_extraction.text import CountVectorizer

    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(df2['soup'])


    # Compute the Cosine Similarity matrix based on the count_matrix
    from sklearn.metrics.pairwise import cosine_similarity

    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)



    # Reset index of our main DataFrame and construct reverse mapping as before
    df2 = df2.reset_index()
    indices = pd.Series(df2.index, index=df2['title'])


    # Function that takes in movie title as input and outputs most similar movies
    def get_recommendations(title, cosine_sim2=cosine_sim2):
        # Get the index of the movie that matches the title
        idx = indices[title]

        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim2[idx]))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[0:11]
        
        #print ("similarity scores", sim_scores)


        # Get the movie indices
        movie_indices = [i[0] for i in sim_scores]

        # Return the top 10 most similar movies
        recommendedMovies= df2['movie_id'].iloc[movie_indices] 
        recommendedMovies= recommendedMovies.tolist()
        return recommendedMovies

    
    # Get the data from the POST request.
    data = request.get_json(force=True)
    recommendedMovies=get_recommendations(data["movieTitle"], cosine_sim2)
    #return jsonify(recommendedMovies)


    conn = psycopg2.connect(
        host="localhost",
        database="filmey",
        user="postgres",
        password="pgAdmin123")

    # Create a cursor to perform database operations
    cursor = conn.cursor()

    movies = []
    for i in recommendedMovies:
        cursor.execute('SELECT movie_id  ,poster FROM "Movie" WHERE movie_id = %s' ,[i] )
        movies.append(cursor.fetchall()[0])
    return jsonify(movies)









        








if __name__ == "__main__":
    app.run(port=5000, debug=True)
    # index()
    # sec()





