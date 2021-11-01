
// const bcrypt = require("bcrypt");
// const Knex = require("knex");

// const tableNames = {
//   User: "User",
//   Movie: "Movie",
//   Admin: "Admin",
//   Actor: "Actor",
//   Writer: "Writer",
//   Director: "Director",
//   Language: "Language",
//   Genre: "Genre",
//   Review: "Review",
//   Rating: "Rating",
//   User_Genre: "User_Genre",
//   Role: "Role",
//   Movie_Writer: "Movie_Writer",
//   Movie_Director: "Movie_Director",
//   Movie_Language: "Movie_Language",
//   Movie_Genre: "Movie_Genre"

// };

// async function insertEntry(knex, table, entry) {
//   const [created] = await knex(table).insert(entry).returning("*");
//   console.log(`added to table ${table} entry: `, entry);
//   return created;
// }


// exports.seed = async (knex) => {


//   // Deletes ALL existing entries
//   await Promise.all(
//     Object.keys(tableNames)
//       .reverse()
//       .map(async (name) => {
//         await knex(name).del();
//       })
//   );



// /////////// Inserts seed entries////////


// //Create User
//   const user = {
//     email: "nouf@hotmail.com",
//     username: "Nouf ALduraibi",
//     password: await bcrypt.hash("nouf123", 12),
//     date_of_birth: '2000-01-01',
//     gender: 'F',
//     location:"Riyadh"
//   };
//   const createdUser = await insertEntry(knex, tableNames.User, user);

// //Create Movie
//   const movie = {
//     imdb_id: 114709,
//     title: "Toy Story",
//     year: 1995,
//     length: '1h 21min',
//     age_guide: 'G',
//     description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/tN1A2mVnrOM"
//   };
//   const createdMovie = await insertEntry(knex, tableNames.Movie, movie);



//   //Create Admin
//   const admin = {
//     username: 114709,
//     password: await bcrypt.hash("nadmin123", 12),
//   };
//   const createdAdmin = await insertEntry(knex, tableNames.Admin, admin);


//   //Create Genre
//   const genres = [
//     { genre_id: 1, genre: "Animation" },
//     { genre_id: 2, genre: "Comedy" },
//     { genre_id: 3, genre: "Family" },
//   ];
//   await Promise.all(
//     genres.map(async (genre) => {
//       await insertEntry(knex, tableNames.Genre, genre);
//     })
//   );

//   //Create Language
//   const Languages = [
//     { language_id: 1, language: "English" },
//     { language_id: 2, language: "French" }
//   ];
//   await Promise.all(
//     Languages.map(async (language) => {
//       await insertEntry(knex, tableNames.Language ,  language);
//     })
//   );


//   // Create Director
//   const director = {
//     director: 'John Lasseter',
//   };
//   const createdDirector = await insertEntry(knex, tableNames.Director, director);


//   // Create Writer
//   const writer = {
//     writer: 'John Lasseter(original story by)',
//   };
//   const createdWriter = await insertEntry(knex, tableNames.Writer, writer);


//   // Create Actor
//   const actor = {
//     actor: 'JTom Hanks',
//     actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg"
//   };
//   const createdActor = await insertEntry(knex, tableNames.Actor, actor);
 


//   // Create Movie_Genre
//   const movieGenre = {
//     movie_id: createdMovie.movie_id,
//     genre_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Genre, movieGenre);


//  // Create Movie_Language
//   const movieLanguage = {
//     movie_id: createdMovie.movie_id,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage);


//  // Create Movie_Director
//   const movieDirector = {
//     movie_id: createdMovie.movie_id,
//     director_id: createdDirector.director_id,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector);


//   // Create Movie_Writer
//   const movieWriter = {
//     movie_id: createdMovie.movie_id,
//     writer_id: createdWriter.writer_id,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter);



//   // Create Role
//   const role = {
//     movie_id: createdMovie.movie_id,
//     actor_id: createdActor.actor_id,
//     role: "Woody"
//   };
//   await insertEntry(knex, tableNames.Role, role);


//     // Create User_Genre
//     const userGenre = {
//       user_id: createdUser.user_id,
//       genre_id: 2,
//     };
//     await insertEntry(knex, tableNames.User_Genre, userGenre);


//     // Create Rating
//   const rating = {
//     movie_id: createdMovie.movie_id,
//     user_id: createdUser.user_id,
//     rating: 3.6
//   };
//   await insertEntry(knex, tableNames.Rating, rating);


//   // Create Review
//     const review = {
//       movie_id: createdMovie.movie_id,
//       user_id: createdUser.user_id,
//       review: "Good movie"
//     };
//     await insertEntry(knex, tableNames.Review, review);
// };




const bcrypt = require("bcrypt");
const Knex = require("knex");

const tableNames = {

  Movie: "Movie"

};

async function insertEntry(knex, table, entry) {
  const [created] = await knex(table).insert(entry).returning("*");
  console.log(`added to table ${table} entry: `, entry);
  return created;
}


exports.seed = async (knex) => {


  // Deletes ALL existing entries
  await Promise.all(
    Object.keys(tableNames)
      .reverse()
      .map(async (name) => {
        await knex(name).del();
      })
  );



/////////// Inserts seed entries////////


// //Create User
//   const user = {
//     email: "nouf@hotmail.com",
//     username: "Nouf ALduraibi",
//     password: await bcrypt.hash("nouf123", 12),
//     date_of_birth: '2000-01-01',
//     gender: 'F',
//     location:"Riyadh"
//   };
//   const createdUser = await insertEntry(knex, tableNames.User, user);

// //Create Movie
//   const movie = {
//     imdb_id: 114709,
//     title: "Toy Story",
//     year: 1995,
//     length: '1h 21min',
//     age_guide: 'G',
//     description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/tN1A2mVnrOM"
//   };
//   const createdMovie = await insertEntry(knex, tableNames.Movie, movie);



  //Create Admin
  const movie = {
    title: 114709,
    imdbId: await bcrypt.hash("nadmin123", 12),
  };
  const createdAdmin = await insertEntry(knex, tableNames.Movie, movie);


//   //Create Genre
//   const genres = [
//     { genre_id: 1, genre: "Animation" },
//     { genre_id: 2, genre: "Comedy" },
//     { genre_id: 3, genre: "Family" },
//   ];
//   await Promise.all(
//     genres.map(async (genre) => {
//       await insertEntry(knex, tableNames.Genre, genre);
//     })
//   );

//   //Create Language
//   const Languages = [
//     { language_id: 1, language: "English" },
//     { language_id: 2, language: "French" }
//   ];
//   await Promise.all(
//     Languages.map(async (language) => {
//       await insertEntry(knex, tableNames.Language ,  language);
//     })
//   );


//   // Create Director
//   const director = {
//     director: 'John Lasseter',
//   };
//   const createdDirector = await insertEntry(knex, tableNames.Director, director);


//   // Create Writer
//   const writer = {
//     writer: 'John Lasseter(original story by)',
//   };
//   const createdWriter = await insertEntry(knex, tableNames.Writer, writer);


//   // Create Actor
//   const actor = {
//     actor: 'JTom Hanks',
//     actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg"
//   };
//   const createdActor = await insertEntry(knex, tableNames.Actor, actor);
 


//   // Create Movie_Genre
//   const movieGenre = {
//     movie_id: createdMovie.movie_id,
//     genre_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Genre, movieGenre);


//  // Create Movie_Language
//   const movieLanguage = {
//     movie_id: createdMovie.movie_id,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage);


//  // Create Movie_Director
//   const movieDirector = {
//     movie_id: createdMovie.movie_id,
//     director_id: createdDirector.director_id,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector);


//   // Create Movie_Writer
//   const movieWriter = {
//     movie_id: createdMovie.movie_id,
//     writer_id: createdWriter.writer_id,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter);



//   // Create Role
//   const role = {
//     movie_id: createdMovie.movie_id,
//     actor_id: createdActor.actor_id,
//     role: "Woody"
//   };
//   await insertEntry(knex, tableNames.Role, role);


//     // Create User_Genre
//     const userGenre = {
//       user_id: createdUser.user_id,
//       genre_id: 2,
//     };
//     await insertEntry(knex, tableNames.User_Genre, userGenre);


//     // Create Rating
//   const rating = {
//     movie_id: createdMovie.movie_id,
//     user_id: createdUser.user_id,
//     rating: 3.6
//   };
//   await insertEntry(knex, tableNames.Rating, rating);


//   // Create Review
//     const review = {
//       movie_id: createdMovie.movie_id,
//       user_id: createdUser.user_id,
//       review: "Good movie"
//     };
//     await insertEntry(knex, tableNames.Review, review);
};

