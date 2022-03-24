from ast import Str
from lib2to3.pgen2.pgen import DFAState
from unittest import result
import numpy as np
from flask import Flask, request, jsonify
import pickle
from operator import itemgetter
import psycopg2
import pandas as pd
import pandas.io.sql as sqlio
from sklearn.metrics import consensus_score
from surprise import Dataset, Reader




from flask_cors import CORS, cross_origin
from sqlalchemy import false
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/checkThreshold', methods=['POST'])
def checkThreshold():

    # Get the data from the POST request.
    data = request.get_json(force=True)

    #threshold=data['threshold']
    userID = data["userID"]


    conn = psycopg2.connect(host="localhost"        ,database="filmey",user="postgres",password="pgAdmin123")

    # Create a cursor to perform database operations
    cursor = conn.cursor()


    # Get number of user ratings
    cursor.execute('SELECT COUNT(*) FROM "Rating" WHERE user_id = %s' ,[userID] )
    numOfUserRatings = cursor.fetchall()[0][0]
     
    # Check if model has already been trained with this user 
    #Routes:
    #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\MLratings&DB.csv'
    #NoufD:'./api/model//MLratings&DB.csv'
    rating =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\MLratings&DB.csv', low_memory=False)
    rating = rating['user_id'].tolist()
    numberOrRatingsInModel=rating.count(str(userID))

    result = [False , False]
    if(numOfUserRatings > 20):
        result[0] = True

    if(numberOrRatingsInModel < 20):
        result[1] = True

    return jsonify(result)


# @app.route('/reTrainUserCB', methods=['POST'])
# def train():

    
#     # if(numberOrRatingsInModel<20):
#         conn = psycopg2.connect(host="localhost",database="filmey",user="postgres",password="pgAdmin123")

#         # Create a cursor to perform database operations
#         cursor = conn.cursor()

#         #Routes:
#         #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\ratings.csv'
#         #NoufD:'./api/model/ratings.csv'

#         rating =pd.read_csv('./api/model//ratings.csv', low_memory=False)


#         ratingDB = sqlio.read_sql_query('SELECT *  FROM "Rating"', conn)

#         rating=ratingDB.append(rating)
#         #Routes:
#         #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\MLratings&DB.csv'
#         #NoufD:'./api/model//MLratings&DB.csv'

#         rating.to_csv('./api/model//MLratings&DB.csv', index=False)


#         reader = Reader()

#         # get just top 1M rows for faster run time
#         data = Dataset.load_from_df(rating[['user_id','movie_id','rating']][:], reader)

#         from surprise import KNNWithMeans

#         # To use item-based cosine similarity
#         param_grid = {'k': 60,
#               'sim_options': {"name": "cosine",
#                               "min_support":  5,
#                               "user_based": True,
#                              }
#               }
#         param_grid = {"sim_options": param_grid}
#         algo = KNNWithMeans(sim_options=param_grid)

#         from surprise.model_selection import cross_validate
#         cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)


#         # from surprise.model_selection import  train_test_split

#         # trainset, testset = train_test_split(data, test_size=0.2)
#         # algo.fit(trainset)



 

#         # Its important to use binary mode 
#         #Routes:
#         #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\UserBasedKNN'
#         #NoufD:./api/model/UserBasedKNN
#         try:
#             knnPickle = open('./api/model/UserBasedKNN', 'wb') 
#             # source, destination 
#             pickle.dump(algo, knnPickle)
#             print("re trained the model")

#             return jsonify("re trained the model")

#         except:
#             return jsonify("Error")



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

    #Routes:
    #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\api\\model\\UserBasedKNN'
    #NoufD:./api/model/UserBasedKNN

    model = pickle.load(open('./api/model/UserBasedKNN','rb')) 

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
    filteredMovie = sqlio.read_sql_query('SELECT movie_id  FROM "Movie" WHERE movie_id NOT IN(SELECT movie_id FROM "Rating" WHERE user_id=%s AND is_deleted=false) AND movie_id NOT IN(SELECT movie_id FROM "Review" WHERE user_id=%s) AND is_deleted=false', conn, params=param)
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
        # cursor.execute('SELECT movie_id  ,poster FROM "Movie" WHERE movie_id = %s' ,[i[0]] )
        # movies.append(cursor.fetchall()[0])

        cursor.execute('SELECT movie_id ,poster , title FROM "Movie" WHERE movie_id = %s' ,[i[0]] )
        info = cursor.fetchall()[0]
        id = info[0]
        poster = info[1]
        title = info[2]

        cursor = conn.cursor()
        cursor.execute('SELECT ROUND(AVG(rating),1) AS total_rating FROM "Rating" WHERE movie_id = %s GROUP BY movie_id ' ,[i[0]] )
        rating = cursor.fetchall()
        if not rating:
            rating = 0
        else:
            rating = rating[0]
        movies.append([id , poster , title  , rating])
    return jsonify(movies)

    
















from datetime import date
import datetime

# Load Movies 


@app.route('/modelBased', methods=['POST'])
def modelBased():
# Function that takes in user fav genres and age  as input and outputs sautible movies
    conn = psycopg2.connect(
        host="localhost",
        database="filmey",
        user="postgres",
        password="pgAdmin123")

    # Create a cursor to perform database operations
    cursor = conn.cursor()


    #Routes:
    #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv'
    #NoufD:'movieData.csv'


    df = pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv', low_memory=False)
    data = request.get_json(force=True)
    userID = data["userID"]
    param1 = (str(userID))
    param2 = (str(userID),str(userID))


  
    # Get user Birth date
    userBirthDate = sqlio.read_sql_query('SELECT date_of_birth  FROM "User"  where user_id=%s',conn, params=[param1])
    userBirthDate = userBirthDate['date_of_birth'][0]


    # Get user favorite genres
    User_favorite_genres = []
    favorite_genres = sqlio.read_sql_query('SELECT genre  FROM "User_Genre" inner join "Genre" on "Genre".genre_id = "User_Genre".genre_id WHERE user_id= %s',conn , params= [param1])

    for row in favorite_genres.iterrows():
        User_favorite_genres.append(row[1]['genre'])


    def get_age(birthdate):
        today = date.today()
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
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

                if str(df['genre'][i])=='nan':
                    continue

                if (favGenres[a] in df['genre'][i]):
                    
                
                    if (len(sautibleAgeGuide) != 0):
                
                        for j in  range(len(sautibleAgeGuide)):
            
                            if (sautibleAgeGuide[j] == df['age_guide'][i]):
                                
                                sautibleMovies= sautibleMovies.append(df.iloc[i])    

                    else:
                    
                        sautibleMovies= sautibleMovies.append(df.iloc[i])


                    
        print('sautibleMovies')
        print(sautibleMovies)
        sautibleMovies.drop_duplicates(keep = "first", inplace = True)


        #Get filtered Movies 
        filteredMovie = sqlio.read_sql_query('SELECT movie_id  FROM "Movie" WHERE movie_id NOT IN(SELECT movie_id FROM "Rating" WHERE user_id=%s AND is_deleted=false) AND movie_id NOT IN(SELECT movie_id FROM "Review" WHERE user_id=%s) AND is_deleted=false', conn, params=param2)
        movieIdArray = filteredMovie['movie_id'].tolist()
        # print('sautibleMovies')
        # print(sautibleMovies)
        print('filteredMovie')
        print(filteredMovie)
        movieIdArray = pd.merge(sautibleMovies,filteredMovie ,on='movie_id')
        movieIdArray = movieIdArray['movie_id'].tolist()


        return movieIdArray

    knowldgeArray = get_recommendations(User_favorite_genres, userBirthDate)
    knowldgeArray = knowldgeArray[:20]



    #Get poters of recommended movies
    movies = []
    for i in knowldgeArray:
        cursor.execute('SELECT movie_id ,poster , title FROM "Movie" WHERE movie_id = %s' ,[i] )
        info = cursor.fetchall()[0]
        id = info[0]
        poster = info[1]
        title = info[2]

        cursor = conn.cursor()
        cursor.execute('SELECT ROUND(AVG(rating),1) AS total_rating FROM "Rating" WHERE movie_id = %s GROUP BY movie_id ' ,[i] )
        rating = cursor.fetchall()
        if not rating:
            rating = 0
        else:
            rating = rating[0][0]
        movies.append([id , poster , title  , rating])


    movies=sorted(movies, key = itemgetter(3) , reverse=True)
    movies = movies[:20]

    return jsonify(movies)
    # return jsonify(x)



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
    # status="SaudiCinema"

    print('##########################################################################')

    if status=="SaudiCinema":
        
        movieDB = pd.read_sql_query('SELECT *  FROM "Movie" where is_deleted=false',conn)
                

        genresDB = sqlio.read_sql_query('SELECT * from "Movie_Genre" inner join "Genre" ON "Movie_Genre".genre_id = "Genre".genre_id',conn)
        genresDB=genresDB[['movie_id','genre']]
        genresDB = genresDB.groupby('movie_id')['genre'].apply(list).reset_index(name="genre")

        languagesDB = sqlio.read_sql_query('SELECT * from "Movie_Language" inner join "Language" ON "Movie_Language".language_id = "Language".language_id',conn)
        languagesDB=languagesDB[['movie_id','language']]
        languagesDB = languagesDB.groupby('movie_id')['language'].apply(list).reset_index(name="language")

        directorsDB = sqlio.read_sql_query('SELECT * from "Movie_Director" inner join "Director" ON "Movie_Director".director_id = "Director".director_id',conn)
        directorsDB = directorsDB.groupby('movie_id')['director'].apply(list).reset_index(name="director")

        writersDB = sqlio.read_sql_query('SELECT * from "Movie_Writer" inner join "Writer" ON "Movie_Writer".writer_id = "Writer".writer_id',conn)
        writersDB = writersDB.groupby('movie_id')['writer'].apply(list).reset_index(name="writer")

        actorsDB = sqlio.read_sql_query('SELECT "Role".movie_id,"Role".actor_id,"Role".role,"Actor".actor,"Actor".actor_image_url from "Role" inner join "Actor" ON "Role".actor_id = "Actor".actor_id',conn)

        actorColumn=actorsDB[['actor','role','actor_image_url']].to_numpy().tolist()
        actorColumn=pd.Series(actorColumn)
        actorColumn = pd.DataFrame (actorColumn, columns = ['actors'])
        actorsDB["actors"]=actorColumn
        actorsDB=actorsDB[['movie_id','actors']]
        actorsDB = actorsDB.groupby('movie_id')['actors'].apply(list).reset_index(name="actors")

        from functools import reduce
        dfs = [movieDB,genresDB,languagesDB,directorsDB,writersDB,actorsDB]
        # movieData=movieDB.join(genresDB,on="movie_id", how='left')
        movieData = pd.merge(movieDB, genresDB,on=['movie_id'], how='left')
        movieData = pd.merge(movieData, languagesDB,on=['movie_id'], how='left')
        movieData = pd.merge(movieData, directorsDB,on=['movie_id'], how='left')
        movieData = pd.merge(movieData, writersDB,on=['movie_id'], how='left')
        movieData = pd.merge(movieData, actorsDB,on=['movie_id'], how='left')
        movieData
        # movieData = reduce(lambda left,right: pd.merge(left,right,on='movie_id'), dfs)
        df=movieData
        print(df)
        from rake_nltk import Rake

        from imdb import IMDb
        ia = IMDb()

        # initializing the new column
        df['keywords']=df['description']

        for i in range(len(df)):
            print('des',i)
            if df['description'][i]!="":
                try:
                    black_panther = ia.get_movie(df['imdbId'][i], info='keywords')
        #             print(df['imdbTitle'][i] , ":" , black_panther['keywords'])
        #             print()
                    df['description'][i]=black_panther['keywords']
                except KeyError:
                    print("error in imdb")
                    plot = df['description'][i]
                    r = Rake()
                    key=r.extract_keywords_from_text(plot)
                    key_words_dict_scores = r.get_word_degrees()
                    df['description'][i] = list(key_words_dict_scores.keys())

        #         df['description']=df['keywords']
        #         df.drop(['keywords'], axis='columns', inplace=True)

        for i in range(len(df)):
            print('act',i)

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
            print('df',i)


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


            # print(df)

                # df['is_deleted'][i] = False
                # print(df)

        print(df)
        df.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv',index=False) 
        return jsonify("Done")
    if status=="Add" or status=="Edit":
        
        movieDB = pd.read_sql_query('SELECT *  FROM "Movie"  where movie_id=%s where is_deleted=false',conn, params=[param])
        

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

            df['is_deleted'][i] = False

            if status=="Add":
                   #Routes:
                   #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv'
                   #NoufD:'movieData.csv'
                movieDataFromCSV =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv', low_memory=False)
                movieData=movieDataFromCSV.append(df)
                movieData.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv',index=False) 

            if status=="Edit":
                movieDataFromCSV =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv', low_memory=False)
                movieDataFromCSV=movieDataFromCSV.drop(movieDataFromCSV.index[movieDataFromCSV['movie_id']==movieID])
                movieData=movieDataFromCSV.append(df)
                movieData.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv',index=False) 
    if status=="Delete":
        movieDataFromCSV =pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv', low_memory=False)
        movieDataFromCSV=movieDataFromCSV.drop(movieDataFromCSV.index[movieDataFromCSV['movie_id']==movieID])
        movieDataFromCSV.to_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv',index=False) 

    return jsonify("Done")

    



@app.route('/contentBased', methods=['POST'])
def third():
    import pandas as pd
    import sys
    import json

    # Load Movies Metadata
    #Routes:
    #Ghadah:'C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv'
    #NoufD:'movieData.csv'
    df2 = pd.read_csv('C:\\Users\\pc\\Documents\\GitHub\\2021-GP1-22\\Filmey-GP2\\server\\movieData.csv', low_memory=False)



    def create_soup(x):
        if str(x['genre'])=="nan":
            x['genre']=''
            print(x['genre'])
        if str(x['language'])=="nan":
            x['language']=''
            print(x['language'])
        if  str(x['director'])=="nan":
            x['director']=''
            print(x['director'])
        if str(x['writer'])=="nan":
            x['writer']=''
            print(x['writer'])
        if str(x['actors'])=="nan":
            x['actors']=''
            print(x['actors'])
        if str(x['description'])=="nan":
            x['description']=''
            print(x['description'])
        return ''.join(str(x['genre'])) + ' ' +str(x['language'])   + ' ' + str(x['director']) + ' ' +  str(x['writer']) +  ' ' +  str(x['actors']) + ' ' +  str(x['description'])    


    conn = psycopg2.connect(
    host="localhost",
    database="filmey",
    user="postgres",
    password="pgAdmin123")

    cursor = conn.cursor()

    data = request.get_json(force=True)

    movieID =  data['movieID']

    cursor.execute('SELECT title  FROM "Movie" WHERE movie_id = %s' ,[movieID] )

    movieTitle = cursor.fetchall()[0][0]

    #remove movie with the same title
    df3=df2
    duplicatesID=df3[(df3['movie_id']!=movieID) & (df3['title']==movieTitle)]['movie_id']
    try:
        for x in duplicatesID:
            duplicatesID=x
        df2=df2.loc[df2['movie_id']!=duplicatesID]
        df2=df2.reset_index(drop=True)
        print(df2)  
    except:
        print('')  
        
        
    df2['soup'] = df2.apply(create_soup, axis=1)


    # Import CountVectorizer and create the count matrix
    from sklearn.feature_extraction.text import CountVectorizer

    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(df2['soup'])


    # Compute the Cosine Similarity matrix based on the count_matrix
    from sklearn.metrics.pairwise import cosine_similarity

    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)



    # Reset index of our main DataFrame and construct reverse mapping as before
    df2 = df2.reset_index(drop=True)

  
  

    
    indices = pd.Series(df2.index, index=df2['movie_id'])


    # Function that takes in movie title as input and outputs most similar movies
    def get_recommendations(movie_id, cosine_sim2=cosine_sim2):
        # Get the index of the movie that matches the title
        idx = indices[movie_id]

        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim2[idx]))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[1:21]
        
        #print ("similarity scores", sim_scores)


        # Get the movie indices
        movie_indices = [i[0] for i in sim_scores]

        # Return the top 10 most similar movies
        recommendedMovies= df2['movie_id'].iloc[movie_indices] 
        # recommendedMovies= df2[df2['movie_id'].isin(movie_indices)]['movie_id']
        recommendedMovies= recommendedMovies.tolist()
        print(recommendedMovies)
        return recommendedMovies


    recommendedMovies=get_recommendations(movieID, cosine_sim2)
    #return jsonify(recommendedMovies)




    movies = []
    for i in recommendedMovies:
        print(i)
        cursor.execute('SELECT movie_id ,poster , title FROM "Movie" WHERE movie_id = %s' ,[i] )
        # print(cursor.fetchall())
        # movies.append(cursor.fetchall()[0])
        info = cursor.fetchall()[0]
        print(info)
        id = info[0]
        poster = info[1]
        title = info[2]

        cursor = conn.cursor()
        cursor.execute('SELECT ROUND(AVG(rating),1) AS total_rating FROM "Rating" WHERE movie_id = %s GROUP BY movie_id ' ,[i] )
        rating = cursor.fetchall()
        if not rating:
            rating = 0
        else:
            rating = rating[0]
        movies.append([id , poster , title  , rating])



    return jsonify(movies)









        








if __name__ == "__main__":
    app.run(port=5000, debug=True)
    # index()
    # sec()





