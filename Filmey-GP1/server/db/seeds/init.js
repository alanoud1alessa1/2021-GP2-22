
const bcrypt = require("bcrypt");
const Knex = require("knex");

const tableNames = {
  User: "User",
  Movie: "Movie",
  Admin: "Admin",
  Actor: "Actor",
  Writer: "Writer",
  Director: "Director",
  Language: "Language",
  Genre: "Genre",
  Review: "Review",
  Rating: "Rating",
  User_Genre: "User_Genre",
  Role: "Role",
  Movie_Writer: "Movie_Writer",
  Movie_Director: "Movie_Director",
  Movie_Language: "Movie_Language",
  Movie_Genre: "Movie_Genre"

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


//Create User
  const user = {
    email: "nouf@hotmail.com",
    username: "nouf",
    password: await bcrypt.hash("123", 12),
    date_of_birth: '2000-01-01',
    gender: 'F',
    location:"Riyadh"
  };
  const createdUser = await insertEntry(knex, "User", user);

  
  //Create Admin1
  const admin1 = {
    username: "admin1",
    password: await bcrypt.hash("111", 12),
  };
  const createdAdmin1 = await insertEntry(knex, "Admin", admin1);

  
  //Create Admin2
  const admin2 = {
    username: "admin2",
    password: await bcrypt.hash("222", 12),
  };
  const createdAdmin2 = await insertEntry(knex, "Admin", admin2);


  //Create Admin3
  const admin3 = {
    username: "admin3",
    password: await bcrypt.hash("333", 12),
  };
  const createdAdmin3 = await insertEntry(knex, "Admin", admin3);



// //Create Movie1
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
//   const createdMovie = await insertEntry(knex, "Movie", movie);



//   //Create Movie2
//   const movie2 = {
//     imdb_id: 113497,
//     title: "Jumanji",
//     year: 1995,
//     length: '1h 44min',
//     age_guide: 'G',
//     description: "Jumanji, one of the most unique--and dangerous--board games ever, falls into the hands of the curious teen, Alan Parrish, in 1969. Mysterious and magical, the game strands the unsuspecting boy in the lush, savage forests of a mythical realm. Nearly three decades later, the game releases him before the awed eyes of the young orphaned siblings, Judy and Peter Shepherd. Now, the wild and incessant beat of the jungle's tribal drums is calling for the now-adult Alan and the other hesitant players, as the one who rolls the dice must never leave undone what the roll has started. Has anyone ever escaped from the game and Jumanji's formidable foes?" ,
//     poster:"https://m.media-amazon.com/images/M/MV5BZTk2ZmUwYmEtNTcwZS00YmMyLWFkYjMtNTRmZDA3YWExMjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/eTjDsENDZ6s"
//   };
//   const createdMovie2 = await insertEntry(knex, "Movie", movie2);



//   //Create Movie3
//   const movie3 = {
//     imdb_id: 113228,
//     title: "Grumpier Old Men",
//     year: 1995,
//     length: '1h 41min',
//     age_guide: 'PG-13',
//     description: "Things don't seem to change much in Wabasha County: Max and John are still fighting after 35 years, Grandpa still drinks, smokes, and chases women , and nobody's been able to catch the fabled 'Catfish Hunter', a gigantic catfish that actually smiles at fishermen who try to snare it. Six months ago John married the new girl in town (Ariel), and people begin to suspect that Max might be missing something similar in his life. The only joy Max claims is left in his life is fishing, but that might change with the new owner of the bait shop." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BMjQxM2YyNjMtZjUxYy00OGYyLTg0MmQtNGE2YzNjYmUyZTY1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/rEnOoWs3FuA"
//   };
//   const createdMovie3 = await insertEntry(knex, "Movie", movie3);



//   //Create Movie4
//   const movie4 = {
//     imdb_id: 114885,
//     title: "Waiting to Exhale",
//     year: 1995,
//     length: '2h 4min',
//     age_guide: 'R',
//     description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BYzcyMDY2YWQtYWJhYy00OGQ2LTk4NzktYWJkNDYwZWJmY2RjXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/j9xml1CxgXI"
//   };
//   const createdMovie4 = await insertEntry(knex, "Movie", movie4);



//   //Create Movie5
//   const movie5 = {
//     imdb_id: 113041,
//     title: "Father of the Bride Part II",
//     year: 1995,
//     length: '1h 46min',
//     age_guide: 'G',
//     description: "In this sequel to 'Father of the Bride', George Banks must accept the reality of what his daughter's ascension from daughter to wife, and now, to mother means when placed into perspective against his own stage of life. As the comfortable family unit starts to unravel in his mind, a rapid progression into mid-life crisis is in his future. His journey to regain his youth acts as a catalyst for a kind of 'rebirth' of his attitude on life when he and his wife, Nina, find how their lives are about to change as well." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BOTEyNzg5NjYtNDU4OS00MWYxLWJhMTItYWU4NTkyNDBmM2Y0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/_Pv5qMpwrdU"
//   };
//   const createdMovie5 = await insertEntry(knex, "Movie", movie5);



//   //Create Movie6
//   const movie6 = {
//     imdb_id: 113277,
//     title: "Heat",
//     year: 1995,
//     length: '2h 50min',
//     age_guide: 'R18',
//     description: "Hunters and their prey--Neil and his professional criminal crew hunt to score big money targets (banks, vaults, armored cars) and are, in turn, hunted by Lt. Vincent Hanna and his team of cops in the Robbery/Homicide police division. A botched job puts Hanna onto their trail while they regroup and try to put together one last big 'retirement' score. Neil and Vincent are similar in many ways, including their troubled personal lives. At a crucial moment in his life, Neil disobeys the dictum taught to him long ago by his criminal mentor--'Never have anything in your life that you can't walk out on in thirty seconds flat, if you spot the heat coming around the corner'--as he falls in love. Thus the stage is set for the suspenseful ending....",
//     poster:"https://m.media-amazon.com/images/M/MV5BNGMwNzUwNjYtZWM5NS00YzMyLWI4NjAtNjM0ZDBiMzE1YWExXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg",
//     trailer_url: "hhttps://www.youtube.com/embed/14oNcFxiVaQ"
//   };
//   const createdMovie6 = await insertEntry(knex, "Movie", movie6);

  


//   //Create Movie7
//   const movie7 = {
//     imdb_id: 114319,
//     title: "Sabrina",
//     year: 1995,
//     length: '2h 7min',
//     age_guide: 'PG',
//     description: "While she was growing up, Sabrina Fairchild spent more time perched in a tree watching the Larrabee family than she ever did on solid ground. As the chauffeur's daughter on their lavish Long Island estate, Sabrina was invisible behind the branches, but she knew them all below - There is Maude Larrabee, the modern matriarch of the Larrabee Corporation; Linus Larrabee, the serious older son who expanded a successful family business into the world's largest communications company; and David, the handsome, fun-loving Larrabee, who was the center of Sabrina's world until she was shipped off to Paris. After two years on the staff of Vogue magazine, Sabrina has returned to the Larrabee estate but now she has blossomed into a beautiful and sophisticated woman. And she's standing in the way of a billion dollar deal." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BYjQ5ZjQ0YzQtOGY3My00MWVhLTgzNWItOTYwMTE5N2ZiMDUyXkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/iEqPw_QP28c"
//   };
//   const createdMovie7 = await insertEntry(knex, "Movie", movie7);

    


//   //Create Movie8
//   const movie8 = {
//     imdb_id: 112302,
//     title: "Tom and Huck",
//     year: 1995,
//     length: '1h 37min',
//     age_guide: 'PG',
//     description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BN2ZkZTMxOTAtMzg1Mi00M2U0LWE2NWItZDg4YmQyZjVkMDdhXkEyXkFqcGdeQXVyNTM5NzI0NDY@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/-C-xXZyX2zU"
//   };
//   const createdMovie8 = await insertEntry(knex, "Movie", movie8);

    


//   //Create Movie9
//   const movie9 = {
//     imdb_id: 114576,
//     title: "Sudden Death",
//     year: 1995,
//     length: '1h 51min',
//     age_guide: 'R',
//     description: "Darren McCord takes his two kids to a Pittsburgh Penguins National Hockey League play-off game, unknowing that the sports arena has been taken over by terrorists, who are holding the Vice President of the United States, as well as many other high-ranking officials hostage. Darren later becomes the only one who is aware of the situation. And, the stakes are raised when the terrorists announce that they will blow-up the building at the end of the game. Therefore, Darren must not only subdue the terrorists, but postpone the game and send it to overtime." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BN2NjYWE5NjMtODlmZC00MjJhLWFkZTktYTJlZTI4YjVkMGNmXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/SCOxEKkuWG4"
//   };
//   const createdMovie9 = await insertEntry(knex, "Movie", movie9);

    


//   //Create Movie10
//   const movie10 = {
//     imdb_id: 113189,
//     title: "GoldenEye",
//     year: 1995,
//     length: '2h 10min',
//     age_guide: 'PG',
//     description: "When a deadly satellite weapon system falls into the wrong hands, only Agent James Bond 007 (Pierce Brosnan) can save the world from certain disaster. Armed with his licence to kill, Bond races to Russia in search of the stolen access codes for 'GoldenEye', an awesome space weapon that can fire a devastating electromagnetic pulse toward Earth. But 007 is up against an enemy who anticipates his every move: a mastermind motivated by years of simmering hatred. Bond also squares off against Xenia Onatopp (Famke Janssen), an assassin who uses pleasure as her ultimate weapon." ,
//     poster:"https://m.media-amazon.com/images/M/MV5BMzk2OTg4MTk1NF5BMl5BanBnXkFtZTcwNjExNTgzNA@@._V1_.jpg",
//     trailer_url: "https://www.youtube.com/embed/mSBHbGduo5I"
//   };
//   const createdMovie10 = await insertEntry(knex, "Movie", movie10);






//   //Create Genre
//   const genres = [
//     { genre_id: 1, genre: "Animation" },
//     { genre_id: 2, genre: "Adventure" },
//     { genre_id: 3, genre: "Comedy" },
//     { genre_id: 4, genre: "Family" },
//     { genre_id: 5, genre: "Fantasy" },
//     { genre_id: 6, genre: "Romance" },
//     { genre_id: 7, genre: "Drama" },
//     { genre_id: 8, genre: "Crime" },
//     { genre_id: 9, genre: "Thriller" },
//     { genre_id: 10, genre: "Western" },

//   ];
//   await Promise.all(
//     genres.map(async (genre) => {
//       await insertEntry(knex, tableNames.Genre, genre);
//     })
//   );

// /////////////////////////

//   //Create Language
//   const Languages = [
//     { language_id: 1, language: "English" },
//     { language_id: 2, language: "French" },
//     { language_id: 3, language: "Italian" },
//     { language_id: 4, language: "German" },
//     { language_id: 5, language: "Spanish" },
//     { language_id: 6, language: "Russian" },
//   ];
//   await Promise.all(
//     Languages.map(async (language) => {
//       await insertEntry(knex, tableNames.Language ,  language);
//     })
//   );


//   // Create Director
//   const director = [
//     { director_id: 1, director: "John Lasseter" },
//     { director_id: 2, director: "Joe Johnston" },
//     { director_id: 3, director: "Howard Deutch" },
//     { director_id: 4, director: "Forest Whitaker" },
//     { director_id: 5, director: "Charles Shyer" },
//     { director_id: 6, director: "Michael Mann" },
//     { director_id: 7, director: "Sydney Pollack" },
//     { director_id: 8, director: "Peter Hewitt" },
//     { director_id: 9, director: "Peter Hyams" },
//     { director_id: 10, director: "Martin Campbell" }
//   ];

//   await Promise.all(
//     director.map(async (director) => {
//       await insertEntry(knex, tableNames.Director ,  director);
//     })
//   );

  
// // Create Writer
// const writer = [
//   { writer_id: 1,writer: 'John Lasseter(original story by)'},
//   { writer_id: 2, writer: 'Pete Docter(original story by)' },
//   { writer_id: 3, writer: 'Andrew Stanton(original story by) (screenplay by)'},
//   { writer_id: 4, writer: 'Jonathan Hensleigh(screenplay by)'},
//   { writer_id: 5, writer: 'Greg Taylor(screenplay by) (screen story by)'},
//   { writer_id: 6, writer: 'Jim Strain(screenplay by) (screen story by)'},
//   { writer_id: 7, writer: 'Mark Steven Johnson(characters)'},
//   { writer_id: 8, writer: 'Terry McMillan(novel) (screenplay)'},
//   { writer_id: 9, writer: 'Ronald Bass(screenplay)'},
//   { writer_id: 10, writer:  'Albert Hackett(screenplay)'},
//   { writer_id: 11, writer: 'Frances Goodrich(screenplay)'},
//   { writer_id: 12, writer: 'Nancy Meyers(screenplay)'},
//   { writer_id: 13, writer: 'Michael Mann'},
//   { writer_id: 14, writer: 'Samuel A. Taylor(play) (earlier screenplay)'},
//   { writer_id: 15, writer: 'Michael Mann'},
//   { writer_id: 16, writer: 'Billy Wilder(earlier screenplay)'},
//   { writer_id: 17, writer: 'Michael Mann'},

//   { writer_id: 18, writer: 'Ernest Lehman(earlier screenplay)'},
//   { writer_id: 19, writer: 'Mark Twain(novel "The Adventures of Tom Sawyer")'},
//   { writer_id: 20, writer: 'Stephen Sommers(screenplay)'},
//   { writer_id: 21, writer: 'David Loughery(screenplay)'},
//   { writer_id: 22, writer: 'Karen Elise Baldwin(story)'},
//   { writer_id: 23, writer: 'Gene Quintano(screenplay)'},
//   { writer_id: 24, writer:  'Ian Fleming(characters)'},
//   { writer_id: 25, writer:'Michael France(story)'},
//   { writer_id: 26, writer:  'Jeffrey Caine(screenplay)'},


// ];

// await Promise.all(
//   writer.map(async (writer) => {
//     await insertEntry(knex, tableNames.Writer ,  writer);
//   })
// );

//   // // Create Writer
//   // const writer = {
//   //   writer: 'John Lasseter(original story by)',
//   //   writer: 'Pete Docter(original story by)',
//   //   writer: 'Andrew Stanton(original story by) (screenplay by)',
//   //   writer: 'Jonathan Hensleigh(screenplay by)',
//   //   writer: 'Greg Taylor(screenplay by) (screen story by)',
//   //   writer: 'Jim Strain(screenplay by) (screen story by)',
//   //   writer: 'Mark Steven Johnson(characters)',
 
//   //   writer: 'Frances Goodrich(screenplay)',
//   //   writer: 'Nancy Meyers(screenplay)',

//   //   writer: 'Michael Mann',

//   //   writer: 'Samuel A. Taylor(play) (earlier screenplay)',

//   //   writer: 'Billy Wilder(earlier screenplay)',

//   //   writer: 'Ernest Lehman(earlier screenplay)',
//   //   writer: 'Mark Twain(novel "The Adventures of Tom Sawyer")',
//   //   writer: 'Stephen Sommers(screenplay)',

//   //   writer: 'David Loughery(screenplay)',
//   //   writer: 'Karen Elise Baldwin(story)',
//   //   writer: 'Gene Quintano(screenplay)',

//   //   writer: 'Ian Fleming(characters)',
//   //   writer: 'Michael France(story)',
//   //   writer: 'Jeffrey Caine(screenplay)',
//   // };
//   // const createdWriter = await insertEntry(knex, tableNames.Writer, writer);




//   //////////////////////
//   //Create Actor
//   const actor = [

//       {
//       actor_id:1,
//       actor: 'JTom Hanks',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg"
//       },
//     {
//       actor_id:2,
//       actor: 'Tim Allen',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTI5ODY0NTAwOF5BMl5BanBnXkFtZTcwOTI3NjQxMw@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
     
//     {
//       actor_id:3,
//       actor: 'Don Rickles',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTY0NTk1NzY1M15BMl5BanBnXkFtZTcwNjk4NDMwNA@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:4,
//       actor: 'Jim Varney',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTUzNTcxNzgwNF5BMl5BanBnXkFtZTYwMjkzOTM2._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:5,
//       actor: 'Wallace Shawn',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTc3MDYzMDQ1OF5BMl5BanBnXkFtZTcwMDQ3OTc1MQ@@._V1_UY317_CR4,0,214,317_AL_.jpg",
//     },
//     {
//       actor_id:6,
//       actor: 'Jim Varney',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTUzNTcxNzgwNF5BMl5BanBnXkFtZTYwMjkzOTM2._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:7,
//       actor: 'Robin Williams',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BNTYzMjc2Mjg4MF5BMl5BanBnXkFtZTcwODc1OTQwNw@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:8,
//       actor: 'Kirsten Dunst',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTQ3NzkwNzM1MV5BMl5BanBnXkFtZTgwMzE2MTQ3MjE@._V1_UY317_CR12,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:9,
//       actor: 'Bonnie Hunt',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BZDk3M2Y3ZWUtOTYwOC00MGMyLWJmNzgtZWE5YTFiNjM0YWQwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:10,
//       actor: 'Jonathan Hyde',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTI3OTEzMTg2M15BMl5BanBnXkFtZTcwMDExODgwMw@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
//     {
//       actor_id:11,
//       actor: 'Bradley Pierce',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMjQ1Njc2NTE3M15BMl5BanBnXkFtZTgwMDY2MTA2MDI@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
//     {
//       actor_id:12,
//       actor: 'Jack Lemmon',
//       actor_image_url: "'https://m.media-amazon.com/images/M/MV5BMTE5NTE3ODE1N15BMl5BanBnXkFtZTYwOTU1MTM2._V1_UY317_CR7,0,214,317_AL_.jpg"
//     },
     
//     {
//       actor_id:13,   
//       actor: 'Ann-Margret',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTcxMzM1NjMyN15BMl5BanBnXkFtZTYwODg1OTQ2._V1_UY317_CR20,0,214,317_AL_.jpg"
//     },
     
//     {
//       actor_id:14,
//       actor: 'Sophia Loren',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BOTczNzg5MzAwMl5BMl5BanBnXkFtZTcwNzE0MjcxNQ@@._V1_UY317_CR8,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:15,
//       actor: 'Burgess Meredith',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTMxOTk3MzY2OF5BMl5BanBnXkFtZTcwNTI3NTMyNA@@._V1_UY317_CR8,0,214,317_AL_.jpg"
//     },
    
//     {
//       actor_id:16,
//       actor: 'Whitney Houston',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTkyMzA1NTk1M15BMl5BanBnXkFtZTcwMTYxNTkzNw@@._V1_UY317_CR7,0,214,317_AL_.jpg"
//     },
    
      
    
//     {
//       actor_id:17,
//       actor: 'Angela Bassett',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMjI4OTQ1NTcxOF5BMl5BanBnXkFtZTcwOTc1NTU0OQ@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
    
      
    
//     {
//       actor_id:18,
//       actor: 'Loretta Devine',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTU3NjAyMDc2OF5BMl5BanBnXkFtZTcwNTU3MDMzMg@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
    
      
    
//     {
//       actor_id:19,
//       actor: 'Lela Rochon',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BNDAyODI5NzYyMV5BMl5BanBnXkFtZTYwMjQwMTc3._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
    
      
    
//     {
//       actor_id:20,
//       actor: 'Gregory Hines',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTI2NjU4NTYzM15BMl5BanBnXkFtZTYwODkwMjY2._V1_UY317_CR22,0,214,317_AL_.jpg"
//     },
    
      
//     {
//       actor_id:21,
//       actor: 'Martin Short',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTY1MDIyMDY1N15BMl5BanBnXkFtZTgwNzMzMDE5NTE@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
  
//     {
//       actor_id:22,
//       actor: 'Diane Keaton',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTY5NDI5OTEyOF5BMl5BanBnXkFtZTgwMzU4NDI1NzM@._V1_UY317_CR4,0,214,317_AL_.jpg"
//     },
     
  
//     {
//       actor_id:23,
//       actor: 'Steve Martin',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BNDY0ODYwNDM3OV5BMl5BanBnXkFtZTcwMTc3NjQzMg@@._V1_UX214_CR0,0,214,317_AL_.jpg"
//     },
     
  
//     {
//       actor_id:24,
//       actor: 'George Newbern',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMzc3NjczOTg4NV5BMl5BanBnXkFtZTgwODk3MDI5MTE@._V1_UX214_CR0,0,214,317_AL_.jpg"
     
//     },
//     {
//       actor_id:25,
//       actor: 'Al Pacino',
//       actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_UX214_CR0,0,214,317_AL_.jpg"
//     }
     



// ];

// await Promise.all(
//   actor.map(async (actor) => {
//     await insertEntry(knex, tableNames.Actor ,  actor);
//   })
// );


// ////////////

//   // const createdActor = await insertEntry(knex, tableNames.Actor, actor);
 
//   // Create Movie_Genre

//   const movieGenre1 = {
//     movie_id: 1,
//     genre_id: 1,
//   };
//   const movieGenre2 = {
//     movie_id: 1,
//     genre_id: 2,
//   };  
//   const movieGenre3 = {
//     movie_id: 1,
//     genre_id: 3,
//   };  
//   const movieGenre4 = {
//     movie_id: 1,
//     genre_id: 4,
//   }; 
//    const movieGenre5 = {
//     movie_id: 1,
//     genre_id: 5,
//   };  
//   const movieGenre6 = {
//     movie_id: 2,
//     genre_id: 2,
//   };

//   const movieGenre7 = {
//     movie_id: 2,
//     genre_id: 3,
//   };

//   const movieGenre8 = {
//     movie_id: 2,
//     genre_id: 4,
//   }; 
//   const movieGenre9 = {
//     movie_id: 2,
//     genre_id: 5,
//   };
//   const movieGenre10 = {
//     movie_id: 3,
//     genre_id: 3,
//   };
//   const movieGenre11 = {
//     movie_id: 3,
//     genre_id: 6,
//   };
//   const movieGenre12 = {
//     movie_id: 4,
//     genre_id: 3,
//   };
//   const movieGenre13 = {
//     movie_id: 4,
//     genre_id: 7,
//   };
//   const movieGenre14 = {
//     movie_id: 4,
//     genre_id: 6,
//   }; 
//   const movieGenre15 = {
//     movie_id: 5,
//     genre_id: 3,
//   };
//   const movieGenre16 = {
//     movie_id: 5,
//     genre_id: 4,
//   };  
//   const movieGenre17 = {
//     movie_id: 5,
//     genre_id: 6,
//   };
//   const movieGenre18 = {
//     movie_id: 6,
//     genre_id: 8,
//   };
//   const movieGenre19 = {
//     movie_id: 6,
//     genre_id: 7,
//   };
//   const movieGenre20 = {
//     movie_id: 6,
//     genre_id: 9,
//   };
//   const movieGenre21 = {
//     movie_id: 7,
//     genre_id: 3,
//   };
//   const movieGenre22 = {
//     movie_id: 7,
//     genre_id: 7,
//   };
//   const movieGenre23= {
//     movie_id: 7,
//     genre_id: 6,
//   };
//   const movieGenre24 = {
//     movie_id: 8,
//     genre_id: 3,
//   };
//   const movieGenre25 = {
//     movie_id: 8,
//     genre_id: 7,
//   };
//   const movieGenre26= {
//     movie_id: 8,
//     genre_id: 4,
//   };
//   const movieGenre27 = {
//     movie_id: 9,
//     genre_id: 8,
//   };
//   const movieGenre28 = {
//     movie_id: 9,
//     genre_id: 9,
//   };
//   const movieGenre29 = {
//     movie_id: 10,
//     genre_id: 9,
//   };
//   const movieGenre30 = {
//     movie_id: 10,
//     genre_id: 2,
//   };
//   await insertEntry(knex, tableNames.Movie_Genre, movieGenre1);
//   await insertEntry(knex, tableNames.Movie_Genre, movieGenre2);
//   await insertEntry(knex, tableNames.Movie_Genre, movieGenre3);


//  // Create Movie_Language
//   const movieLanguage = {
//     movie_id: 1,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage);

//   const movieLanguage2 = {
//     movie_id: 2,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage2);

//   const movieLanguage3 = {
//     movie_id: 2,
//     language_id: 2,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage3);

//   const movieLanguage4 = {
//     movie_id: 3,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage4);

//   const movieLanguage5 = {
//     movie_id: 3,
//     language_id: 3,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage5);

//   const movieLanguage6 = {
//     movie_id: 4,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage6);

//   const movieLanguage7 = {
//     movie_id: 5,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage7);

//   const movieLanguage8 = {
//     movie_id: 6,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage8);

//   const movieLanguage9= {
//     movie_id: 6,
//     language_id: 5,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage9);

//   const movieLanguage10= {
//     movie_id: 7,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage10);

//   const movieLanguage11= {
//     movie_id: 7,
//     language_id: 2,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage11);

//   const movieLanguage12= {
//     movie_id: 8,
//     language_id: 2,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage12);

//   const movieLanguage13= {
//     movie_id: 9,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage13);

//   const movieLanguage14= {
//     movie_id: 10,
//     language_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage14);

  
//   const movieLanguage15= {
//     movie_id: 10,
//     language_id: 6,
//   };
//   await insertEntry(knex, tableNames.Movie_Language, movieLanguage15);




//  // Create Movie_Director
//   const movieDirector = {
//     movie_id: 10,
//     director_id: 10,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector);

//   const movieDirector2 = {
//     movie_id:1,
//     director_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector2);

//   const movieDirector3 = {
//     movie_id: 2,
//     director_id: 2,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector3);

//   const movieDirector4= {
//     movie_id: 3,
//     director_id: 3,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector4);

//   const movieDirector5 = {
//     movie_id: 4,
//     director_id: 4,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector5);

//   const movieDirector6 = {
//     movie_id: 5,
//     director_id: 5,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector6);

//   const movieDirector7 = {
//     movie_id: 6,
//     director_id: 6,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector7);

//   const movieDirector8 = {
//     movie_id: 7,
//     director_id: 7,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector8);

//   const movieDirector9 = {
//     movie_id: 8,
//     director_id: 8,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector9);

//   const movieDirector10 = {
//     movie_id: 9,
//     director_id: 9,
//   };
//   await insertEntry(knex, tableNames.Movie_Director, movieDirector10);




//   // // Create Movie_Writer
//   // const movieWriter = {
//   //   movie_id: 1,
//   //   writer_id: 1,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter);


//   // // Create Role
//   // const role = {
//   //   movie_id: createdMovie.movie_id,
//   //   actor_id: createdActor.actor_id,
//   //   role: "Woody"
//   // };
//   // await insertEntry(knex, tableNames.Role, role);

  



//   //////////////////////


  
//   // Create Movie_Writer
//   const movieWriter1 = {
//     movie_id: 1,
//     writer_id: 1,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter1);

//   // const movieWriter2 = {
//   //   movie_id: 1,
//   //   writer_id: 2,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter2);

//   // const movieWriter3 = {
//   //   movie_id: 1,
//   //   writer_id: 3,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter3);

//   const movieWriter4 = {
//     movie_id: 2,
//     writer_id: 4,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter4);

//   // const movieWriter5 = {
//   //   movie_id: 2,
//   //   writer_id: 5,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter5);

//   // const movieWriter6 = {
//   //   movie_id: 2,
//   //   writer_id: 6,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter6);

//   const movieWriter7 = {
//     movie_id: 3,
//     writer_id: 7,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter7);

//   const movieWriter8 = {
//     movie_id: 4,
//     writer_id: 8,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter8);

//   // const movieWriter9 = {
//   //   movie_id: 4,
//   //   writer_id: 9,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter9);

//   const movieWriter10 = {
//     movie_id: 5,
//     writer_id: 10,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter10);

//   // const movieWriter11 = {
//   //   movie_id: 5,
//   //   writer_id: 11,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter11);

//   // const movieWriter12= {
//   //   movie_id: 5,
//   //   writer_id: 12,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter12);

//   const movieWriter13 = {
//     movie_id: 6,
//     writer_id: 13,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter13);

//   const movieWriter14 = {
//     movie_id: 7,
//     writer_id: 14,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter14);

//   // const movieWriter15 = {
//   //   movie_id: 7,
//   //   writer_id: 15,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter15);

//   // const movieWriter16 = {
//   //   movie_id: 7,
//   //   writer_id: 16,
//   // };

//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter16);

//   const movieWriter17 = {
//     movie_id: 8,
//     writer_id: 17,
//   };

//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter17);

//   // const movieWriter18 = {
//   //   movie_id: 8,
//   //   writer_id: 18,
//   // };

//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter18);

//   // const movieWriter19 = {
//   //   movie_id: 8,
//   //   writer_id: 19,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter19);

//   const movieWriter20 = {
//     movie_id: 9,
//     writer_id: 20,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter20);

//   // const movieWriter21 = {
//   //   movie_id: 9,
//   //   writer_id: 21,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter21);

//   const movieWriter22 = {
//     movie_id: 10,
//     writer_id: 22,
//   };
//   await insertEntry(knex, tableNames.Movie_Writer, movieWriter22);

//   // const movieWriter23 = {
//   //   movie_id: 10,
//   //   writer_id: 23,
//   // };
//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter23);

//   // const movieWriter24 = {
//   //   movie_id: 10,
//   //   writer_id: 24,
//   // };

//   // await insertEntry(knex, tableNames.Movie_Writer, movieWriter24);


//   // Create Role
//   const role1 = {
//     movie_id: 1,
//     actor_id: 1,
//     role: "Woody"
//   };
//   const role2 = {
//     movie_id: 1,
//     actor_id: 2,
//     role: "Buzz Lightyear"
//   };
//   const role3 = {
//     movie_id: 1,
//     actor_id: 3,
//     role: "Mr. Potato Head"
//   };
//   const role4 = {
//     movie_id: 1,
//     actor_id: 4,
//     role: "Slinky Dog"
//   };
//   const role5 = {
//     movie_id: 1,
//     actor_id: 5,
//     role: "Rex"
//   };
//   const role6 = {
//     movie_id: 2,
//     actor_id: 6,
//     role: "Alan Parrish"
//   };
//   const role7 = {
//     movie_id: 2,
//     actor_id: 7,
//     role: "Judy Shepherd"
//   };
//   const role8= {
//     movie_id: 2,
//     actor_id: 8,
//     role: "Sarah Whittle"
//   };
//   const role9= {
//     movie_id: 2,
//     actor_id: 9,
//     role: "Van Pelt"
//   };
//   const role10= {
//     movie_id: 2,
//     actor_id: 10,
//     role: "Peter Shepherd"
//   };
//   const role11= {
//     movie_id: 3,
//     actor_id: 10,
//     role: "Max Goldman"
//   };  
//   const role12= {
//     movie_id: 3,
//     actor_id: 10,
//     role: "John Gustafson"
//   };  
//   const role13= {
//     movie_id: 3,
//     actor_id: 10,
//     role: "Ariel Gustafson"
//   };  
//   const role14= {
//     movie_id: 3,
//     actor_id: 10,
//     role: "Maria Sophia Coletta Ragetti"
//   };  
//   const role15= {
//     movie_id: 3,
//     actor_id: 10,
//     role: "Grandpa Gustafson"
//   };
//   const role16= {
//     movie_id: 4,
//     actor_id: 11,
//     role: "Savannah"
//   };
//   const role17= {
//     movie_id: 4,
//     actor_id: 12,
//     role: "Bernadine"
//   };
//   const role18= {
//     movie_id: 4,
//     actor_id: 13,
//     role: "Gloria"
//   };
//   const role19= {
//     movie_id: 4,
//     actor_id: 14,
//     role: "Robin"
//   };
//   const role20= {
//     movie_id: 4,
//     actor_id: 15,
//     role: "Marvin"
//   };
//   const role21= {
//     movie_id: 5,
//     actor_id: 15,
//     role: "George Banks"
//   };
//   const role22= {
//     movie_id: 5,
//     actor_id: 15,
//     role: "Nina Banks"
//   };
//   const role23= {
//     movie_id: 5,
//     actor_id: 15,
//     role: "Franck Eggelhoffer"
//   };
//   const role24= {
//     movie_id: 5,
//     actor_id: 15,
//     role: "Annie Banks-MacKenzie"
//   };
//   const role25= {
//     movie_id: 5,
//     actor_id: 15,
//     role: "Bryan MacKenzie"
//   };

//   const role26= {
//     movie_id: 6,
//     actor_id: 16,
//     role: "Lt. Vincent Hanna"
//   };

//   const role27= {
//     movie_id: 6,
//     actor_id: 17,
//     role: "Neil McCauley"
//   };

//   const role28= {
//     movie_id: 6,
//     actor_id: 18,
//     role: "Chris Shiherlis"
//   };

//   const role29= {
//     movie_id: 6,
//     actor_id: 19,
//     role: "Nate"
//   };

//   const role30= {
//     movie_id: 6,
//     actor_id: 20,
//     role: "Michael Cheritto"
//   };

//   const role31= {
//     movie_id: 7,
//     actor_id: 21,
//     role: "Linus Larrabee"
//   };
//   const role32= {
//     movie_id: 7,
//     actor_id: 22,
//     role: "Sabrina Fairchild"
//   };
//   const role33= {
//     movie_id: 7,
//     actor_id: 23,
//     role: "David Larrabee"
//   };
//   const role34= {
//     movie_id: 7,
//     actor_id: 24,
//     role: "Maude Larrabee"
//   };
//   const role35= {
//     movie_id: 7,
//     actor_id: 25,
//     role: "Fairchild"
//   };
//   const role36= {
//     movie_id: 8,
//     actor_id: 26,
//     role: "Tom Sawyer"
// };
// const role37= {
//   movie_id: 8,
//   actor_id: 27,
//   role: "Huck Finn"
// };
// const role38= {
//   movie_id: 8,
//   actor_id: 28,
//   role: "Judge Thatcher"
// }; 
// const role39= {
//   movie_id: 8,
//   actor_id: 29,
//   role: "Injun Joe"
// };  
// const role40= {
//   movie_id: 8,
//   actor_id: 30,
//   role: "Aunt Polly"
// };
// const role41= {
//   movie_id: 9,
//   actor_id: 31,
//   role: "Darren McCord"
// };
// const role42= {
//   movie_id: 9,
//   actor_id: 32,
//   role: "Joshua Foss"
// };
// const role43= {
//   movie_id: 9,
//   actor_id: 33,
//   role: "Vice President"
// };
// const role44= {
//   movie_id: 9,
//   actor_id: 34,
//   role: "Emily McCord"
// };
// const role45= {
//   movie_id: 9,
//   actor_id: 35,
//   role: 'Tyler McCord'
// };
// const role46= {
//   movie_id: 10,
//   actor_id: 36,
//   role: 'James Bond'
// };

// const role47= {
//   movie_id: 10,
//   actor_id: 37,
//   role: 'Alec Trevelyan'
// };

// const role48= {
//   movie_id: 10,
//   actor_id: 38,
//   role: 'Natalya Simonova'
// };
// const role49= {
//   movie_id: 10,
//   actor_id: 39,
//   role: 'Xenia Onatopp'
// };
// const role50= {
//   movie_id: 10,
//   actor_id: 40,
//   role: 'Jack Wade'
// };

//   await insertEntry(knex, tableNames.Role, role1);
//   await insertEntry(knex, tableNames.Role, role2);
//   await insertEntry(knex, tableNames.Role, role3);
//   await insertEntry(knex, tableNames.Role, role4);
//   await insertEntry(knex, tableNames.Role, role5);


//     // Create User_Genre
//     const userGenre = {
//       user_id: createdUser.user_id,
//       genre_id: 2,
//     };
//     await insertEntry(knex, tableNames.User_Genre, userGenre);


    // Create Rating
  // const rating = {
  //   movie_id: 1,
  //   user_id: createdUser.user_id,
  //   rating: 3
  // };
  // await insertEntry(knex, tableNames.Rating, rating);


  // // Create Review
  //   const review = {
  //     movie_id: 1,
  //     user_id: createdUser.user_id,
  //     review: "Good movie"
  //   };
  //   await insertEntry(knex, tableNames.Review, review);
};



