const db = require("../../db/db");

// const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");
module.exports = {
  async get(movie_id) {
    return db("Movie").select("*").where({
      movie_id: movie_id,
    });
  },
  async getGenre(movie_id) {
    return db("Movie_Genre")
      .select("genre")
      .innerJoin("Genre", "Movie_Genre.genre_id", "Genre.genre_id")
      .where({
        movie_id: movie_id,
      });
  },

  async getDirectors(movie_id) {
    return db("Movie_Director")
      .select("director")
      .innerJoin(
        "Director",
        "Movie_Director.director_id",
        "Director.director_id"
      )
      .where({
        movie_id: movie_id,
      });
  },

  async getWriters(movie_id) {
    return db("Movie_Writer")
      .select("writer")
      .innerJoin("Writer", "Movie_Writer.writer_id", "Writer.writer_id")
      .where({
        movie_id: movie_id,
      });
  },

  async getLanguages(movie_id) {
    return db("Movie_Language")
      .select("language")
      .innerJoin(
        "Language",
        "Movie_Language.language_id",
        "Language.language_id"
      )
      .where({
        movie_id: movie_id,
      });
  },

  async getCasts(movie_id) {
    return db("Role")
      .select("actor", "actor_image_url", "role")
      .innerJoin("Actor", "Role.actor_id", "Actor.actor_id")
      .where({
        movie_id: movie_id,
      });
  },

  async getTopMovies(numberofmovies) {
    return db("Movie")
      .select("movie_id" , "poster")
      .orderBy("movie_id", "asc")
      .limit(numberofmovies);
  },

  async getBasedOnGenre(genreType, limit) {

    // coalesce() to return the real value of "zero" for null columns
    
    return await db.select("MG.movie_id" , 'title' , 'poster',  db.raw("ROUND(AVG(coalesce(rating , 0)),1) AS total_rating"))
    .from("Movie_Genre AS MG")
    .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
    .where("G.genre", "=", genreType)
    .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
    .leftJoin("Rating AS R", "MG.movie_id", "R.movie_id")
    .groupBy("MG.movie_id" , 'title' , 'poster') 
    .orderBy("total_rating", 'desc' , {nulls: 'last'})
    .orderBy('MG.movie_id' , 'asc')
    // .havingRaw('total_rating > ?', [0])
    .limit(limit);

    
  },

  async getMovieReviews(movie_id) {
    return db("Review AS R")
      .select("review", "username")
      .where({
        movie_id: movie_id,
      })
      .leftJoin("User AS U", "R.user_id", "U.user_id")
      .orderBy("created_at" , "desc");
  },

  //   async addMovie(title, year, length , age_guide ,description, poster , trailer_url) {

  //  const [movie_id] = await db("Movie").select("movie_id").
  //     const [id] = await db("Movie")
  //     .insert({ title, year, length , age_guide ,description, poster , trailer_url })
  //     .returning("movie_id");

  //     return id ;
  //   },

  async getAllGenres() {
    return db("Genre").select("genre");
  },

  async getAllLanguages() {
    return db("Language").distinct("language");
  },

  async getAllAgeGuide() {
    return db("Movie").distinct("age_guide");
  },

  async getAllDirectors() {
    return db("Director").distinct("director");
  },

  async getAllWriters() {
    return db("Writer").distinct("writer");
  },

  async getAllActorss() {
    return db("Actor").distinct("actor");
  },

  async getAllRoles() {
    return db("Role").distinct("role");
  },

  async getRating(movie_id) {
    return db
      .select(
        "movie_id",
        db.raw("ROUND(AVG(rating),1) AS total_rating"),
        db.raw("COUNT(rating) AS total_users")
      )
      .from("Rating")
      .where({ movie_id: movie_id })
      .groupByRaw("movie_id");
  },

  async addMovie(title,genres,year,length,age_guide
    ,trailer_url,poster,description) {

      let CheckMovie = await db(tableNames.movie)
      .where({
        title: title,
        year:year,
      })
      .first()
      .returning("*");

      if(CheckMovie)
      {
        var message = { 'MovieMessage' : "This movie already exists"};

        return message;
      }
      
      let movie_id=await db.select("movie_id").from(tableNames.movie).orderBy('movie_id', 'desc').returning("*").pluck('movie_id');
      movie_id=movie_id[0]+1;

      var year1=Number(year);
      console.log(year1);
      console.log(movie_id);
    
      let movie= await db(tableNames.movie)
    .insert({
      movie_id:movie_id,
      title: title,
      year:year1,
      length:length,
      age_guide:age_guide,
      description:description,
      poster:poster,
      trailer_url:trailer_url,
     }).returning("*");

  if(movie){
    return movie[0].movie_id; 
  }
  return;
 },

 async addGenre(movie_id,genres) {

    //console.log(genres);
  var arrayofGenreID = new Array();
     for (const genre of genres)
    {
       //console.log(g);
      let genre_id= await db("Genre")
    .where({
      genre: genre,
    }).returning("*").pluck('genre_id');
   // console.log(genre_id[0]);
   arrayofGenreID.push(genre_id[0]);
    }

   //insert movie id with  genre id
    for (const id of arrayofGenreID)
    {
      let Movie_Genre= await db('Movie_Genre')
     .insert({
      movie_id: movie_id,
       genre_id: id,
     }).returning("*");
     console.log(Movie_Genre);}
return;
},

async addLanguage(movie_id,languages) {
var arrayofLanguageID = new Array();
   for (const language of languages)
  {
    let language_id= await db("Language")
  .where({
    language: language,
  }).returning("*").pluck('language_id');
 arrayofLanguageID.push(language_id[0]);
  }

 //insert movie id with  lanaguage id
  for (const id of arrayofLanguageID)
  {
    let Movie_Language= await db('Movie_Language')
   .insert({
    movie_id: movie_id,
     language_id: id,
   }).returning("*");
   console.log(Movie_Language);}
   
   return;
   },

async addDirector(movie_id,directors) {

  let newID=await db.select("director_id").from(tableNames.director).orderBy('director_id', 'desc').returning("*").pluck('director_id');
  newID=newID[0]+1;

  var arrayofDirectorsID = new Array();
     for (const director of directors)
    {
      console.log(director);
      let director_id= await db("Director")
    .where({
      director: director,
    }).returning("*").pluck('director_id');
    if(director_id[0])
    {
      arrayofDirectorsID.push(director_id[0]);
      console.log(director_id[0]);
    }
    
    else
    {
      director_id= await db('Director')
     .insert({
      director_id: newID,
      director: director,
     }).returning("*");
     newID=newID+1;
     console.log("director_id2");
     console.log(director_id);
     arrayofDirectorsID.push(director_id[0].director_id);
     //arrayofDirectorsID.push(director_id2[0]);
    }
    }
  
   //insert movie id with  lanaguage id
    for (const id of arrayofDirectorsID)
    {
      console.log(id);
      let Movie_Director= await db('Movie_Director')
     .insert({
      movie_id: movie_id,
      director_id: id,
     }).returning("*");
     console.log(Movie_Director);}
     return;
     },

  async addWriter(movie_id,writers) {

    let newID=await db.select("writer_id").from(tableNames.writer).orderBy('writer_id', 'desc').returning("*").pluck('writer_id');
    newID=newID[0]+1;

    var arrayofWritersID = new Array();
       for (const writer of writers)
      {
        let writer_id= await db("Writer")
       .where({
        writer: writer,
        }).returning("*").pluck('writer_id');
        if(writer_id[0])
        {
          arrayofWritersID.push(writer_id[0]);
        }
        if(!writer_id[0])
        {
          writer_id= await db('Writer')
         .insert({
          writer_id: newID,
          writer: writer,
         }).returning("*")
         newID=newID+1;
         console.log(writer_id);
         arrayofWritersID.push(writer_id[0].writer_id);
        }
        
        
      }
    
     //insert movie id with  lanaguage id
      for (const id of arrayofWritersID)
      {
        let Movie_Writer= await db('Movie_Writer')
       .insert({
        movie_id: movie_id,
        writer_id: id,
       }).returning("*");
     console.log(Movie_Writer);}
       return;
       },


       async getActorImage(actorName) {

        let CheckActor= await db(tableNames.actor)
      .where({
        actor: actorName,
      }).returning("*");
      //console.log(CheckActor);
      if(CheckActor[0]){

        let actorImage= await db(tableNames.actor)
      .where({
        actor: actorName,
      }).returning("*").pluck('actor_image_url');

      return actorImage[0];}
      else{
         var message = { 'NoActorImage' : "new actor no image"};
         return message 
      }
        
           },

       async addActor(movie_id,actorNames,actorRoles,actorImages) {

        let newID=await db.select("actor_id").from(tableNames.actor).orderBy('actor_id', 'desc').returning("*").pluck('actor_id');
        newID=newID[0]+1;

        var numOfActors=actorNames.length;

        var arrayofActorID = new Array();


        for(var i=0;i<numOfActors;i++)
        {
          let actor_id= await db(tableNames.actor)
           .where({
             actor: actorNames[i],
             }).returning("*").pluck('actor_id');
          if(actor_id[0])
          {
            let updateImage= await db(tableNames.actor)
            .update({
              actor_image_url:actorImages[i],
            }).where({
              actor_id: actor_id[0],
              }).returning("*");
            arrayofActorID.push(actor_id[0]);
          }
          else{
          actor_id= await db(tableNames.actor)
          .insert({
           actor_id: newID,
           actor: actorNames[i],
           actor_image_url:actorImages[i],
          }).returning("*");
          newID=newID+1;
          arrayofActorID.push(actor_id[0].actor_id);
        }
        }

        console.log(arrayofActorID);
        

         var rolesIndex=0;
          for (const id of arrayofActorID)
          {
            let Role= await db('Role')
           .insert({
            movie_id:movie_id,
            actor_id:id,
            role:actorRoles[rolesIndex],
           }).returning("*");
           rolesIndex=rolesIndex+1;
           console.log(Role);}
           return;
           },

  async deleteMovie(movie_id) {
    console.log(movie_id);
    let result= await db(tableNames.movie)
   .del().where({movie_id:movie_id});
  if(result){
    return result; 
  }
  return;
 },
    
};

