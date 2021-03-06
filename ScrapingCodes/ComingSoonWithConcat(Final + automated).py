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


# # 1- vox

# In[2]:


voxComingSoonResponse = requests.get("https://ksa.voxcinemas.com/movies/comingsoon")
voxComingSoonSoup = BeautifulSoup(voxComingSoonResponse.text, 'html.parser')


# In[3]:


#Age Guide and Link
voxComingSoonLinkArray=[]
voxComingSoonAgeGuideArray=[]
voxComingSoonLinks=voxComingSoonSoup.find('section',{'class':'coming-soon'}).find_all('a',{'class':'action primary outline'})
voxComingSoonMovies=voxComingSoonSoup.find_all('h3')

for movie in voxComingSoonMovies:
    #Age Guide
    span=voxComingSoonSoup.find('h3').find_all('a')[0].span.text
    try:
        voxComingSoonAgeGuideArray.append(movie.find_all('a')[0].text[:len(span)])
    except:
        voxComingSoonAgeGuideArray.append('')
for link in voxComingSoonLinks:
    #Movie Link
    voxComingSoonLinkArray.append('https://ksa.voxcinemas.com'+link['href'])


# In[4]:


voxComingSoonTitleArray=[]
voxComingSoonTrailerArray=[]
voxComingSoonDescriptionArray=[]
voxComingSoonGenreArray=[]
voxComingSoonYearArray=[]
voxComingSoonReleaseDateArray=[]
voxComingSoonImgArray=[]
voxComingSoonActorArray=[]
voxComingSoonLanguageArray=[]
voxComingSoonDurationArray=[]

for link in voxComingSoonLinkArray:
    
    #Coming soon movie response
    voxComingSoonMovieResponse = requests.get(link)
    voxComingSoonMovieSoup = BeautifulSoup(voxComingSoonMovieResponse.text, 'html.parser')
    
    #Title
    title=voxComingSoonMovieSoup.find('h1').text
    title=re.sub("[\(\[].*?[\)\]]", "", title).strip()
    voxComingSoonTitleArray.append(title)
    
    info=voxComingSoonMovieSoup.find('aside').find_all('p')
        
    try:
        if info[0].text.rsplit(': ', 1)[0]=='Genre':
            #Genre
            voxComingSoonGenreArray.append([info[0].text.rsplit(': ', 1)[1]])
        else:
            voxComingSoonGenreArray.append([])
        
    except:
        voxComingSoonGenreArray.append([])
        
    try:    
        if info[1].text.rsplit(': ', 1)[0]=='Release Date':
            #Year
            voxComingSoonYearArray.append(info[1].text.rsplit(': ', 1)[1][-4:])
            #Release Date
            voxComingSoonReleaseDateArray.append(info[1].text.rsplit(': ', 1)[1])
        else:
            voxComingSoonYearArray.append('')
            voxComingSoonReleaseDateArray.append('')
    except:
        voxComingSoonYearArray.append('')
        voxComingSoonReleaseDateArray.append('')
        
    try:
        if info[2].text.rsplit(': ', 1)[0]=='Starring':
            #Actor
            actorNames=[]
            for actor in info[2].text.rsplit(': ', 1)[1].split(", "):
                actorNames.append([actor,'',''])
            voxComingSoonActorArray.append(actorNames)
        else:
            voxComingSoonActorArray.append(['','',''])
    except:
        voxComingSoonActorArray.append(['','',''])

    try:
        if info[2].text.rsplit(': ', 1)[0]=='Language':
            #Language
            voxComingSoonLanguageArray.append(info[2].text.rsplit(': ', 1)[1])
        else:
            if info[3].text.rsplit(': ', 1)[0]=='Language':
                #Language
                voxComingSoonLanguageArray.append(info[3].text.rsplit(': ', 1)[1])
            else:
                voxComingSoonLanguageArray.append('')
    except:
        voxComingSoonLanguageArray.append('')
        
    #Description
    try:
        voxComingSoonDescriptionArray.append(voxComingSoonMovieSoup.find_all('article')[1].find('p').text)
    except:
        voxComingSoonDescriptionArray.append('')
    
    #Poster
    try:
        voxComingSoonImgArray.append(voxComingSoonMovieSoup.find('main').find('img')['data-src'])
    except:
        voxComingSoonImgArray.append('')
    
    #Trailer
    try:
        voxComingSoonTrailerArray.append(voxComingSoonMovieSoup.find('div',{'class':'trailer'}).find('iframe')['src'])
    except:
        voxComingSoonTrailerArray.append('')


# In[5]:


#Get imdb id
import http.client

conn = http.client.HTTPSConnection("imdb-internet-movie-database-unofficial.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "imdb-internet-movie-database-unofficial.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }

voxComingSoonMovieIdsArray=[]
index=0
for title in voxComingSoonTitleArray:
    
    #If the movie is arabic don't get imdb id
    if voxComingSoonLanguageArray[index]=="Arabic":
        print(title)
        voxComingSoonMovieIdsArray.append('')
        index=index+1
        continue
    APItitle=title.replace(' ','%20')
    print(APItitle)
    conn.request("GET", "/search/"+APItitle, headers=headers)
    res = conn.getresponse()
    data = res.read()
    jsonResponse=json.loads(data.decode("utf-8"))
    index=index+1
    try:
        voxComingSoonMovieIdsArray.append(jsonResponse['titles'][0]['id'])
        print(jsonResponse['titles'][0]['id'])
    except:
        voxComingSoonMovieIdsArray.append('')


# In[6]:


voxComingSoonDf = pd.DataFrame(columns=['cinema','imdbID','title','year','release date','genres', 'movieLength',
              'ageGuide','plot', 'language','actors','director','writer','poster', 'trailer'])
voxComingSoonDf


# In[7]:


index=0
for imdbID in voxComingSoonMovieIdsArray:
    print(index)
    if imdbID=='':
        Movierow = {'cinema':'vox','imdbID':imdbID,'title':voxComingSoonTitleArray[index],'year':voxComingSoonYearArray[index],
                    'release date':voxComingSoonReleaseDateArray[index],'genres':voxComingSoonGenreArray[index], 
                'movieLength':'',
                'ageGuide':voxComingSoonAgeGuideArray[index],'plot':voxComingSoonDescriptionArray[index], 
                    'language':[voxComingSoonLanguageArray[index]],'actors':voxComingSoonActorArray[index],'director':[],
                'writer':[],'poster':voxComingSoonImgArray[index],'trailer':voxComingSoonTrailerArray[index]}
        print(Movierow)
        voxComingSoonDf = voxComingSoonDf.append(Movierow, ignore_index = True)
        index=index+1
        continue
    response = requests.get("https://www.imdb.com/title/"+imdbID)
    soup = BeautifulSoup(response.text, 'html.parser')
    #1-Title
    title=voxComingSoonTitleArray[index]

    #2-Year
    try:
        year=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[0].a.text
    except:
        year=voxComingSoonYearArray[index]
        print('except:year')
    
    #Release date
    release_date=voxComingSoonReleaseDateArray[index]
        
    #3-Genres
    try:
        Genres=soup.find('li',{'data-testid':'storyline-genres'}).find('ul')
        GenresList=[]
        for Genre in Genres:
            GenresList.append(Genre.text)
    except:
        GenresList=voxComingSoonGenreArray[index]
        print('except:GenresList')
        
    #4-Movie Length
    try:
        movieLength=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[2].text
        movieLength=movieLength.replace('m','min')
    except:
        movieLength=''
        print('except:movieLength')
        
    #6-Age Guide
    try:
        ageGuide=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[1].a.text
    except:
        ageGuide=voxComingSoonAgeGuideArray[index]
        print('except:ageGuide')
        
    #7-Plot
    try:
        plot=soup.find('div',{'class':'Storyline__StorylineWrapper-sc-1b58ttw-0 iywpty'}).find('div').find('div').find('div').text
        try:
            plot=plot.split(' ???')[0]
        except:
            print('')
    except:
        plot=voxComingSoonDescriptionArray[index]
        print('except:plot')
        
    #8-Language
    if voxComingSoonLanguageArray[index]!='':
        languageList=[voxComingSoonLanguageArray[index]]
        
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
            languageList=''
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
        castList=voxComingSoonActorArray[index]
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
        poster=voxComingSoonImgArray[index]
        print('except:poster')
        
    #12- Trailer
    trailer=voxComingSoonTrailerArray[index]

    Movierow = {'cinema':'vox','imdbID':imdbID,'title':title,'year':year,'release date':release_date,'genres':GenresList, 
                'movieLength':movieLength,
                'ageGuide':ageGuide,'plot':plot, 'language':languageList,'actors':castList,'director':directorsList,
                'writer':writersList,'poster':poster,'trailer':trailer}
    print(Movierow)
    voxComingSoonDf = voxComingSoonDf.append(Movierow, ignore_index = True)
    index=index+1


# In[8]:


voxComingSoonDf


# # 2- amc

# In[9]:


from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


# In[10]:


amcComingSoonDriver = webdriver.Chrome(ChromeDriverManager().install())
amcComingSoonResponse = amcComingSoonDriver.get("https://www.amccinemas.com/movies?val=comingsoon")
amcComingSoonContent = amcComingSoonDriver.page_source
amcComingSoonSoup = BeautifulSoup(amcComingSoonContent)


# In[11]:


amcComingSoonMovie=amcComingSoonSoup.select('#Featured_coming>ul')[0]
amcComingSoonTitleArray=[]
amcComingSoonImgArray=[]
amcComingSoonYearArray=[]
amcComingSoonLinkArray=[]
amcComingSoonReleaseDateArray=[]

#Find all coming soon movies
for movie in amcComingSoonMovie.find_all('li'):
    
    #Title
    try:
        title=movie.find('p').text.rstrip()
        title=re.sub("[\(\[].*?[\)\]]", "", title).strip()
        amcComingSoonTitleArray.append(title)
    except:
        amcComingSoonTitleArray.append('')
        
    
    #Poster
    try:
        amcComingSoonImgArray.append(movie.find('img')['src'])
    except:
        amcComingSoonImgArray.append('')
    
    #Release Date
    try:
        amcComingSoonReleaseDateArray.append([movie.find('p',{'class':'tym'}).text.rstrip().lstrip()])
    except:
        amcComingSoonReleaseDateArray.append('')
        
    #Year
    try:
        amcComingSoonYearArray.append(movie.find('p',{'class':'tym'}).text[-5:].replace(' ',''))
    except:
        amcComingSoonYearArray.append('')
        
    #Movie Link
    try:
        amcComingSoonLinkArray.append('https://www.amccinemas.com/movies/'+movie.find('section',{'class':'img-blk'})['onclick'].rsplit('(', 1)[1].split(",")[0].replace('\'', ''))
    except:
        amcComingSoonLinkArray.append('')
        


# In[12]:


amcComingSoonActorArray=[]
amcComingSoonDescriptionArray=[]
amcComingSoonDurationArray=[]
amcComingSoonLanguageArray=[]
amcComingSoonAgeGuideArray=[]
amcComingSoonGenreArray=[]

#Go through all movies
for link in amcComingSoonLinkArray:
    
    #Request Movie Page
    moviePageResponse = requests.get(link)
    movie = BeautifulSoup(moviePageResponse.text, 'html.parser')
    
    #Genre
    try:
        amcComingSoonGenreArray.append([movie.find('section',{'class':'amc-title-info'}).find_all('li')[-1].text])
    except:
        amcComingSoonGenreArray.append([])
    
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
        amcComingSoonDurationArray.append(duration)
    except:
        amcComingSoonDurationArray.append('')

        
    #Actor
    try:
        if movie.find('p',{'class':'amc-cast'}).text.rsplit(': ', 1)[0]=="Cast & Crew":
            #Actors
            actorNames=[]
            for actor in movie.find('p',{'class':'amc-cast'}).text.rsplit(': ', 1)[1].split(", "):
                actorNames.append([actor,'',''])
            amcComingSoonActorArray.append(actorNames)
        else:
            amcComingSoonActorArray.append('')
            
    except:
        amcComingSoonActorArray.append('')
    
    #Description
    try:
        if movie.find('p',{'class':'amc-synopsis'}).text.split(':', 1)[0]=="Synopsis":
            amcComingSoonDescriptionArray.append(movie.find('p',{'class':'amc-synopsis'}).text.split(':', 1)[1])
        else:
            amcComingSoonDescriptionArray.append('')
    except:
        amcComingSoonDescriptionArray.append('')
        
    
#     Age Guide
    try:
        amcComingSoonAgeGuideArray.append(movie.find('section',{'class':'amc-title-info'}).find_all('li')[0].text)
    except:
        amcComingSoonAgeGuideArray.append('')
#     Language   
    try:
        if len(amcComingSoonMovieSoup.find('section',{'class':'amc-title-info'}).find_all('li'))==3:
            amcComingSoonLanguageArray.append('')
            continue
        else:
            amcComingSoonLanguageArray.append(movie.find('section',{'class':'amc-title-info'}).find_all('li')[2].text)
    except:
        amcComingSoonLanguageArray.append('')
        


# In[13]:


import http.client

conn = http.client.HTTPSConnection("imdb-internet-movie-database-unofficial.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "imdb-internet-movie-database-unofficial.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }

amcComingSoonMovieIdsArray=[]
index=0
for title in amcComingSoonTitleArray:
    
    #If the movie is arabic don't get imdb id
    if amcComingSoonLanguageArray[index]=="Arabic":
        print(title)
        amcComingSoonMovieIdsArray.append('')
        index=index+1
        continue
    APItitle=title.replace(' ','%20')
    print(APItitle)
    index=index+1
    try:
        conn.request("GET", "/search/"+APItitle, headers=headers)
        res = conn.getresponse()
        data = res.read()
        jsonResponse=json.loads(data.decode("utf-8"))
        try:
            amcComingSoonMovieIdsArray.append(jsonResponse['titles'][0]['id'])
        except:
            amcComingSoonMovieIdsArray.append('')
    except:
            amcComingSoonMovieIdsArray.append('')
        


# In[14]:


amcComingSoonDf = pd.DataFrame(columns=['cinema','imdbID','title','year','release date','genres', 'movieLength',
              'ageGuide','plot', 'language','actors','director','writer','poster', 'trailer'])
amcComingSoonDf


# In[15]:


index=0
for imdbID in amcComingSoonMovieIdsArray:
    print(index)
    if imdbID=='':
        Movierow = {'cinema':'amc','imdbID':imdbID,'title':amcComingSoonTitleArray[index],'year':amcComingSoonYearArray[index],
                    'release date':amcComingSoonReleaseDateArray[index],'genres':amcComingSoonGenreArray[index], 
                'movieLength':amcComingSoonDurationArray[index],
                'ageGuide':amcComingSoonAgeGuideArray[index],'plot':amcComingSoonDescriptionArray[index], 
                'language':amcComingSoonLanguageArray[index],'actors':amcComingSoonActorArray[index],'director':[],
                'writer':[],'poster':amcComingSoonImgArray[index],'trailer':''}
        print(Movierow)
        amcComingSoonDf = amcComingSoonDf.append(Movierow, ignore_index = True)
        index=index+1
        continue
    response = requests.get("https://www.imdb.com/title/"+imdbID)
    soup = BeautifulSoup(response.text, 'html.parser')
    #1-Title
    title=amcComingSoonTitleArray[index]

    #2-Year
    try:
        year=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[0].a.text
    except:
        year=amcComingSoonYearArray[index]
        print('except:year')
    
    #Release date
    release_date=amcComingSoonReleaseDateArray[index]
        
    #3-Genres
    try:
        Genres=soup.find('li',{'data-testid':'storyline-genres'}).find('ul')
        GenresList=[]
        for Genre in Genres:
            GenresList.append(Genre.text)
    except:
        GenresList=amcComingSoonGenreArray[index]
        print('except:GenresList')
        
    #4-Movie Length
    try:
        movieLength=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[2].text
        movieLength=movieLength.replace('m','min')
    except:
        movieLength=amcComingSoonDurationArray[index]
        print('except:movieLength')
        
    #6-Age Guide
    try:
        ageGuide=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[1].a.text
    except:
        ageGuide=amcComingSoonAgeGuideArray[index]
        print('except:ageGuide')
        
    #7-Plot
    try:
        plot=soup.find('div',{'class':'Storyline__StorylineWrapper-sc-1b58ttw-0 iywpty'}).find('div').find('div').find('div').text
        try:
            plot=plot.split(' ???')[0]
        except:
            print('')
    except:
        plot=voxComingSoonDescriptionArray[index]
        print('except:plot')
        
    #8-Language
    if amcComingSoonLanguageArray[index]!='':
        languageList=[amcComingSoonLanguageArray[index]]
        
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
            languageList=''
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
        castList=amcComingSoonActorArray[index]
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
        poster=voxComingSoonImgArray[index]
        print('except:poster')
        


    Movierow = {'cinema':'amc','imdbID':imdbID,'title':title,'year':year,'release date':release_date,'genres':GenresList, 
                'movieLength':movieLength,
                'ageGuide':ageGuide,'plot':plot, 'language':languageList,'actors':castList,'director':directorsList,
                'writer':writersList,'poster':poster,'trailer':''}
    print(Movierow)
    amcComingSoonDf = amcComingSoonDf.append(Movierow, ignore_index = True)
    index=index+1


# In[16]:


amcComingSoonDf


# # 3-muvi

# In[17]:


from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
muviDriver = webdriver.Chrome(ChromeDriverManager().install())
muviWhatsOnResponse = muviDriver.get("https://www.muvicinemas.com/en/movies?opt=comingsoon")
muviWhatsOnPage = muviDriver.page_source
muviWhatsOnSoup = BeautifulSoup(muviWhatsOnPage)


# In[18]:


muviComingSoonTitleArray=[]
muviComingSoonImgArray=[]
muviComingSoonLinkArray=[]
muviComingSoonAgeGuideArray=[]
muviComingSoonGenreArray=[]

for movie in muviWhatsOnSoup.find('ul',{'class':'mv-movie-list'}).find_all('li'):
    
    #Title
    title=movie.find('h3').text
    title=re.sub("[\(\[].*?[\)\]]", "", title).strip()
    muviComingSoonTitleArray.append(title)
    
    #Age Guide
    muviComingSoonAgeGuideArray.append(movie.find('section',{'class':'mv-gen-group'}).text)
    
    #Genre
    muviComingSoonGenreArray.append(movie.find('span',{'class':'mv-txt0 hidden-xxs'}).text.split('/ '))
    
    #Poster
    muviComingSoonImgArray.append(movie.find('img')['src'])
    
    #Movie Link
    muviComingSoonLinkArray.append(movie.find('a')['movie_url'])


# In[19]:


muviComingSoonActorArray=[]
muviComingSoonDirectorArray=[]
muviComingSoonDescriptionArray=[]
muviComingSoonLanguageArray=[]
muviComingSoonDurationArray=[]
muviComingSoonYearArray=[]
muviComingSoonReleaseDateArray=[]

for link in muviComingSoonLinkArray:
    
    #Request Movie Page
    muvieMoviePageResponse = requests.get(link)
    muviMovie = BeautifulSoup(muvieMoviePageResponse.text, 'html.parser')

    #Actor
    actorList=[]
    for actor in muviMovie.find('li',{'class':'mv-cast'}).find('p').text.split(", "):
        actorName=actor.replace("\xa0", "").strip()
        pattern = re.compile(r'\.$')
        actorName = pattern.sub(r'', actorName)
        actorList.append([actorName,'',''])
    muviComingSoonActorArray.append(actorList)
        
        
    
    #Director
    directorList=[]
    if muviMovie.find('li',{'class':'mv-director'}).find('p').text=="N/A":
        muviComingSoonDirectorArray.append('')
    else:
        for director in muviMovie.find('li',{'class':'mv-director'}).find('p').text.split(", "):
            directorName=director.replace("\xa0", "").strip()
            directorList.append(directorName)
        muviComingSoonDirectorArray.append(directorList)
    
    #Description
    muviComingSoonDescriptionArray.append(muviMovie.find('li',{'class':'mv-synopsis'}).find('p').text)
    
    #Language
    if muviMovie.find('li',{'class':'mv-language'}).find('p').text=="N/A":
        muviComingSoonLanguageArray.append('')
    else:
        muviComingSoonLanguageArray.append(muviMovie.find('li',{'class':'mv-language'}).find('p').text)
    
    #Duration
    if muviMovie.find('li',{'class':'mv-runtime'}).find('p').text=="N/A":
        muviComingSoonDurationArray.append('')
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
        muviComingSoonDurationArray.append(duration)
    
    #Year
    try:
        if muviMovie.find('li',{'class':'mv-releasedate'}).find('p').text=="N/A":
            muviComingSoonYearArray.append('')
        else:
            muviComingSoonYearArray.append(muviMovie.find('li',{'class':'mv-releasedate'}).find('p').text[-4:])
            muviComingSoonReleaseDateArray.append([muviMovie.find('li',{'class':'mv-releasedate'}).find('p').text])
    except:
        muviComingSoonYearArray.append('')
        muviComingSoonReleaseDateArray.append([])
    


# In[20]:


#API link:https://rapidapi.com/apidojo/api/imdb8/
import http.client

conn = http.client.HTTPSConnection("imdb8.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "imdb8.p.rapidapi.com",
    'x-rapidapi-key': "3f097351admshf9b39c39f3e8262p1babdbjsn813ed48ba661"
    }


muviComingSoonMovieIdsArray=[]
index=0
for title in muviComingSoonTitleArray:
    
    #If the movie is arabic don't get imdb id
    if muviComingSoonLanguageArray[index]=="Arabic":
        print(title)
        muviComingSoonMovieIdsArray.append('')
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
        if muviComingSoonYearArray[index]==str(jsonResponse['results'][0]['year']):
            muviComingSoonMovieIdsArray.append(imdbID)
        else:
            muviComingSoonMovieIdsArray.append('')
        
    except:
        muviComingSoonMovieIdsArray.append('')


# In[21]:


muviComingSoonDf = pd.DataFrame(columns=['cinema','imdbID','title','year','release date','genres', 'movieLength',
              'ageGuide','plot', 'language','actors','director','writer','poster', 'trailer'])
muviComingSoonDf


# In[22]:


index=0
for imdbID in muviComingSoonMovieIdsArray:
    print(index)
    if imdbID=='':
        Movierow = {'cinema':'muvi','imdbID':imdbID,'title':muviComingSoonTitleArray[index],'year':muviComingSoonYearArray[index],
                    'release date':muviComingSoonReleaseDateArray[index],'genres':muviComingSoonGenreArray[index], 
                'movieLength':muviComingSoonDurationArray[index],
                'ageGuide':muviComingSoonAgeGuideArray[index],'plot':muviComingSoonDescriptionArray[index], 
                'language':muviComingSoonLanguageArray[index],'actors':muviComingSoonActorArray[index],
                    'director':muviComingSoonDirectorArray[index],
                'writer':[],'poster':muviComingSoonImgArray[index],'trailer':''}
        print(Movierow)
        muviComingSoonDf = muviComingSoonDf.append(Movierow, ignore_index = True)
        index=index+1
        continue
    response = requests.get("https://www.imdb.com/title/"+imdbID)
    soup = BeautifulSoup(response.text, 'html.parser')
    #1-Title
    title=muviComingSoonTitleArray[index]

    #2-Year
    try:
        year=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[0].a.text
    except:
        year=muviComingSoonYearArray[index]
        print('except:year')
    
    #Release date
    release_date=muviComingSoonReleaseDateArray[index]
        
    #3-Genres
    try:
        Genres=soup.find('li',{'data-testid':'storyline-genres'}).find('ul')
        GenresList=[]
        for Genre in Genres:
            GenresList.append(Genre.text)
    except:
        GenresList=muviComingSoonGenreArray[index]
        print('except:GenresList')
        
    #4-Movie Length
    try:
        movieLength=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[2].text
        movieLength=movieLength.replace('m','min')
    except:
        movieLength=muviComingSoonDurationArray[index]
        print('except:movieLength')
        
    #6-Age Guide
    try:
        ageGuide=soup.find('div',{'class':'TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr'}).find('ul').find_all('li')[1].a.text
    except:
        ageGuide=muviComingSoonAgeGuideArray[index]
        print('except:ageGuide')
        
    #7-Plot
    try:
        plot=soup.find('div',{'class':'Storyline__StorylineWrapper-sc-1b58ttw-0 iywpty'}).find('div').find('div').find('div').text
        try:
            plot=plot.split(' ???')[0]
        except:
            print('')
    except:
        plot=muviComingSoonDescriptionArray[index]
        print('except:plot')
        
    #8-Language
    if muviComingSoonLanguageArray[index]!='':
        languageList=[muviComingSoonLanguageArray[index]]
        
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
            languageList=''
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
        castList=muviComingSoonActorArray[index]
        print('except:castList')
    #10-Directors
    try:
        directors=soup.find('section',{'data-testid':'title-cast'}).find('ul',{'class':'ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content base'})
        directorsList=[]
        for director in directors:
            directorsList.append(director.text)
    except:
        directorsList=muviComingSoonDirectorArray[index]
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
        poster=muviComingSoonImgArray[index]
        print('except:poster')
        


    Movierow = {'cinema':'muvi','imdbID':imdbID,'title':title,'year':year,'release date':release_date,'genres':GenresList, 
                'movieLength':movieLength,
                'ageGuide':ageGuide,'plot':plot, 'language':languageList,'actors':castList,'director':directorsList,
                'writer':writersList,'poster':poster,'trailer':''}
    print(Movierow)
    muviComingSoonDf = muviComingSoonDf.append(Movierow, ignore_index = True)
    index=index+1


# In[23]:


muviComingSoonDf


# In[ ]:





# # Rename & combine movies

# In[24]:


#If there is two languages for the same movie
dupliactesTitle=list(voxComingSoonDf[voxComingSoonDf.duplicated(['title'])]['title'])
duplicatedDF=voxComingSoonDf[voxComingSoonDf.duplicated(subset='title',keep='first')]
for index,row in duplicatedDF.iterrows():
    print(row['title']+" ("+row['language'][0]+")")
    duplicatedDF.loc[index,'title']=row['title']+" ("+row['language'][0]+")"


# In[25]:


voxComingSoonDf=voxComingSoonDf.drop_duplicates(subset='title',keep='first')
voxComingSoonDf


# In[26]:


voxComingSoonDf=voxComingSoonDf.append(duplicatedDF)
voxComingSoonDf


# In[27]:


muviComingSoonDf2=muviComingSoonDf


# In[28]:


for index,row in muviComingSoonDf2.iterrows():
    title=re.sub("([\(\[]).*?([\)\]])", "\g<1>\g<2>", row['title']).strip()
    muviComingSoonDf2.loc[index,'title']=title.replace("()","").strip()


# In[29]:


#If there is two languages for the same movie
dupliactesTitle=list(muviComingSoonDf2[muviComingSoonDf2.duplicated(['title'])]['title'])
duplicatedDF=muviComingSoonDf2[muviComingSoonDf2.duplicated(subset='title',keep='first')]
for index,row in duplicatedDF.iterrows():
    print(row['title']+" ("+row['language'][0]+")")
    duplicatedDF.loc[index,'title']=row['title']+" ("+row['language'][0]+")"


# In[30]:


muviComingSoonDf=muviComingSoonDf2.drop_duplicates(subset='title',keep='first')
muviComingSoonDf


# In[31]:


muviComingSoonDf=muviComingSoonDf.append(duplicatedDF)
muviComingSoonDf


# In[32]:


for index,row in muviComingSoonDf.iterrows():
    if "(AR)" in row['title']:
        muviComingSoonDf.loc[index,'title']=row['title'].replace("(AR)","(Arabic)")
    if "(EN)" in row['title']:
        muviComingSoonDf.loc[index,'title']=row['title'].replace("(EN)","(English)")


# In[33]:


from difflib import SequenceMatcher


# In[210]:


AllDfs=voxComingSoonDf.append(amcComingSoonDf).append(muviComingSoonDf).reset_index()
AllDfs


# In[211]:


title=''
for index, row in AllDfs.iterrows():
    for index2, row2 in AllDfs.iterrows():   
        if row2['title'].strip()==row['title'].strip():
                break
        similarity=SequenceMatcher(None, row['title'].strip(),row2['title'].strip()).ratio()
        if (similarity>=0.55) & (similarity!=1):
            AllDfs.loc[index2,'title']=row['title']
    


# In[212]:


AllDfs.reset_index()


# In[213]:


print (AllDfs.groupby('title')['cinema'].apply(' '.join).reset_index())


# In[214]:


cinemaDF = AllDfs.groupby("title").agg(list)
cinemaDF


# In[215]:


#Get trailers
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
    print(counter)
    AllDfs.loc[index,['trialer']]=trailer
        
        


# In[216]:


AllDfs


# In[217]:


cinemaDF


# # DB

# In[218]:


#Connect to DB
import pandas.io.sql as sqlio
import psycopg2
conn = psycopg2.connect(host="localhost",database="filmey",user="postgres",password="pgAdmin123")
cursor = conn.cursor()


# In[219]:


#Add new genres to DB
movieDB=sqlio.read_sql_query('SELECT movie_id FROM "Movie"',conn)


# In[221]:


allComingSoonMoviesDf=AllDfs


# In[222]:


allComingSoonMoviesDf=AllDfs.drop_duplicates(subset="title",keep="first")


# In[223]:


#get movie_id of coming soon movies
isComingSoonID=sqlio.read_sql_query('SELECT movie_id FROM "Movie" WHERE is_coming_soon=true',conn)
isComingSoonID


# In[224]:


#Delete coming soon movies from movie table
for index, row in isComingSoonID.iterrows():
    cursor.execute('DELETE FROM "Movie" WHERE movie_id=%s',[int(row['movie_id'])] )
    conn.commit()


# In[225]:


#Delete coming soon movies from Coming_soon table
for index, row in isComingSoonID.iterrows():
    cursor.execute('DELETE FROM "Coming_soon" WHERE movie_id=%s',[int(row['movie_id'])] )
    conn.commit()


# In[226]:


#Get new movie ids
movieDB=sqlio.read_sql_query('SELECT movie_id FROM "Movie"',conn)
movie_id=list(movieDB['movie_id'])
newMovieID=max(movie_id)+1


# In[240]:


cinemaDF


# In[237]:


df = allComingSoonMoviesDf.reset_index()
newMovieIDArray=[]
for index, row in df.iterrows():
    newMovieIDArray.append(newMovieID)
    newMovieID=newMovieID+1
    
df['movie_id']=newMovieIDArray


# In[243]:


cinemaDF=pd.merge(cinemaDF,df , on='title')[['cinema_x','release date_x','movie_id']]


# In[244]:


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


# In[245]:


movieDF


# In[246]:


#Insert Movie
for index, row in movieDF.iterrows():
    cursor.execute('INSERT INTO "Movie" (movie_id, title,year,length,age_guide,description,poster,trailer_url,is_coming_soon) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)' 
                   ,[int(row['movie_id']),str(row['title']),row['year'],str(row['length'])
                    ,str(row['age_guide']),row['description'],str(row['poster']),str(row['trailer_url']),True] )
    conn.commit()


# In[247]:


#Create genredf with coming soon movie_id and genre
genredf=df[['movie_id','genres']]
genreList = genredf.apply(lambda x: pd.Series(x['genres']), axis=1).stack().reset_index(level=1, drop=True)
genreList.name = 'genres'
genredf = genredf.drop('genres', axis=1).join(genreList)
genredf['genres'] = pd.Series(genredf['genres'], dtype=object)
genredf=genredf.rename(columns={"genres":"genre"})
genredf


# In[248]:


cursor.execute('SELECT * FROM "Genre"')
genreDB = pd.DataFrame(cursor.fetchall(),columns=['genre_id','genre'])
genreDB


# In[249]:


#New genres that are not in DB
newGenres=list(set(genredf['genre'].unique()).difference(genreDB['genre']))
newGenres


# In[250]:


#Add new genres to DB
genreDB=sqlio.read_sql_query('SELECT genre_id FROM "Genre"',conn)
genre_id=list(genreDB['genre_id'])
newID=max(genre_id)+1
for genre in newGenres:
    cursor.execute('INSERT INTO "Genre" (genre_id, genre) VALUES(%s, %s)' ,[newID,genre] )
    newID=newID+1


# In[251]:


cursor.execute('SELECT * FROM "Genre"')
genreDB = pd.DataFrame(cursor.fetchall(),columns=['genre_id','genre'])
genreDB


# In[252]:


#Mapping genre with id
Movie_Genre = pd.merge(genredf, genreDB ,on='genre')
Movie_Genre = Movie_Genre[['movie_id' ,'genre_id']]
Movie_Genre = Movie_Genre.sort_values(by =['movie_id'])
Movie_Genre


# In[253]:


Movie_Genre


# In[254]:


#Insert Movie_Genre
for index, row in Movie_Genre.iterrows():
    cursor.execute('INSERT INTO "Movie_Genre" (movie_id, genre_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['genre_id'])] )
    conn.commit()


# In[255]:


#Get directors from DB
cursor.execute('SELECT * FROM "Director"')
directorDB = pd.DataFrame(cursor.fetchall(),columns=['director_id','director'])
directorDB


# In[256]:


#Create directordf with coming soon movie_id and director
directordf=df[['movie_id','director']]
directorList = directordf.apply(lambda x: pd.Series(x['director']), axis=1).stack().reset_index(level=1, drop=True)
directorList.name = 'director'
directordf = directordf.drop('director', axis=1).join(directorList)
directordf['director'] = pd.Series(directordf['director'], dtype=object)
directordf=directordf.dropna(axis = 0, how ='any')
directordf=directordf.drop_duplicates()
directordf


# In[257]:


#New directors that are not in DB
newDirectors=list(set(directordf['director'].unique()).difference(directorDB['director']))
newDirectors


# In[258]:


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
    


# In[259]:


newDirectorIDArray


# In[260]:


#Check if added
cursor.execute('SELECT * FROM "Director"')
directorDB = pd.DataFrame(cursor.fetchall(),columns=['director_id','director'])
directorDB


# In[261]:


#Create Movie_Director for coming soon movies
Movie_Director = pd.merge(directordf, directorDB ,on='director')
Movie_Director = Movie_Director[['movie_id' ,'director_id']]
Movie_Director = Movie_Director.sort_values(by =['movie_id'])
Movie_Director


# In[262]:


#Insert Movie_Director
for index, row in Movie_Director.iterrows():
    cursor.execute('INSERT INTO "Movie_Director" (movie_id, director_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['director_id'])] )
    conn.commit()


# In[263]:


#Get writer from DB
cursor.execute('SELECT * FROM "Writer"')
writerDB = pd.DataFrame(cursor.fetchall(),columns=['writer_id','writer'])
writerDB


# In[264]:


#Create writerdf with coming soon movie_id and writer
writerdf=df[['movie_id','writer']]
writerList = writerdf.apply(lambda x: pd.Series(x['writer']), axis=1).stack().reset_index(level=1, drop=True)
writerList.name = 'writer'
writerdf = writerdf.drop('writer', axis=1).join(writerList)
writerdf['writer'] = pd.Series(writerdf['writer'], dtype=object)
writerdf=writerdf.dropna(axis = 0, how ='any').drop_duplicates()
print(writerdf)

#Remove paranthesis and its content
p = re.compile(r'\([^)]*\)')
newWriter=[]
for index, row in writerdf.iterrows():
    newWriter.append(re.sub(p, '', row['writer']))
    
writerdf['writer']=newWriter
writerdf


# In[265]:


#New writer that are not in DB
newWriters=list(set(writerdf['writer'].unique()).difference(writerDB['writer']))
newWriters


# In[266]:


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


# In[267]:


newWriterIDArray


# In[268]:


#Check if added
cursor.execute('SELECT * FROM "Writer"')
writerDB = pd.DataFrame(cursor.fetchall(),columns=['writer_id','writer'])
writerDB


# In[269]:


#Create Movie_Writer for coming soon movies
Movie_Writer = pd.merge(writerdf, writerDB ,on='writer')
Movie_Writer = Movie_Writer[['movie_id' ,'writer_id']]
Movie_Writer = Movie_Writer.sort_values(by =['movie_id'])
Movie_Writer


# In[270]:


#Insert Movie_Writer
for index, row in Movie_Writer.iterrows():
    cursor.execute('INSERT INTO "Movie_Writer" (movie_id, writer_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['writer_id'])] )
    conn.commit()


# In[271]:


#Get languages from DB
cursor.execute('SELECT * FROM "Language"')
languageDB = pd.DataFrame(cursor.fetchall(),columns=['language_id','language'])
languageDB


# In[272]:


#Create languagedf with coming soon movie_id and langauge
languagedf=df[['movie_id','language']]
languageList = languagedf.apply(lambda x: pd.Series(x['language']), axis=1).stack().reset_index(level=1, drop=True)
languageList.name = 'language'
languagedf = languagedf.drop('language', axis=1).join(languageList)
languagedf['language'] = pd.Series(languagedf['language'], dtype=object)
languagedf=languagedf.dropna(axis = 0, how ='any')
languagedf.drop_duplicates()


# In[273]:


#New langauge that are not in DB
newLanguages=list(set(languagedf['language'].unique()).difference(languageDB['language']))
newLanguages


# In[274]:


#Clean new languages

missplacedGenresInLanguages=list(set(newLanguages) & set(genreDB['genre']))
newLanguages = [e for e in newLanguages if e not in (missplacedGenresInLanguages)]
newLanguages


# In[275]:


#Add new language to DB
languageDB=sqlio.read_sql_query('SELECT language_id FROM "Language"',conn)
languageDB=list(languageDB['language_id'])
newLanguageID=max(languageDB)+1
for language in newLanguages:
    cursor.execute('INSERT INTO "Language" (language_id, language) VALUES(%s, %s)' ,[newLanguageID,language] )
    newLanguageID=newLanguageID+1
    conn.commit()


# In[276]:


#Check if added
cursor.execute('SELECT * FROM "Language"')
languageDB = pd.DataFrame(cursor.fetchall(),columns=['language_id','language'])
languageDB


# In[277]:


#Create Movie_Language for coming soon movies
Movie_Language = pd.merge(languagedf, languageDB ,on='language')
Movie_Language = Movie_Language[['movie_id' ,'language_id']]
Movie_Language = Movie_Language.sort_values(by =['movie_id'])
Movie_Language


# In[278]:


#Insert Movie_Language
for index, row in Movie_Language.iterrows():
    cursor.execute('INSERT INTO "Movie_Language" (movie_id, language_id) VALUES(%s, %s)' ,[int(row['movie_id']),int(row['language_id'])] )
    conn.commit()


# In[279]:


#Get actors from DB
cursor.execute('SELECT * FROM "Actor"')
actorDB = pd.DataFrame(cursor.fetchall(),columns=['actor_id','actor','actor_image_url'])
actorDB


# In[280]:


#Covert list to list to row
actordf=df[['movie_id','actors']]
s = actordf.apply(lambda x: pd.Series(x['actors']), axis=1).stack().reset_index(level=1, drop=True)
s.name = 'actors'
actordf = actordf.drop('actors', axis=1).join(s)
actordf['actors'] = pd.Series(actordf['actors'], dtype=object)
actordf
# actordf.drop_duplicates()


# In[281]:


#Split list to columns and add movie_id
actordf_afterSplit = pd.DataFrame(actordf['actors'].tolist(), columns=['actor', 'role', 'actor_image_url'])
actordf_afterSplit.insert(loc=0, column='movie_id', value=list(actordf['movie_id']))
actordf_afterSplit=actordf_afterSplit.dropna()
actordf_afterSplit


# In[282]:


#New actors that are not in DB
newActors=list(set(actordf_afterSplit['actor'].unique()).difference(actorDB['actor']))
newActorsdf=actordf_afterSplit[(~actordf_afterSplit.actor.isin(actorDB.actor))]


# In[283]:


#Add new Actor to DB
actorDB=sqlio.read_sql_query('SELECT actor_id FROM "Actor"',conn)
actorDB=list(actorDB['actor_id'])
newActorID=max(actorDB)+1
for index, row in newActorsdf.iterrows():
    cursor.execute('INSERT INTO "Actor" (actor_id, actor, actor_image_url) VALUES(%s, %s , %s)' ,[newActorID,row['actor'],row['actor_image_url']] )
    newActorID=newActorID+1
    conn.commit()
    


# In[284]:


#Check if added
cursor.execute('SELECT * FROM "Actor"')
actorDB = pd.DataFrame(cursor.fetchall())
actorDB=actorDB.rename(columns={0: "actor_id", 1: "actor",2:'actor_image_url'})
actorDB


# In[285]:


#Get roles from DB
cursor.execute('SELECT * FROM "Role"')
roleDB = pd.DataFrame(cursor.fetchall(),columns=['movie_id','actor_id','role'])
roleDB


# In[286]:


#Mapping Actor with id

roledf = pd.merge(actordf_afterSplit, actorDB,on=['actor' , 'actor_image_url'], how='left')
roledf = roledf.sort_values(by =['movie_id'])

#Drop actors without roles

roledf = roledf[['movie_id' ,'actor_id' , 'role']].dropna()
roledf=roledf[roledf['role'] != '']


# In[287]:


#Insert Role
for index, row in roledf.iterrows():
    cursor.execute('INSERT INTO "Role" (movie_id, actor_id,role) VALUES(%s, %s, %s)' ,[int(row['movie_id']),int(row['actor_id']), row['role']] )
    conn.commit()


# In[299]:


cinemaDF=cinemaDF.rename(columns = {'cinema_x':'cinema','release date_x':'release date'}) 


# In[300]:


cinemaDF


# In[301]:


#Create cinemadf with coming soon movie_id and cinema
cinemadf=cinemaDF[['movie_id','cinema']]
cinemaList = cinemadf.apply(lambda x: pd.Series(x['cinema']), axis=1).stack().reset_index(level=1, drop=True)
cinemaList.name = 'cinema'
cinemadf = cinemadf.drop('cinema', axis=1).join(cinemaList)
cinemadf['cinema'] = pd.Series(cinemadf['cinema'], dtype=object)
cinemaList = cinemadf.apply(lambda x: pd.Series(x['cinema']), axis=1).stack().reset_index(level=1, drop=True)
cinemaList.name = 'cinema'
cinemadf = cinemadf.drop('cinema', axis=1).join(cinemaList)
cinemadf['cinema'] = pd.Series(cinemadf['cinema'], dtype=object)
# cinemadf=cinemadf.drop_duplicates()
cinemadf


# In[302]:


#Create cinema ids
cinema_idList=range(1, cinemadf[cinemadf.columns[0]].count()+1)
cinema_idList


# In[303]:


cinemadf['coming_soon_id']=cinema_idList


# In[305]:


#Create coming soon table with coming soon movie_id and release date
release_datedf=cinemaDF[['movie_id','release date']]
release_datedList = release_datedf.apply(lambda x: pd.Series(x['release date']), axis=1).stack().reset_index(level=1, drop=True)
release_datedList.name = 'release date'
release_datedf = release_datedf.drop('release date', axis=1).join(release_datedList)
release_datedf['release date'] = pd.Series(release_datedf['release date'], dtype=object)

release_datedList = release_datedf.apply(lambda x: pd.Series(x['release date']), axis=1).stack().reset_index(level=1, drop=True)
release_datedList.name = 'release date'
release_datedf = release_datedf.drop('release date', axis=1).join(release_datedList)
release_datedf['release date'] = pd.Series(release_datedf['release date'], dtype=object)

release_datedf


# In[306]:


for index, row in release_datedf.iterrows():
    if isinstance(row['release date'], list):
        print(row['release date'][0])
        release_datedf.loc[index,['release date']]=row['release date'][0]


# In[307]:


release_datedf


# In[308]:


release_datedf['coming_soon_id']=cinema_idList


# In[309]:


#Merge release_datedf with cinemadf
Movie_Cinema = pd.merge(cinemadf, release_datedf ,on=['coming_soon_id','movie_id'])
Movie_Cinema=Movie_Cinema.drop_duplicates(subset=['movie_id',"cinema"])
Movie_Cinema=Movie_Cinema.reset_index()
#Create cinema ids
cinema_idList=range(1, Movie_Cinema[Movie_Cinema.columns[0]].count()+1)
Movie_Cinema['coming_soon_id']=cinema_idList
Movie_Cinema


# In[310]:


from datetime import datetime


# In[311]:


#Convert release date to db format
for index, row in Movie_Cinema.iterrows():
    if isinstance(row['release date'], list):
        date=row['release date'][0]
    else:
        date=row['release date']  
    try:
        print(date)
        date=datetime.strptime(date, '%d %B %Y')
    except:
        try:
            date=datetime.strptime(date, '%b %d, %Y')
        except:
            date=datetime.strptime(date, '%d %b %Y')
    Movie_Cinema.loc[index,'release date']=date
    
            


# In[313]:


Movie_Cinema=Movie_Cinema.drop_duplicates(subset=['movie_id','cinema','release date'])
Movie_Cinema


# In[314]:


#Insert to Coming_soon DB
for index, row in Movie_Cinema.iterrows():
    cursor.execute('INSERT INTO "Coming_soon" (coming_soon_id, movie_id,cinema_name,release_date) VALUES(%s, %s, %s, %s)' ,[int(row['coming_soon_id']),int(row['movie_id']), row['cinema'], row['release date']] )
    conn.commit()


# In[ ]:




