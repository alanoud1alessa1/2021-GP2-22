#!/usr/bin/env python
# coding: utf-8

# In[1]:


#****************************************************Start Scarping************************************************
#import libraries
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import requests
import csv
import re
import http.client
import time
import pprint
import json
import matplotlib.pyplot as plt
import seaborn as sns
from googlesearch import search


# # What's On

# # 1-vox

# In[2]:


voxWhatsOnTitleArray=[]
voxWhatsOnImgArray=[]
voxWhatsOnAgeGuideArray=[]
voxWhatsOnLanguageArray=[]
voxWhatsOnLinkArray=[]

#Request URL
voxWhatsOnResponse = requests.get("https://ksa.voxcinemas.com/movies/whatson")
voxWhatsOnSoup = BeautifulSoup(voxWhatsOnResponse.text, 'html.parser')

# All titles
voxWhatsOnTitle=voxWhatsOnSoup.find_all('h3')

#Section of movie Info
voxWhatsOnInfo=voxWhatsOnSoup.find('section',{'class':'now-showing'}).find_all('article')

#Get titles of whatson movies
for title in voxWhatsOnTitle:
    voxWhatsOnTitleArray.append(title.contents[0].text)
    
#Get poster,ageGuide,Langauge,links
for info in voxWhatsOnInfo:
    voxWhatsOnImgArray.append(info.find('img')['data-src'])
    voxWhatsOnAgeGuideArray.append(info.find('p').text)
    voxWhatsOnLanguageArray.append(info.find('p',{'class':'language'}).text.split(": ")[1])
    voxWhatsOnLinkArray.append('https://ksa.voxcinemas.com'+info.find('a')['href'])


# In[3]:


import math
voxWhatsOnTrailerArray=[]
voxWhatsOnDescriptionArray=[]
voxWhatsOnGenreArray=[]
voxWhatsOnYearArray=[]
voxWhatsOnDurationArray=[]
voxWhatsOnActorArray=[]
voxWhatsOnLocationArray=[]
voxWhatOnLanguageArray=[]

#Loop though each movie through link
for link in voxWhatsOnLinkArray:
    
    moviePageResponse = requests.get(link)
    movie = BeautifulSoup(moviePageResponse.text, 'html.parser')
    
    #Trailer
    try:
        voxWhatsOnTrailerArray.append(movie.find('div',{'class':'trailer'}).find('iframe')['src'])
    except:
        voxWhatsOnTrailerArray.append('')
    
    #Description
    try:
        voxWhatsOnDescriptionArray.append(movie.find_all('section')[5].find('article').find('p').text)
    except:
        voxWhatsOnDescriptionArray.append('')
    
    #Genre
    try:
        voxWhatsOnGenreArray.append([movie.find('aside').find_all('p')[0].text.rsplit(': ', 1)[1]])
    except:
        voxWhatsOnGenreArray.append([])
    
    #If Movie Duration is provided
    try:
        
        #Duration
        if movie.find('aside').find_all('p')[1].text.rsplit(': ', 1)[0]=='Running Time':
            duration=movie.find('aside').find_all('p')[1].text.rsplit(': ', 1)[1].split(' min')[0].strip()
            duration = int(duration)/60
            duration=math.modf(duration) 
            hours=int(duration[1])
            minutes=round(duration[0]*60)
            if minutes==0:
                duration=str(hours)+"h"
                voxWhatsOnDurationArray.append(duration)
            else:
                duration=str(hours)+"h "+str(minutes)+"min"
                voxWhatsOnDurationArray.append(duration)
            
            #Year   
            try:
                if movie.find('aside').find_all('p')[2].text.rsplit(': ', 1)[0]=='Release Date':
                    voxWhatsOnYearArray.append(movie.find('aside').find_all('p')[2].text.rsplit(': ', 1)[1][-4:])
                else:
                    voxWhatsOnYearArray.append('')
            except:
                    voxWhatsOnYearArray.append('')

            #Actor
            try:
                if movie.find('aside').find_all('p')[3].text.rsplit(': ', 1)[0]=='Starring':
                    #Actor
                    actorNames=[]
                    for actor in movie.find('aside').find_all('p')[3].text.rsplit(': ', 1)[1].split(", "):
                        actorNames.append([actor,'',''])
                    voxWhatsOnActorArray.append(actorNames)
                else:
                    voxWhatsOnActorArray.append(['','',''])
            except:
                voxWhatsOnActorArray.append('')

            #Language
            try:
                if movie.find('aside').find_all('p')[4].text.rsplit(': ', 1)[0]=='Language':
                    voxWhatOnLanguageArray.append(movie.find('aside').find_all('p')[4].text.rsplit(': ', 1)[1])       
                else:
                     voxWhatOnLanguageArray.append('')
            except:
                voxWhatOnLanguageArray.append('')
                
        else:
            voxWhatsOnDurationArray.append('')  
            #Year 
            try:
                if movie.find('aside').find_all('p')[1].text.rsplit(': ', 1)[0]=='Release Date':
                    voxWhatsOnYearArray.append(movie.find('aside').find_all('p')[1].text.rsplit(': ', 1)[1][-4:])
                else:
                    voxWhatsOnYearArray.append('')
            except:
                voxWhatsOnYearArray.append('')

            #Actor
            try:
                if movie.find('aside').find_all('p')[3].text.rsplit(': ', 1)[0]=='Starring':
                    actorNames=[]
                    for actor in movie.find('aside').find_all('p')[3].text.rsplit(': ', 1)[1].split(", "):
                        actorNames.append([actor,'',''])
                    voxWhatsOnActorArray.append(actorNames)
                else:
                    voxWhatsOnActorArray.append(['','',''])
                
            except:
                voxWhatsOnActorArray.append('')

            #Language
            try:
                if movie.find('aside').find_all('p')[3].text.rsplit(': ', 1)[0]=='Language':
                    voxWhatOnLanguageArray.append(movie.find('aside').find_all('p')[3].text.rsplit(': ', 1)[1])
                else:
                     voxWhatOnLanguageArray.append('')
                    
            except:
                voxWhatOnLanguageArray.append('')
         
    except:
        print('exception')
        
    #Movie Locations
    movieLocation=[]
    allMovieLocation=movie.find('div',{'class':'dates'}).find_all('h3')
    for location in allMovieLocation:
        index=link.rfind('/')
        movieNameInUrl=link[index:]
        fullLocation=location.text.lower().replace('- ', '').replace(' ', '-')
        locationName=fullLocation.rsplit('-', 1)[0]
        city=fullLocation.rsplit('-', 1)[1]
        locationURL='https://ksa.voxcinemas.com/showtimes?c='+locationName+"-"+city+'&m='+(movieNameInUrl.replace('/',''))
        print(locationURL)
        movieLocation.append([locationName,city,locationURL])
    voxWhatsOnLocationArray.append(movieLocation)


# In[4]:


import http.client

#API link:https://rapidapi.com/apidojo/api/imdb8/
import http.client

conn = http.client.HTTPSConnection("imdb8.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "imdb8.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }

voxWhatsOnMovieIdsArray=[]
index=0
for title in voxWhatsOnTitleArray:
    print(title)
    print(index)
        
        
    APItitle=title.replace(' ','%20')
    print(APItitle)
    conn.request("GET", "/title/find?q="+APItitle, headers=headers)
    res = conn.getresponse()
    data = res.read()
    jsonResponse=json.loads(data.decode("utf-8"))
    index=index+1
    try:
        imdbID=jsonResponse['results'][0]['id'].split('/title/')[1].replace('/','')
        if voxWhatsOnYearArray[index]==str(jsonResponse['results'][0]['year']):
            voxWhatsOnMovieIdsArray.append(imdbID)
        else:
            voxWhatsOnMovieIdsArray.append('')
        
    except:
        voxWhatsOnMovieIdsArray.append('')



# In[64]:


voxWhatsOnDf = pd.DataFrame(columns=['cinema','imdbID','title','year','genres', 'movieLength',
              'ageGuide','plot', 'language','actors','director','writer','poster', 'trailer','location&bookingLink'])
voxWhatsOnDf


# In[65]:


index=0
for imdbID in voxWhatsOnMovieIdsArray:
    print(index)
    if imdbID=='':
        Movierow = {'cinema':'vox','imdbID':imdbID,'title':voxWhatsOnTitleArray[index],'year':voxWhatsOnYearArray[index],
                    'genres':voxWhatsOnGenreArray[index], 
                'movieLength':voxWhatsOnDurationArray[index],
                'ageGuide':voxWhatsOnAgeGuideArray[index],'plot':voxWhatsOnDescriptionArray[index], 
                    'language':voxWhatsOnLanguageArray[index],'actors':voxWhatsOnActorArray[index],'director':[],
                'writer':[],'poster':voxWhatsOnImgArray[index],'trailer':voxWhatsOnTrailerArray[index]
                   ,'location&bookingLink':voxWhatsOnLocationArray[index]}
        print(Movierow)
        voxWhatsOnDf = voxWhatsOnDf.append(Movierow, ignore_index = True)
        index=index+1
        continue

    response = requests.get("https://www.imdb.com/title/"+imdbID)
    soup = BeautifulSoup(response.text, 'html.parser')
    #1-Title
    title=voxWhatsOnTitleArray[index]
        
    #2-Year
    try:
        year=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[0].a.text
    except:
        year=voxWhatsOnYearArray[index]
        print('except:year')
        
    #3-Genres
    try:
        Genres=soup.find('li',{'data-testid':'storyline-genres'}).find('ul')
        GenresList=[]
        for Genre in Genres:
            GenresList.append(Genre.text)
    except:
        GenresList=voxWhatsOnGenreArray[index]
        print('except:GenresList')
        
    #4-Movie Length
    try:
        movieLength=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[2].text
        movieLength=movieLength.replace('m','min')
    except:
        movieLength=voxWhatsOnDurationArray[index]
        print('except:movieLength')
        
    #6-Age Guide
    try:
        ageGuide=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[1].a.text
    except:
        ageGuide=voxWhatsOnAgeGuideArray[index]
        print('except:ageGuide')
        
    #7-Plot
    try:
        plot=soup.find('div',{'class':'Storyline__StorylineWrapper-sc-1b58ttw-0 iywpty'}).find('div').find('div').find('div').text
        try:
            plot=plot.split(' —')[0]
        except:
            print('')
    except:
        plot=voxWhatsOnDescriptionArray[index]
        print('except:plot')
        
    #8-Language
    if voxWhatsOnLanguageArray[index]!='':
        languageList=[voxWhatsOnLanguageArray[index]]
    
    else:
        
        try:
            divForLanguage = soup.find_all('div', class_='styles__MetaDataContainer-sc-12uhu9s-0 cgqHBf')
            languageList=[]
            languages=soup.find_all('a',{'class':'ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'})
            for language in languages:
                if language.has_attr('href'):
                    href=language['href']
                    if "primary_language" in language['href']:
                        languageList.append(language.text)
        except:
            languageList=[]
            print('except:languageList')
        
    #9-Actors
    try:
        cast=soup.find('div',{'class':'ipc-sub-grid ipc-sub-grid--page-span-2 ipc-sub-grid--wraps-at-above-l ipc-shoveler__grid'})
        counter=1
        castList=[]
        actorInfo=[]
        for actor in cast:
            actorInfo=[]
            actorName=actor.a['aria-label']
            actorInfo.append(actorName)
            actorCharacter=actor.span.text
            actorInfo.append(actorCharacter)
            actorPageLink=actor.a['href']
            response2 = requests.get("https://www.imdb.com"+actorPageLink)
            soup2 = BeautifulSoup(response2.text, 'html.parser')
            try:
                actorImage=soup2.find('img',{'id':'name-poster'})['src']
            except:
                actorImage=soup2.find('img',{'class':'no-pic-image'})['src']   
            actorInfo.append(actorImage)
            castList.append(actorInfo)
            counter=counter+1
            if counter==6:
                break
    except:
        castList=voxWhatsOnActorArray[index]
        print('except:castList')
    #10-Directors
    try:
        directors=soup.find('section',{'data-testid':'title-cast'}).find('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})
        directorsList=[]
        for director in directors:
            directorsList.append(director.text)
    except:
        directorsList=[]
        print('except:directorsList')
    #11-Writers
    try:
        writers=soup.find('section',{'data-testid':'title-cast'}).find_all('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})[1]
        writersList=[]
        for writer in writers:
            writersList.append(writer.text)
    except:
        writersList=[]
        print('except:writersList')
        
    #12- Poster
    try:
        posterLink=soup.find('div',{'class':'ipc-poster ipc-poster--baseAlt ipc-poster--dynamic-width Poster__CelPoster-sc-6zpm25-0 kPdBKI celwidget ipc-sub-grid-item ipc-sub-grid-item--span-2'}).a['href']
        response3 = requests.get("https://www.imdb.com"+posterLink)
        soup3 = BeautifulSoup(response3.text, 'html.parser')
        poster=soup3.find('div',{'class':'MediaViewerImagestyles__PortraitContainer-sc-1qk433p-2 iUyzNI'}).img['src']
    except:
        poster=voxWhatsOnImgArray[index]
        print('except:poster')
        
    #12- Trailer
    trailer=voxWhatsOnTrailerArray[index]
    
    #Location
    location=voxWhatsOnLocationArray[index]
    Movierow = {'cinema':'vox','imdbID':voxWhatsOnMovieIdsArray[index],'title':title,'year':year,'genres':GenresList, 
                'movieLength':movieLength,
                'ageGuide':ageGuide,'plot':plot, 'language':languageList,'actors':castList,'director':directorsList,
                'writer':writersList,'poster':poster,'trailer':trailer,'location&bookingLink':location}
    print(Movierow)
    voxWhatsOnDf = voxWhatsOnDf.append(Movierow, ignore_index = True)
    index=index+1


# In[66]:


voxWhatsOnDf


# # 2- amc

# In[14]:


from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


# In[15]:


driver = webdriver.Chrome(ChromeDriverManager().install())


# In[16]:


#Call amc what's on movie page
amcWhatsOnResponse = driver.get("https://www.amccinemas.com/movies")
amcWhatsOnContent = driver.page_source
amcWhatsOnSoup = BeautifulSoup(amcWhatsOnContent)


# In[17]:


amcWhatsOnTitleArray=[]
amcWhatsOnImgArray=[]
amcWhatsOnAgeGuideArray=[]
amcWhatsOnLanguageArray=[]
amcWhatsOnImgArray=[]
amcWhatsOnLinkArray=[]
amcWhatsOn=amcWhatsOnSoup.select('#cinemasList1234 > section')[0].find('ul').find_all('li')
for movie in amcWhatsOn:
    
    #Title
    amcTitle=movie.find('p',{'class':'movie-ttl'}).text
    amcWhatsOnTitleArray.append(amcTitle)
    
    #Langauge
    amcLanguage=movie.find('p',{'class':'tym'}).text.rsplit('| ', 1)[0]
    amcWhatsOnLanguageArray.append(amcLanguage)
    
    #Age Guide
    amcAgeGuide=movie.find('p',{'class':'tym'}).text.rsplit('| ', 1)[1]
    amcWhatsOnAgeGuideArray.append(amcAgeGuide)
    
    #Poster
    amcPoster=movie.find('img')['src']
    amcWhatsOnImgArray.append(amcPoster)
    
    #Movie Link
    amcWhatsOnLinkArray.append('https://www.amccinemas.com/movies/'+movie.find('section')['onclick'].rsplit('(', 1)[1].split(",")[0].replace('\'', ''))


# In[18]:


amcWhatsOnTrailerArray=[]
amcWhatsOnDescriptionArray=[]
amcWhatsOnGenreArray=[]
amcWhatsOnYearArray=[]
amcWhatsOnDurationArray=[]
amcWhatsOnActorArray=[]
amcWhatsOnLocationArray=[]
amcWhatsOnLanguageArray=[]

for link in amcWhatsOnLinkArray:
    
    #Request Movie Page
    moviePageResponse = requests.get(link)
    movie = BeautifulSoup(moviePageResponse.text, 'html.parser')
    
    #Genre
    try:
        amcWhatsOnGenreArray.append([movie.find('section',{'class':'amc-title-info'}).find_all('li')[-1].text])
    except:
        amcWhatsOnGenreArray.append([])
    
    #Duration
    try:
        duration=movie.find('li',{'class':'playtime'}).text
        hours=duration.split('h')[0].strip()
        minutes=duration.split('h')[1].split('m')[0].strip()[-2:]
        if hours[0]=="0":
            hours=hours[1:]
        if minutes=="00":
            minutes=""
            
        elif minutes[0]=="0":
            minutes=minutes[1:]
            duration=hours+"h "+minutes+"min"
        if minutes=="":
            duration=hours+"h"
        else:
            duration=hours+"h "+minutes+"min"
        amcWhatsOnDurationArray.append(duration)
    except:
        amcWhatsOnDurationArray.append('')

        
    #Actor
    try:
        if movie.find('p',{'class':'amc-cast'}).text.rsplit(': ', 1)[0]=="Cast & Crew":
            #Actors
            actorNames=[]
            for actor in movie.find('p',{'class':'amc-cast'}).text.rsplit(': ', 1)[1].split(", "):
                actorNames.append([actor,'',''])
            amcWhatsOnActorArray.append(actorNames)
        else:
            amcWhatsOnActorArray.append('')
            
    except:
        amcWhatsOnActorArray.append('')
    
    #Description
    try:
        if movie.find('p',{'class':'amc-synopsis'}).text.split(':', 1)[0]=="Synopsis":
            amcWhatsOnDescriptionArray.append(movie.find('p',{'class':'amc-synopsis'}).text.split(':', 1)[1])
        else:
            amcWhatsOnDescriptionArray.append('')
    except:
        amcWhatsOnDescriptionArray.append('')
    
    #Year
    try:
        if movie.find('aside',{'class':'movie-cont'}).find_all('p')[0].text.rsplit(': ', 1)[0]=='Release Date':
            amcWhatsOnYearArray.append(movie.find('aside',{'class':'movie-cont'}).find_all('p')[0].text.rsplit(': ', 1)[1][-4:])
        elif movie.find('aside',{'class':'movie-cont'}).find_all('p')[1].text.rsplit(': ', 1)[0]=='Release Date':
            amcWhatsOnYearArray.append(movie.find('aside',{'class':'movie-cont'}).find_all('p')[1].text.rsplit(': ', 1)[1][-4:])
        else:
            amcWhatsOnYearArray.append('')
            
    except:
        amcWhatsOnYearArray.append('')


# In[19]:


import re
amcWhatsOnLocationArray=[]
amcWhatsOnLanguageArray=[]
for link in amcWhatsOnLinkArray:
    print(link)
    amcLinkWithDriver = driver.get(link)
    amcMoviePageResponseDriver = driver.page_source
    amcMovieWithDriver = BeautifulSoup(amcMoviePageResponseDriver)    
    movieLocation=[]
    #Language   
    try:
        if len(amcMovieWithDriver.find('section',{'class':'amc-title-info'}).find_all('li'))==3:
            amcWhatsOnLanguageArray.append('')
        else:
            amcWhatsOnLanguageArray.append(amcMovieWithDriver.find('section',{'class':'amc-title-info'}).find_all('li')[2].text)
    except:
        amcWhatsOnLanguageArray.append('')
        
    Movielocation=""
    for location in amcMovieWithDriver.find_all('section',{'class':'panel-heading'}):
        for h2 in location.find_all('h2'):
            Movielocation=h2.text
            print(Movielocation)
            locationName=Movielocation.split(' - ')[0].strip()
            city=re.split(r'(^[^\d]+)', Movielocation.split(' - ')[1])[1:][0].strip()
            movieLocation.append([locationName,city,link])
    amcWhatsOnLocationArray.append(movieLocation)
    if Movielocation=="":
        locations=[]
        while locations==[]:
            locations=amcMovieWithDriver.select('#partialshowtime')[0].find_all('h2')
        print(locations)
        for location in amcMovieWithDriver.select('#partialshowtime')[0].find_all('h2'):
            Movielocation=location['data-moviename']
            print(Movielocation)
            locationName=Movielocation.split(' - ')[0].strip()
            city=re.split(r'(^[^\d]+)', Movielocation.split(' - ')[1])[1:][0].strip()
            movieLocation.append([locationName,city,link])

        amcWhatsOnLocationArray.append(movieLocation)


# In[20]:


amcWhatsOnLocationArray


# In[21]:


#API link:https://rapidapi.com/apidojo/api/imdb8/
import http.client

conn = http.client.HTTPSConnection("imdb8.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "imdb8.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }

amcWhatsOnMovieIdsArray=[]
index=0
for title in amcWhatsOnTitleArray:
    #If the movie is arabic don't get imdb id
    try:
        if amcWhatsOnLanguageArray[index]=="Arabic":
            #to search
            MovieName=amcWhatsOnTitleArray[index]
            query = MovieName+"Arabic Movie"
            movieId=''
            for results in search(query, tld="co.in", num=10, stop=10, pause=2):
                if "https://www.imdb.com/title/" in str(results):
                    movieId=results.split('/title/')[1].replace('/','')
            amcWhatsOnMovieIdsArray.append(movieId)
            index=index+1
            continue
    except:
        amcWhatsOnMovieIdsArray.append('')

    APItitle=title.replace(' ','%20')
    print(APItitle)
    conn.request("GET", "/title/find?q="+APItitle, headers=headers)
    res = conn.getresponse()
    data = res.read()
    jsonResponse=json.loads(data.decode("utf-8"))
    index=index+1
    try:
        imdbID=jsonResponse['results'][0]['id'].split('/title/')[1].replace('/','')
        print(imdbID)
        if amcWhatsOnYearArray[index]==str(jsonResponse['results'][0]['year']):
            amcWhatsOnMovieIdsArray.append(imdbID)
        else:
            amcWhatsOnMovieIdsArray.append('')
        
    except:
        amcWhatsOnMovieIdsArray.append('')


# In[22]:


amcWhatsOnDf = pd.DataFrame(columns=['cinema','imdbID','title','year','genres', 'movieLength',
              'ageGuide','plot', 'language','actors','director','writer','poster', 'trailer','location&bookingLink'])
amcWhatsOnDf


# In[23]:


index=0
for imdbID in amcWhatsOnMovieIdsArray:
    print(index)
    if imdbID=='':
        Movierow = {'cinema':'amc','imdbID':imdbID,'title':amcWhatsOnTitleArray[index].strip(),'year':amcWhatsOnYearArray[index],
                    'genres':amcWhatsOnGenreArray[index], 
                'movieLength':amcWhatsOnDurationArray[index],
                'ageGuide':amcWhatsOnAgeGuideArray[index],'plot':amcWhatsOnDescriptionArray[index],
                    'language':amcWhatsOnLanguageArray[index],'actors':amcWhatsOnActorArray[index],'director':[],
                'writer':[],'poster':amcWhatsOnImgArray[index],'trailer':''
                   ,'location&bookingLink':amcWhatsOnLocationArray[index]}
        print(Movierow)
        amcWhatsOnDf = amcWhatsOnDf.append(Movierow, ignore_index = True)
        index=index+1
        continue
        
        
    response = requests.get("https://www.imdb.com/title/"+imdbID)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    title= amcWhatsOnTitleArray[index].strip()
        
    #2-Year
    try:
        year=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[0].a.text
    except:
        year=amcWhatsOnYearArray[index]
        print('except:year')
        
    #3-Genres
    try:
        Genres=soup.find('li',{'data-testid':'storyline-genres'}).find('ul')
        GenresList=[]
        for Genre in Genres:
            GenresList.append(Genre.text)
    except:
        GenresList=amcWhatsOnGenreArray[index]
        print('except:GenresList')
        
    #4-Movie Length
    try:
        movieLength=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[2].text
        movieLength=movieLength.replace('m','min')
    except:
        movieLength=amcWhatsOnDurationArray[index]
        print('except:movieLength')
        
    #6-Age Guide
    try:
        ageGuide=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[1].a.text
    except:
        ageGuide=amcWhatsOnAgeGuideArray[index]
        print('except:ageGuide')
        
    #7-Plot
    try:
        plot=soup.find('div',{'class':'Storyline__StorylineWrapper-sc-1b58ttw-0 iywpty'}).find('div').find('div').find('div').text
        try:
            plot=plot.split(' —')[0]
        except:
            print('')
    except:
        plot=amcWhatsOnDescriptionArray[index]
        print('except:plot')
        
    
    #8-Language
    if amcWhatsOnLanguageArray[index]!='':
        languageList=[amcWhatsOnLanguageArray[index]]
    
    else:
        
        try:
            divForLanguage = soup.find_all('div', class_='styles__MetaDataContainer-sc-12uhu9s-0 cgqHBf')
            languageList=[]
            languages=soup.find_all('a',{'class':'ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'})
            for language in languages:
                if language.has_attr('href'):
                    href=language['href']
                    if "primary_language" in language['href']:
                        languageList.append(language.text)
        except:
            languageList=[]
            print('except:languageList')
        
    #9-Actors
    try:
        cast=soup.find('div',{'class':'ipc-sub-grid ipc-sub-grid--page-span-2 ipc-sub-grid--wraps-at-above-l ipc-shoveler__grid'})
        counter=1
        castList=[]
        actorInfo=[]
        for actor in cast:
            actorInfo=[]
            actorName=actor.a['aria-label']
            actorInfo.append(actorName)
            actorCharacter=actor.span.text
            actorInfo.append(actorCharacter)
            actorPageLink=actor.a['href']
            response2 = requests.get("https://www.imdb.com"+actorPageLink)
            soup2 = BeautifulSoup(response2.text, 'html.parser')
            try:
                actorImage=soup2.find('img',{'id':'name-poster'})['src']
            except:
                actorImage=soup2.find('img',{'class':'no-pic-image'})['src']   
            actorInfo.append(actorImage)
            castList.append(actorInfo)
            counter=counter+1
            if counter==6:
                break
    except:
        castList=amcWhatsOnActorArray[index]
        print('except:castList')
    #10-Directors
    try:
        directors=soup.find('section',{'data-testid':'title-cast'}).find('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})
        directorsList=[]
        for director in directors:
            directorsList.append(director.text)
    except:
        directorsList=[]
        print('except:directorsList')
    #11-Writers
    try:
        writers=soup.find('section',{'data-testid':'title-cast'}).find_all('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})[1]
        writersList=[]
        for writer in writers:
            writersList.append(writer.text)
    except:
        writersList=[]
        print('except:writersList')
        
    #12- Poster
    try:
        posterLink=soup.find('div',{'class':'ipc-poster ipc-poster--baseAlt ipc-poster--dynamic-width Poster__CelPoster-sc-6zpm25-0 kPdBKI celwidget ipc-sub-grid-item ipc-sub-grid-item--span-2'}).a['href']
        response3 = requests.get("https://www.imdb.com"+posterLink)
        soup3 = BeautifulSoup(response3.text, 'html.parser')
        poster=soup3.find('div',{'class':'MediaViewerImagestyles__PortraitContainer-sc-1qk433p-2 iUyzNI'}).img['src']
    except:
        poster=amcWhatsOnImgArray[index]
        print('except:poster')
        
    #13- Trailer
    
    #14-Location
    location=amcWhatsOnLocationArray[index]
    Movierow = {'cinema':'amc','imdbID':amcWhatsOnMovieIdsArray[index],'title':title,'year':year,'genres':GenresList, 
                'movieLength':movieLength,
                'ageGuide':ageGuide,'plot':plot, 'language':languageList,'actors':castList,'director':directorsList,
                'writer':writersList,'poster':poster,'trailer':'','location&bookingLink':location}
    print(Movierow)
    amcWhatsOnDf = amcWhatsOnDf.append(Movierow, ignore_index = True)
    index=index+1


# # 3- muvi

# In[24]:


muviDriver = webdriver.Chrome(ChromeDriverManager().install())
muviWhatsOnResponse = muviDriver.get("https://www.muvicinemas.com/en/movies?opt=nowshowing")


# In[25]:


# muviDriver.get("https://www.muvicinemas.com/en/movies")


# In[26]:


javaScript = "document.getElementsByName('setlocation')[7].click();"
muviDriver.execute_script(javaScript)
javaScript2 = "document.getElementsByName('setlang')[0].click();"
muviDriver.execute_script(javaScript2)
javaScript3 = "document.getElementsByClassName('mv-btn muvi-lang')[0].click();"
muviDriver.execute_script(javaScript3)


# In[27]:


muviWhatsOnResponse = muviDriver.get("https://www.muvicinemas.com/en/movies?opt=nowshowing")


# In[28]:


muviWhatsOnPage = muviDriver.page_source
muviWhatsOnSoup = BeautifulSoup(muviWhatsOnPage)


# In[29]:


muviWhatsOnImgArray=[]
muviWhatsOnAgeGuideArray=[]
muviWhatsOnLinkArray=[]
muviWhatsOnGenreArray=[]
for movie in muviWhatsOnSoup.select('#nowshowing>ul')[0].find_all('li'):
    
    #Movie link
    muviWhatsOnLinkArray.append(movie.find('section',{'class':'mv-movie-cont'}).find('a')['movie_url'])
    
    #Movie Poster
    muviWhatsOnImgArray.append(movie.find('img')['src'])
    
    #Movie Age Guide
    muviWhatsOnAgeGuideArray.append(movie.find('section',{'class':'mv-gen-group'}).text)
    
    #Genre
    muviWhatsOnGenreArray.append(movie.find('span',{'class':'mv-txt0 hidden-xxs'}).text.split('/ '))


# In[30]:


muviWhatsOnTitleArray=[]
muviWhatsOnActorArray=[]
muviWhatsOnDirectorArray=[]
muviWhatsOnDescriptionArray=[]
muviWhatsOnLanguageArray=[]
muviWhatsOnDurationArray=[]
muviWhatsOnYearArray=[]
for link in muviWhatsOnLinkArray:
    
    #Request Movie Page
    muvieMoviePageResponse = requests.get(link)
    muviMovie = BeautifulSoup(muvieMoviePageResponse.text, 'html.parser')
    
    #Title
    muviWhatsOnTitleArray.append(muviMovie.find('h1').text.strip())

    #Actor
    try:
        actorList=[]
        if muviMovie.find('li',{'class':'mv-cast'}).find('p').text=="N/A":
            muviWhatsOnActorArray.append(['','',''])
        for actor in muviMovie.find('li',{'class':'mv-cast'}).find('p').text.split(", "):
            actorName=actor.replace("\xa0", "").strip()
            pattern = re.compile(r'\.$')
            actorName = pattern.sub(r'', actorName)
            actorList.append([actorName,'',''])
        muviWhatsOnActorArray.append(actorList)
    except:
        muviWhatsOnActorArray.append(['','',''])
    
    #Director
    directorList=[]
    if muviMovie.find('li',{'class':'mv-director'}).find('p').text=="N/A":
        muviWhatsOnDirectorArray.append('')
    else:
        for director in muviMovie.find('li',{'class':'mv-director'}).find('p').text.split(", "):
            directorName=director.replace("\xa0", "").strip()
            directorList.append(directorName)
        muviWhatsOnDirectorArray.append(directorList)
    
    #Description
    muviWhatsOnDescriptionArray.append(muviMovie.find('li',{'class':'mv-synopsis'}).find('p').text)
    
    #Language
    if muviMovie.find('li',{'class':'mv-language'}).find('p').text=="N/A":
        muviWhatsOnLanguageArray.append('')
    else:
        muviWhatsOnLanguageArray.append(muviMovie.find('li',{'class':'mv-language'}).find('p').text)
    
    #Duration
    if muviMovie.find('li',{'class':'mv-runtime'}).find('p').text=="N/A":
        muviWhatsOnDurationArray.append('')
    else:
        duration=muviMovie.find('li',{'class':'mv-runtime'}).find('p').text
        hours=duration.split('h')[0].strip()
        minutes=duration.split('h')[1].split('m')[0].strip()[-2:]
        if hours[0]=="0":
            hours=hours[1:]
        if minutes=="00":
            minutes=""
            
        elif minutes[0]=="0":
            minutes=minutes[1:]
            duration=hours+"h "+minutes+"min"
        if minutes=="":
            duration=hours+"h"
        else:
            duration=hours+"h "+minutes+"min"
        muviWhatsOnDurationArray.append(duration)
    
    #Year
    try:
        if muviMovie.find('li',{'class':'mv-releasedate'}).find('p').text=="N/A":
            muviWhatsOnYearArray.append('')
        else:
            muviWhatsOnYearArray.append(muviMovie.find('li',{'class':'mv-releasedate'}).find('p').text[-4:])
    except:
        muviWhatsOnYearArray.append('')


# In[35]:


muviDriver = webdriver.Chrome(ChromeDriverManager().install())


# In[36]:


muviDriver.get("https://www.muvicinemas.com/en/movies")


# In[37]:


javaScript = "document.getElementsByName('setlocation')[0].click();"
muviDriver.execute_script(javaScript)
javaScript2 = "document.getElementsByName('setlang')[0].click();"
muviDriver.execute_script(javaScript2)
javaScript3 = "document.getElementsByClassName('mv-btn muvi-lang')[0].click();"
muviDriver.execute_script(javaScript3)


# In[38]:


#Locations:
muviWhatsOnLocationArray=[]
for link in muviWhatsOnLinkArray:
    
    print(link)
    
    muviDriver.get(link)
    
    #Get page
    try:
        muviWhatsOnMovieContent = muviDriver.page_source
        muviWhatsOnMovieSoup = BeautifulSoup(muviWhatsOnMovieContent)

        #Get number of citites
        numOfCities=len(muviWhatsOnSoup.select('ul',{'class':'dropdown-menu inner selectpicker'})[0].find_all('li'))

        movieLocationArray=[]
        for x in range(numOfCities-1):
            print(x)

            #Click Drop Down List
            javaScript6 = "document.getElementsByClassName('btn dropdown-toggle selectpicker btn-default')[0].click();"
            muviDriver.execute_script(javaScript6)

            #Click City
            javaScript7 = "document.getElementsByClassName('dropdown-menu inner selectpicker')[0].getElementsByTagName('li')["+str(x)+"].getElementsByTagName('a')[0].click();"
            muviDriver.execute_script(javaScript7)

            city=muviWhatsOnSoup.select('ul',{'class':'dropdown-menu inner selectpicker'})[0].find_all('li')[x].text

            print(city)


            #Get page after changing location
            muviWhatsOnMovieContent = muviDriver.page_source
            muviWhatsOnMovieSoup = BeautifulSoup(muviWhatsOnMovieContent)
            
            dropDown = muviWhatsOnMovieSoup.select("#movie-detailspage-showtimes")
            for n in dropDown:
                for b in n.find_all('h2'):
                    print(b.text.strip().replace(b.span.text,"").strip())
                    movieLocationArray.append([b.text.strip().replace(b.span.text,"").strip(),city,link])
        muviWhatsOnLocationArray.append(movieLocationArray)
    except:
        muviWhatsOnLocationArray.append(['','',''])
        continue
    


# In[39]:


muviWhatsOnLocationArray2=[]
index=0
for x in muviWhatsOnLocationArray:
#     print([x])
    muviWhatsOnLocationArray2.append(x)


# In[40]:


#API link:https://rapidapi.com/apidojo/api/imdb8/
import http.client

conn = http.client.HTTPSConnection("imdb8.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "imdb8.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }


muviWhatsOnMovieIdsArray=[]
index=0
for title in muviWhatsOnTitleArray:
    
    #If the movie is arabic don't get imdb id
    if muviWhatsOnLanguageArray[index]=="Arabic":
        print(title)
        muviWhatsOnMovieIdsArray.append('')
        index=index+1
        continue
        
    
    
#     title=" ".join(title.split())
    APItitle=title.replace(' ','%20')
    print(APItitle)
    conn.request("GET", "/title/find?q="+APItitle, headers=headers)
    res = conn.getresponse()
    data = res.read()
    jsonResponse=json.loads(data.decode("utf-8"))
    index=index+1
    try:
        imdbID=jsonResponse['results'][0]['id'].split('/title/')[1].replace('/','')
        if muviWhatsOnYearArray[index]==str(jsonResponse['results'][0]['year']):
            muviWhatsOnMovieIdsArray.append(imdbID)
        else:
            import datetime
            currentDateTime = datetime.datetime.now()
            date = currentDateTime.date()
            year = date.strftime("%Y")
            if muviWhatsOnYearArray[index]==str(year):
                muviWhatsOnMovieIdsArray.append(imdbID)
            else:
                muviWhatsOnMovieIdsArray.append('')
        
    except:
        muviWhatsOnMovieIdsArray.append('')


# In[41]:


muviWhatsOnDf = pd.DataFrame(columns=['cinema','imdbID','title','year','genres', 'movieLength',
              'ageGuide','plot', 'language','actors','director','writer','poster', 'trailer','location&bookingLink'])
muviWhatsOnDf


# In[42]:


index=0
for imdbID in muviWhatsOnMovieIdsArray:
    print(index)
    if imdbID=='':
        Movierow = {'cinema':'muvi','imdbID':imdbID,'title':muviWhatsOnTitleArray[index],
                    'year':muviWhatsOnYearArray[index],
                    'genres':muviWhatsOnGenreArray[index], 
                'movieLength':muviWhatsOnDurationArray[index],
                'ageGuide':muviWhatsOnAgeGuideArray[index],'plot':muviWhatsOnDescriptionArray[index],
                    'language':muviWhatsOnLanguageArray[index],'actors':muviWhatsOnActorArray[index],
                    'director':muviWhatsOnDirectorArray[index],
                'writer':[],'poster':muviWhatsOnImgArray[index],'trailer':'',
                   'location&bookingLink':muviWhatsOnLocationArray2[index]}
        print(Movierow)
        muviWhatsOnDf = muviWhatsOnDf.append(Movierow, ignore_index = True)
        index=index+1
        continue
    response = requests.get("https://www.imdb.com/title/"+imdbID)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    #1-Title
    title=muviWhatsOnTitleArray[index]
    

        
    #2-Year
    try:
        year=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[0].a.text
    except:
        year=muviWhatsOnYearArray[index]
        print('except:year')
        
    #3-Genres
    try:
        Genres=soup.find('li',{'data-testid':'storyline-genres'}).find('ul')
        GenresList=[]
        for Genre in Genres:
            GenresList.append(Genre.text)
    except:
        GenresList=[muviWhatsOnGenreArray[index]]
        print('except:GenresList')
        
    #4-Movie Length
    try:
        movieLength=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[2].text
        movieLength=movieLength.replace('m','min')
    except:
        movieLength=muviWhatsOnDurationArray[index]
        print('except:movieLength')
        
    #6-Age Guide
    try:
        ageGuide=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[1].a.text
    except:
        ageGuide=muviWhatsOnAgeGuideArray[index]
        print('except:ageGuide')
        
    #7-Plot
    try:
        plot=soup.find('div',{'class':'Storyline__StorylineWrapper-sc-1b58ttw-0 iywpty'}).find('div').find('div').find('div').text
        try:
            plot=plot.split(' —')[0]
        except:
            print('')
    except:
        plot=muviWhatsOnDescriptionArray[index]
        print('except:plot')
        
    #8-Language
    
    if muviWhatsOnLanguageArray[index]!='':
        languageList=[muviWhatsOnLanguageArray[index]]
    
    else:
        try:
            divForLanguage = soup.find_all('div', class_='styles__MetaDataContainer-sc-12uhu9s-0 cgqHBf')
            languageList=[]
            languages=soup.find_all('a',{'class':'ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link'})
            for language in languages:
                if language.has_attr('href'):
                    href=language['href']
                    if "primary_language" in language['href']:
                        languageList.append(language.text)
        except:
            languageList=[]
            print('except:languageList')
        
    #9-Actors
    try:
        cast=soup.find('div',{'class':'ipc-sub-grid ipc-sub-grid--page-span-2 ipc-sub-grid--wraps-at-above-l ipc-shoveler__grid'})
        counter=1
        castList=[]
        actorInfo=[]
        for actor in cast:
            actorInfo=[]
            actorName=actor.a['aria-label']
            actorInfo.append(actorName)
            actorCharacter=actor.span.text
            actorInfo.append(actorCharacter)
            actorPageLink=actor.a['href']
            response2 = requests.get("https://www.imdb.com"+actorPageLink)
            soup2 = BeautifulSoup(response2.text, 'html.parser')
            try:
                actorImage=soup2.find('img',{'id':'name-poster'})['src']
            except:
                actorImage=soup2.find('img',{'class':'no-pic-image'})['src']   
            actorInfo.append(actorImage)
            castList.append(actorInfo)
            counter=counter+1
            if counter==6:
                break
    except:
        castList=muviWhatsOnActorArray[index]
        print('except:castList')
    #10-Directors
    try:
        directors=soup.find('section',{'data-testid':'title-cast'}).find('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})
        directorsList=[]
        for director in directors:
            directorsList.append(director.text)
    except:
        directorsList=[muviWhatsOnDirectorArray[index]]
        print('except:directorsList')
    #11-Writers
    try:
        writers=soup.find('section',{'data-testid':'title-cast'}).find_all('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})[1]
        writersList=[]
        for writer in writers:
            writersList.append(writer.text)
    except:
        writersList=[]
        print('except:writersList')
        
    #12- Poster
    try:
        posterLink=soup.find('div',{'class':'ipc-poster ipc-poster--baseAlt ipc-poster--dynamic-width Poster__CelPoster-sc-6zpm25-0 kPdBKI celwidget ipc-sub-grid-item ipc-sub-grid-item--span-2'}).a['href']
        response3 = requests.get("https://www.imdb.com"+posterLink)
        soup3 = BeautifulSoup(response3.text, 'html.parser')
        poster=soup3.find('div',{'class':'MediaViewerImagestyles__PortraitContainer-sc-1qk433p-2 iUyzNI'}).img['src']
    except:
        poster=muviWhatsOnImgArray[index]
        print('except:poster')
        

    Movierow = {'cinema':'muvi','imdbID':imdbID,'title':title,'year':year,'genres':GenresList, 
                'movieLength':movieLength,
                'ageGuide':ageGuide,'plot':plot, 'language':languageList,'actors':castList,'director':directorsList,
                'writer':writersList,'poster':poster,'trailer':trailer,'location&bookingLink':muviWhatsOnLocationArray2[index]}
    print(Movierow)
    muviWhatsOnDf = muviWhatsOnDf.append(Movierow, ignore_index = True)
    index=index+1


# In[43]:


muviWhatsOnDf


# # Rename titles

# In[248]:


#If there is two languages for the same movie
dupliactesTitle=list(voxWhatsOnDf[voxWhatsOnDf.duplicated(['title'])]['title'])
duplicatedDF=voxWhatsOnDf[voxWhatsOnDf.duplicated(subset='title',keep='first')]
for index,row in duplicatedDF.iterrows():
    if isinstance(row['language'], list):
        print(row['title']+" ("+row['language'][0]+")")
        duplicatedDF.loc[index,'title']=row['title']+" ("+row['language'][0]+")"
        
    else:
        print(row['title']+" ("+row['language']+")")
        duplicatedDF.loc[index,'title']=row['title']+" ("+row['language']+")"
       


# In[249]:


voxWhatsOnDf=voxWhatsOnDf.drop_duplicates(subset='title',keep='first')
voxWhatsOnDf


# In[250]:


voxWhatsOnDf=voxWhatsOnDf.append(duplicatedDF)
voxWhatsOnDf


# In[251]:


amcWhatsOnDf[amcWhatsOnDf.duplicated(['title'], keep=False)]


# In[252]:


amcWhatsOnDf


# In[253]:


muviWhatsOnDf[muviWhatsOnDf.duplicated(['title'], keep=False)]


# In[254]:


muviWhatsOnDf2=muviWhatsOnDf.copy()


# In[255]:


regex = '\(.*?\)'
for index,row in muviWhatsOnDf2.iterrows():
        muviWhatsOnDf2.loc[index,'title']=re.sub(regex,'',row['title']).lower().strip()


# In[256]:


#If there is two languages for the same movie
dupliactesTitle=list(muviWhatsOnDf2[muviWhatsOnDf2.duplicated(subset=['title'])]['title'])
duplicatedDF=muviWhatsOnDf2[muviWhatsOnDf2.duplicated(subset=['title'],keep=False)]

#Get duplicated indexes
listOfIndexes=duplicatedDF.index.tolist()

for index in listOfIndexes:
    print(index)
    #Replace dupliacted title with the title with language
    muviWhatsOnDf2.loc[index,'title']=muviWhatsOnDf.loc[index,'title']


# In[257]:


regex = '\(.*?\)'
for index,row in muviWhatsOnDf.iterrows():
        muviWhatsOnDf.loc[index,'title']=re.sub(regex,'',row['title']).strip()


# In[258]:


for index in listOfIndexes:
    print(index)
    #Replace dupliacted title with the title with language
    muviWhatsOnDf.loc[index,'title']=muviWhatsOnDf2.loc[index,'title']


# In[259]:


muviWhatsOnDf


# In[260]:


for index,row in muviWhatsOnDf.iterrows():
    if "(AR)" in row['title']:
        muviWhatsOnDf.loc[index,'title']=row['title'].replace("(AR)","(Arabic)")
    if "(EN)" in row['title']:
        muviWhatsOnDf.loc[index,'title']=row['title'].replace("(EN)","(English)")


# In[261]:


muviWhatsOnDf


# In[262]:


from difflib import SequenceMatcher


# In[291]:


#Combone all cinemas to one dataframe
AllDfs=voxWhatsOnDf.append(amcWhatsOnDf).append(muviWhatsOnDf)
AllDfs=AllDfs.drop_duplicates(subset=['title','cinema'])
AllDfs=AllDfs.reset_index()


# In[292]:


AllDfs


# In[293]:


#Name similar mvoies with the same name
for index, row in AllDfs.iterrows():
    for index2, row2 in AllDfs.iterrows():
        if ("(Arabic)" in row2['title'])| ("(Telugu)" in row2['title'])|("(Hindi)" in row2['title'])|("(Malayalam)" in row2['title']):
            if ("(Arabic)" in row['title'])| ("(Telugu)" in row['title'])|("(Hindi)" in row['title'])|("(Malayalam)" in row['title']):
                similarity=SequenceMatcher(None, row['title'].strip(),row2['title']).ratio()
                if (similarity>=0.55):
                    print("----------------------------")
                    print(row['title'],row['cinema'])
                    print(row2['title'],row2['cinema'])
                    AllDfs.loc[index2,'title']=row['title']
                    print("----------------------------")
                continue
        else:
            if ("(Arabic)" in row['title'])| ("(Telugu)" in row['title'])|("(Hindi)" in row['title'])|("(Malayalam)" in row['title']):
                continue
            else:
                title1=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row['title']).strip()
                title2=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row2['title']).strip()
                similarity=SequenceMatcher(None, title1.strip(),title2.strip()).ratio()
                if (similarity>=0.55) & (similarity!=1):
                    print("*****************")
                    print(row['title'])
                    print(row2['title'])
                    print("*****************")
                    AllDfs.loc[index2,'title']=row['title']


# In[294]:


AllDfs=AllDfs.drop_duplicates(subset=['title','cinema'])
AllDfs


# In[295]:


print (AllDfs.groupby('title')['cinema'].apply(' '.join).reset_index())


# In[296]:


#Group movies with the same title
cinemaDF = AllDfs.groupby("title").agg(list)
cinemaDF


# In[297]:


AllDfs=AllDfs.drop_duplicates(subset=['title'],keep="first")
AllDfs


# In[298]:


#Get trailer
import http.client

#API LINK: https://rapidapi.com/SAdrian/api/data-imdb1/
conn = http.client.HTTPSConnection("data-imdb1.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "data-imdb1.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }

#API LINK: https://english.api.rakuten.net/amrelrafie/api/movies-tvshows-data-imdb/endpoints
conn2 = http.client.HTTPSConnection("movies-tvshows-data-imdb.p.rapidapi.com")

headers2 = {
    'x-rapidapi-host': "movies-tvshows-data-imdb.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }


counter=0
for index, row in AllDfs.iterrows():
    if row['trailer']!='':
        IMDBId=str(row['imdbID'])
        conn.request("GET", "/movie/id/"+IMDBId+"/", headers=headers)
        res = conn.getresponse()
        data = res.read()
        jsonResponse=json.loads(data.decode("utf-8"))
        conn2.request("GET", "/?type=get-movie-details&imdb=tt"+IMDBId, headers=headers2)
        res2 = conn2.getresponse()
        data2 = res2.read()
        jsonResponse2=json.loads(data2.decode("utf-8"))
        trailer=''
        try:
            trailer=jsonResponse['trailer']
        except:
            print('')
        if trailer=='':
            try:
                trailerKey=jsonResponse2['youtube_trailer_key']
                if trailerKey!='':
                    trailer="https://www.youtube.com/embed/"+trailerKey
            except:
                print('except2')
        counter=counter+1
        print(trailer)
        print(counter)
        AllDfs.loc[index,['trialer']]=trailer
        
        


# # DB

# In[299]:


#Connect to DB
import pandas.io.sql as sqlio
import psycopg2
conn = psycopg2.connect(host="localhost",database="filmey",user="postgres",password="pgAdmin123")
cursor = conn.cursor()


# In[300]:


#get in cinema movies from db
inCinemaDB=sqlio.read_sql_query('SELECT movie_id,title FROM "Movie" WHERE is_in_cinema=true',conn)
inCinemaDB


# In[301]:


#Name similar mvoies with the same name
for index, row in inCinemaDB.iterrows():
    for index2, row2 in AllDfs.iterrows():
        if ("(Arabic)" in row2['title'])| ("(Telugu)" in row2['title'])|("(Hindi)" in row2['title'])|("(Malayalam)" in row2['title']):
            if ("(Arabic)" in row['title'])| ("(Telugu)" in row['title'])|("(Hindi)" in row['title'])|("(Malayalam)" in row['title']):
                similarity=SequenceMatcher(None, row['title'].strip(),row2['title']).ratio()
                if (similarity>=0.55):
                    print("----------------------------")
                    print(row['title'])
                    print(row2['title'])
                    AllDfs.loc[index2,'title']=row['title']
                    print("----------------------------")
                continue
        else:
            if ("(Arabic)" in row['title'])| ("(Telugu)" in row['title'])|("(Hindi)" in row['title'])|("(Malayalam)" in row['title']):
                continue
            else:
                title1=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row['title']).strip()
                title2=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row2['title']).strip()
                similarity=SequenceMatcher(None, title1.strip(),title2.strip()).ratio()
                if (similarity>=0.55) & (similarity!=1):
                    print("*****************")
                    print(row['title'])
                    print(row2['title'])
                    print("*****************")
                    AllDfs.loc[index2,'title']=row['title']


# In[302]:


#Movies that are noLongerInCinema
noLongerInCinema=inCinemaDB[~inCinemaDB.title.isin(AllDfs['title'])]
noLongerInCinema


# In[303]:


#Set movie no longer in cinema to is_in_cinema=false
for index,row in noLongerInCinema.iterrows():
    cursor.execute('UPDATE "Movie" SET is_in_cinema = false WHERE movie_id=%s' ,[int(row['movie_id'])] )
    conn.commit()


# In[304]:


#Delete for is_in_cinema
for index, row in noLongerInCinema.iterrows():
    cursor.execute('DELETE FROM "In_Cinema" WHERE movie_id=%s' ,[int(row['movie_id'])] )
    conn.commit()


# In[305]:


#Movies that are still in cinema
stillInCinema=AllDfs[AllDfs.title.isin(inCinemaDB['title'])]
stillInCinema


# In[306]:


#Movies that are still in cinema
stillInCinemaDB=inCinemaDB[inCinemaDB.title.isin(AllDfs['title'])]
stillInCinemaDB


# In[307]:


#Delete movies that are still in cinema to add later with new location
for index, row in stillInCinemaDB.iterrows():
    cursor.execute('DELETE FROM "Movie" WHERE movie_id=%s' ,[int(row['movie_id'])] )
    conn.commit()


# In[308]:


#Movies that do not exist in db
newInCinemaMovies=AllDfs[~AllDfs.title.isin(inCinemaDB['title'])]
newInCinemaMovies


# In[309]:


#Append the table to get all movies that are in cinema
allWhatsOnMoviesDf=newInCinemaMovies.append(stillInCinema)
allWhatsOnMoviesDf=allWhatsOnMoviesDf.drop_duplicates(subset='title')
allWhatsOnMoviesDf


# In[310]:


#Get movies from db
movieDB=sqlio.read_sql_query('SELECT movie_id FROM "Movie"',conn)
movie_id=list(movieDB['movie_id'])
newMovieID=max(movie_id)+1


# In[311]:


df = allWhatsOnMoviesDf.reset_index()
newMovieIDArray=[]
for index, row in df.iterrows():
    newMovieIDArray.append(newMovieID)
    newMovieID=newMovieID+1
df['movie_id']=newMovieIDArray


# In[315]:


cinemaDF=pd.merge(cinemaDF,df, on='title')[['cinema_x','location&bookingLink_x','movie_id']]
cinemaDF


# In[316]:


#Movie table
mdf = df[['index' , 'movie_id','title' ,'year', 'movieLength' , 'ageGuide' , 'plot' ,'poster' , 'trailer']]
movieDF =pd.DataFrame(columns= ["movie_id" , "title" , "year" , "length" , "age_guide", "description" , "poster" , "trailer_url"])
movieDF

for m in range(len(mdf)):
        row = {"movie_id" : mdf['movie_id'][m],"title": mdf['title'][m],
              "year" : mdf['year'][m] ,"length": mdf['movieLength'][m], 
              "age_guide" : mdf['ageGuide'][m] ,"description": mdf['plot'][m], 
              "poster" : mdf['poster'][m] ,"trailer_url": mdf['trailer'][m], }
        movieDF = movieDF.append(row , ignore_index=True)
        
movieDF=movieDF.drop_duplicates(subset=['title'])
movieDF


# In[317]:


#Insert Movie
for index, row in movieDF.iterrows():
    if row['year']=='':
        row['year']=0
    cursor.execute('INSERT INTO "Movie" (movie_id, title,year,length,age_guide,description,poster,trailer_url,is_in_cinema) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)' 
                   ,[int(row['movie_id']),str(row['title'])
                     ,row['year'],
                     str(row['length'])
                    ,str(row['age_guide']),row['description'],str(row['poster']),str(row['trailer_url']),True] )
    conn.commit()


# In[318]:


cursor.execute('SELECT * FROM "Genre"')
genreDB = pd.DataFrame(cursor.fetchall(),columns=['genre_id','genre'])
genreDB


# In[319]:


#Create genredf with movie_id and genre
genredf=df[['movie_id','genres']]
genreList = genredf.apply(lambda x: pd.Series(x['genres']), axis=1).stack().reset_index(level=1, drop=True)
genreList.name = 'genre'
genredf = genredf.drop('genres', axis=1).join(genreList)
genredf['genre'] = pd.Series(genredf['genre'], dtype=object)
genredf=genredf.rename(columns={"genre":"genre"})


# In[320]:


genredf=genredf[genredf['genre']!='']
genredf


# In[321]:


#New genres that are not in DB
newGenres=list(set(genredf['genre'].unique()).difference(genreDB['genre']))
newGenres


# In[322]:


#Mapping genre with id
Movie_Genre = pd.merge(genredf, genreDB ,on='genre')
Movie_Genre = Movie_Genre[['movie_id' ,'genre_id']]
Movie_Genre = Movie_Genre.sort_values(by =['movie_id'])
Movie_Genre


# In[323]:


#Add new genres to DB
genreDB=sqlio.read_sql_query('SELECT genre_id FROM "Genre"',conn)
genre_id=list(genreDB['genre_id'])
newID=max(genre_id)+1
for genre in newGenres[1:]:
    cursor.execute('INSERT INTO "Genre" (genre_id, genre) VALUES(%s, %s)' ,[newID,genre] )
    newID=newID+1
    conn.commit()


# In[324]:


#Insert Movie_Genre
for index, row in Movie_Genre.iterrows():
    cursor.execute('INSERT INTO "Movie_Genre" (movie_id, genre_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['genre_id'])] )
    conn.commit()


# In[325]:


#Get directors from DB
cursor.execute('SELECT * FROM "Director"')
directorDB = pd.DataFrame(cursor.fetchall(),columns=['director_id','director'])
directorDB


# In[326]:


#Create directordf with coming soon movie_id and director
directordf=df[['movie_id','director']]
directorList = directordf.apply(lambda x: pd.Series(x['director']), axis=1).stack().reset_index(level=1, drop=True)
directorList.name = 'director'
directordf = directordf.drop('director', axis=1).join(directorList)
directordf['director'] = pd.Series(directordf['director'], dtype=object)
directordf=directordf.dropna(axis = 0, how ='any')
directordf=directordf[directordf['director']!='']
directordf=directordf.reset_index()
for index,row in directordf.iterrows():
    directorName=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row['director']).strip().replace("()","")
    directordf.loc[index,'director']=directorName
directordf


# In[327]:


#New directors that are not in DB
newDirectors=list(set(directordf['director'].unique()).difference(directorDB['director']))
newDirectors


# In[328]:


#Add new director to DB
directorDB=sqlio.read_sql_query('SELECT director_id FROM "Director"',conn)
directorDB=list(directorDB['director_id'])
newDirectorID=max(directorDB)+1
newDirectorIDArray=[]
for director in newDirectors:
    cursor.execute('INSERT INTO "Director" (director_id, director) VALUES(%s, %s) RETURNING director_id' ,[newDirectorID,director] )
    newId=cursor.fetchone()[0]
    newDirectorIDArray.append(newId)
    newDirectorID=newDirectorID+1
    conn.commit()


# In[329]:


#Check if added
cursor.execute('SELECT * FROM "Director"')
directorDB = pd.DataFrame(cursor.fetchall(),columns=['director_id','director'])
directorDB


# In[330]:


#Create Movie_Director
Movie_Director = pd.merge(directordf, directorDB ,on='director')
Movie_Director = Movie_Director[['movie_id' ,'director_id']]
Movie_Director = Movie_Director.sort_values(by =['movie_id'])
Movie_Director


# In[331]:


#Insert Movie_Director
for index, row in Movie_Director.iterrows():
    cursor.execute('INSERT INTO "Movie_Director" (movie_id, director_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['director_id'])] )
    conn.commit()


# In[332]:


#Get writer from DB
cursor.execute('SELECT * FROM "Writer"')
writerDB = pd.DataFrame(cursor.fetchall(),columns=['writer_id','writer'])
writerDB


# In[333]:


#Create writerdf with movie_id and writer
writerdf=df[['movie_id','writer']]
writerList = writerdf.apply(lambda x: pd.Series(x['writer']), axis=1).stack().reset_index(level=1, drop=True)
writerList.name = 'writer'
writerdf = writerdf.drop('writer', axis=1).join(writerList)
writerdf['writer'] = pd.Series(writerdf['writer'], dtype=object)
writerdf=writerdf.dropna(axis = 0, how ='any')
writerdf=writerdf.reset_index()
for index,row in writerdf.iterrows():
    writerName=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row['writer']).strip().replace("()","").strip()
    writerdf.loc[index,'writer']=writerName
writerdf


# In[334]:


#New writer that are not in DB
newWriters=list(set(writerdf['writer'].unique()).difference(writerDB['writer']))
newWriters


# In[335]:


writerDB=sqlio.read_sql_query('SELECT writer_id FROM "Writer"',conn)
writerDB=list(writerDB['writer_id'])
max(writerDB)
newWriterID=max(writerDB)+1
# newWriterID


# In[336]:


#Add new writer to DB
writerDB=sqlio.read_sql_query('SELECT writer_id FROM "Writer"',conn)
writerDB=list(writerDB['writer_id'])
newWriterID=max(writerDB)+1
newWriterIDArray=[]
for writer in newWriters:
    cursor.execute('INSERT INTO "Writer" (writer_id, writer) VALUES(%s, %s)RETURNING writer_id' ,[newWriterID,writer] )
    newWriterIDArray.append(cursor.fetchone()[0])
    newWriterID=newWriterID+1
    conn.commit()


# In[337]:


#Check if added
cursor.execute('SELECT * FROM "Writer"')
writerDB = pd.DataFrame(cursor.fetchall(),columns=['writer_id','writer'])
writerDB


# In[338]:


#Create Movie_Writer
Movie_Writer = pd.merge(writerdf, writerDB ,on='writer')
Movie_Writer = Movie_Writer[['movie_id' ,'writer_id']]
Movie_Writer = Movie_Writer.sort_values(by =['movie_id'])
Movie_Writer


# In[339]:


#Insert Movie_Writer
for index, row in Movie_Writer.iterrows():
    cursor.execute('INSERT INTO "Movie_Writer" (movie_id, writer_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['writer_id'])] )
    conn.commit()


# In[340]:


#Get languages from DB
cursor.execute('SELECT * FROM "Language"')
languageDB = pd.DataFrame(cursor.fetchall(),columns=['language_id','language'])
languageDB


# In[341]:


#Create languagedf with movie_id and langauge
languagedf=df[['movie_id','language']]
languageList = languagedf.apply(lambda x: pd.Series(x['language']), axis=1).stack().reset_index(level=1, drop=True)
languageList.name = 'language'
languagedf = languagedf.drop('language', axis=1).join(languageList)
languagedf['language'] = pd.Series(languagedf['language'], dtype=object)
languagedf=languagedf.dropna(axis = 0, how ='any')
languagedf=languagedf[languagedf['language']!='']
languagedf


# In[342]:


#New langauge that are not in DB
newLanguages=list(set(languagedf['language'].unique()).difference(languageDB['language']))
newLanguages


# In[343]:


cursor.execute('SELECT * FROM "Genre"')
genreDB = pd.DataFrame(cursor.fetchall(),columns=['genre_id','genre'])
genreDB


# In[344]:


#Clean new languages
missplacedGenresInLanguages=list(set(newLanguages) & set(genreDB['genre']))
newLanguages = [e for e in newLanguages if e not in (missplacedGenresInLanguages)]
newLanguages


# In[345]:


#Add new language to DB
languageDB=sqlio.read_sql_query('SELECT language_id FROM "Language"',conn)
languageDB=list(languageDB['language_id'])
newLanguageID=max(languageDB)+1
for language in newLanguages:
    cursor.execute('INSERT INTO "Language" (language_id, language) VALUES(%s, %s)' ,[newLanguageID,language] )
    newLanguageID=newLanguageID+1
    conn.commit()


# In[346]:


#Check if added
cursor.execute('SELECT * FROM "Language"')
languageDB = pd.DataFrame(cursor.fetchall(),columns=['language_id','language'])
languageDB


# In[347]:


#Create Movie_Language for coming soon movies
Movie_Language = pd.merge(languagedf, languageDB ,on='language')
Movie_Language = Movie_Language[['movie_id' ,'language_id']]
Movie_Language = Movie_Language.sort_values(by =['movie_id'])
Movie_Language


# In[348]:


#Insert Movie_Language
for index, row in Movie_Language.iterrows():
    cursor.execute('INSERT INTO "Movie_Language" (movie_id, language_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['language_id'])] )
    conn.commit()


# In[349]:


#Get actors from DB
cursor.execute('SELECT * FROM "Actor"')
actorDB = pd.DataFrame(cursor.fetchall(),columns=['actor_id','actor','actor_image_url'])
actorDB


# In[350]:


#Covert list to list to row
actordf=df[['movie_id','actors']]
s = actordf.apply(lambda x: pd.Series(x['actors']), axis=1).stack().reset_index(level=1, drop=True)
s.name = 'actors'
actordf = actordf.drop('actors', axis=1).join(s)
actordf['actors'] = pd.Series(actordf['actors'], dtype=object)
actordf=actordf[actordf['actors']!='']
actordf


# In[351]:


#Split list to columns and add movie_id
actordf_afterSplit = pd.DataFrame(actordf['actors'].tolist(), columns=['actor', 'role', 'actor_image_url'])
actordf_afterSplit.insert(loc=0, column='movie_id', value=list(actordf['movie_id']))
actordf_afterSplit=actordf_afterSplit[actordf_afterSplit['actor']!='']
actordf_afterSplit=actordf_afterSplit[actordf_afterSplit['actor']!='N/A']
actordf_afterSplit=actordf_afterSplit.dropna()
actordf_afterSplit["actor"]=actordf_afterSplit["actor"].str.replace(",","")
actordf_afterSplit["actor"]=actordf_afterSplit["actor"].str.replace(".","")
actordf_afterSplit["actor"]=actordf_afterSplit["actor"].str.strip()
actordf_afterSplit


# In[352]:


#New actors that are not in DB
newActors=list(set(actordf_afterSplit['actor'].unique()).difference(actorDB['actor']))
newActorsdf=actordf_afterSplit[(~actordf_afterSplit.actor.isin(actorDB.actor))]
newActorsdf=newActorsdf[newActorsdf['actor']!='']
newActorsdf=newActorsdf.drop_duplicates(subset=['actor'])
newActorsdf


# In[353]:


#Add new Actor to DB
actorDB=sqlio.read_sql_query('SELECT * FROM "Actor"',conn)
actorDB=list(actorDB['actor_id'])
newActorID=max(actorDB)+1
for index, row in newActorsdf.iterrows():
    cursor.execute('INSERT INTO "Actor" (actor_id, actor, actor_image_url) VALUES(%s, %s , %s)' ,[newActorID,row['actor'],row['actor_image_url']] )
    newActorID=newActorID+1
    conn.commit()


# In[354]:


#Check if added
cursor.execute('SELECT * FROM "Actor"')
actorDB = pd.DataFrame(cursor.fetchall())
actorDB=actorDB.rename(columns={0: "actor_id", 1: "actor",2:'actor_image_url'})
actorDB


# In[355]:


#Get roles from DB
cursor.execute('SELECT * FROM "Role"')
roleDB = pd.DataFrame(cursor.fetchall(),columns=['movie_id','actor_id','role'])
roleDB


# In[356]:


#Mapping Actor with id

roledf = pd.merge(actordf_afterSplit, actorDB,on=['actor' , 'actor_image_url'], how='left')
roledf = roledf.sort_values(by =['movie_id'])

#Drop actors without roles
roledf = roledf[['movie_id' ,'actor_id' , 'role']].dropna()
roledf=roledf[roledf['role'] != '']
roledf=roledf.drop_duplicates(subset=['movie_id','actor_id'])
roledf


# In[357]:


#Insert Role
for index, row in roledf.iterrows():
    cursor.execute('INSERT INTO "Role" (movie_id, actor_id,role) VALUES(%s, %s, %s)' ,[int(row['movie_id']),int(row['actor_id']), row['role']] )
    conn.commit()


# In[358]:


cinemaDF=cinemaDF.rename(columns={"cinema_x":"cinema","location&bookingLink_x":"location&bookingLink"})


# In[359]:


#Create cinemadf with movie_id and cinema
cinemadf=cinemaDF[['movie_id','cinema']]
cinemaList = cinemadf.apply(lambda x: pd.Series(x['cinema']), axis=1).stack().reset_index(level=1, drop=True)
cinemaList.name = 'cinema'
cinemadf = cinemadf.drop('cinema', axis=1).join(cinemaList)
cinemadf['cinema'] = pd.Series(cinemadf['cinema'], dtype=object)
cinemadf=cinemadf.drop_duplicates()


# In[360]:


cinemadf


# In[361]:


#Extract common movies booking list of list to list

moive_bookingLink=cinemaDF[['movie_id','cinema','location&bookingLink']]
moive_bookingLink=moive_bookingLink.dropna()


moive_bookingLinkList = moive_bookingLink.apply(lambda x: pd.Series(x['location&bookingLink']), axis=1).stack().reset_index(level=1, drop=True)
moive_bookingLinkList.name = 'location&bookingLink'
moive_bookingLink = moive_bookingLink.drop('location&bookingLink', axis=1).join(moive_bookingLinkList)
moive_bookingLink['location&bookingLink'] = pd.Series(moive_bookingLink['location&bookingLink'], dtype=object)
moive_bookingLink=moive_bookingLink.dropna()
moive_bookingLink=moive_bookingLink[moive_bookingLink['location&bookingLink']!=""]


moive_bookingLinkList = moive_bookingLink.apply(lambda x: pd.Series(x['location&bookingLink']), axis=1).stack().reset_index(level=1, drop=True)
moive_bookingLinkList.name = 'location&bookingLink'
moive_bookingLink = moive_bookingLink.drop('location&bookingLink', axis=1).join(moive_bookingLinkList)
moive_bookingLink['location&bookingLink'] = pd.Series(moive_bookingLink['location&bookingLink'], dtype=object)


moive_bookingLink=moive_bookingLink[moive_bookingLink['location&bookingLink']!=""]
moive_bookingLink=moive_bookingLink.rename(columns={'location&bookingLink':"location_city_link"})
moive_bookingLink


# In[362]:


moive_bookingLink2 = pd.DataFrame(columns=['movie_id','name','location_city_link'])
moive_bookingLink2


# In[363]:


#Get uncommon movies booking link
for index, row in moive_bookingLink.iterrows():
        if "vox" in row['location_city_link'][2]:
            cinemaName="vox"
        else:
            if "amc" in row['location_city_link'][2]:
                cinemaName="amc"
            else:
                if "muvi" in row['location_city_link'][2]:
                    cinemaName="muvi"
        Movierow = {'movie_id':row['movie_id'],'name':cinemaName,'location_city_link':row['location_city_link']}
        moive_bookingLink2 = moive_bookingLink2.append(Movierow, ignore_index = True)


# In[364]:


moive_bookingLink2


# In[368]:


#Create cinemadf
#Divide list to columns
cinemadf=moive_bookingLink2.location_city_link.apply(pd.Series)
cinemadf['movie_id']=moive_bookingLink2['movie_id']
cinemadf['name']=moive_bookingLink2['name']
cinemadf=cinemadf.rename(columns={0:'location',1:'city',2:'link'})
cinemadf=cinemadf[cinemadf['location']!='']
cinemadf=cinemadf.dropna()
cinemadf


# In[369]:


cinemadf=cinemadf.drop_duplicates()


# In[370]:


cinemadf=cinemadf.drop_duplicates(subset=['location','city','movie_id','name'])


# In[371]:


#Create Cinema Table
cinemadfTable=cinemadf.drop_duplicates()
cinemadfTable=cinemadfTable.drop_duplicates(subset=['location','city'])
cinemadfTable=cinemadfTable[['location',"city","name"]]
# cinemadfTable.drop_duplicates()


# In[372]:


#Get cienmas from db
CinemaDB=sqlio.read_sql_query('SELECT * FROM "Cinema"',conn)
CinemaDB


# In[373]:


#See if there are new cinemas that do not exist in the db
AllCinemas=cinemadfTable.merge(CinemaDB,on=['name','city','location'],how='left')
# AllCinemas
newCinemas=AllCinemas[np.isnan(AllCinemas['cinema_id'])==True]
newCinemas


# In[374]:


#Get new ids
newCinemasId=max(CinemaDB['cinema_id'])+1
newCinemasId


# In[375]:


#Insert New Cinema
for index, row in newCinemas[1:].iterrows():
    cursor.execute('INSERT INTO "Cinema" (cinema_id, name,city,location) VALUES(%s, %s, %s,%s)' ,[newCinemasId,row['name'], row['city'], row['location']] )
    conn.commit()
    newCinemasId=newCinemasId+1


# In[376]:


#Get cinemas from db after adding
CinemaDB=sqlio.read_sql_query('SELECT * FROM "Cinema"',conn)
CinemaDB


# In[377]:


#Get all cinemas
AllCinemas=cinemadfTable.merge(CinemaDB,on=['name','city','location'],how='left')
AllCinemas


# In[388]:


#Create In_Cinema Table
In_Cinemadf=cinemadf.merge(AllCinemas,on=['location','city'])
In_Cinemadf=In_Cinemadf[['link','movie_id','cinema_id']]
In_Cinemadf
In_Cinemadf=In_Cinemadf.dropna()


# In[390]:


#Insert In_Cinema
for index, row in In_Cinemadf.iterrows():
    cursor.execute('INSERT INTO "In_Cinema" (cinema_id, movie_id,booking_link) VALUES(%s, %s, %s)' ,[int(row['cinema_id']), int(row['movie_id']), row['link']] )
    conn.commit()


# In[ ]:




