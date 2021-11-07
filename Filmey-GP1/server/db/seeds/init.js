
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
    username: "Nouf ALduraibi",
    password: await bcrypt.hash("nouf123", 12),
    date_of_birth: '2000-01-01',
    gender: 'F',
    location:"Riyadh"
  };
  const createdUser = await insertEntry(knex, "User", user);



//Create Movie1
  const movie = {
    imdb_id: 114709,
    title: "Toy Story",
    year: 1995,
    length: '1h 21min',
    age_guide: 'G',
    description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
    poster:"https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/tN1A2mVnrOM"
  };
  const createdMovie = await insertEntry(knex, "Movie", movie);



  //Create Movie2
  const movie2 = {
    imdb_id: 113497,
    title: "Jumanji",
    year: 1995,
    length: '1h 44min',
    age_guide: 'G',
    description: "Jumanji, one of the most unique--and dangerous--board games ever, falls into the hands of the curious teen, Alan Parrish, in 1969. Mysterious and magical, the game strands the unsuspecting boy in the lush, savage forests of a mythical realm. Nearly three decades later, the game releases him before the awed eyes of the young orphaned siblings, Judy and Peter Shepherd. Now, the wild and incessant beat of the jungle's tribal drums is calling for the now-adult Alan and the other hesitant players, as the one who rolls the dice must never leave undone what the roll has started. Has anyone ever escaped from the game and Jumanji's formidable foes?" ,
    poster:"https://m.media-amazon.com/images/M/MV5BZTk2ZmUwYmEtNTcwZS00YmMyLWFkYjMtNTRmZDA3YWExMjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/eTjDsENDZ6s"
  };
  const createdMovie2 = await insertEntry(knex, "Movie", movie2);



  //Create Movie3
  const movie3 = {
    imdb_id: 113228,
    title: "Grumpier Old Men",
    year: 1995,
    length: '1h 41min',
    age_guide: 'PG-13',
    description: "Things don't seem to change much in Wabasha County: Max and John are still fighting after 35 years, Grandpa still drinks, smokes, and chases women , and nobody's been able to catch the fabled 'Catfish Hunter', a gigantic catfish that actually smiles at fishermen who try to snare it. Six months ago John married the new girl in town (Ariel), and people begin to suspect that Max might be missing something similar in his life. The only joy Max claims is left in his life is fishing, but that might change with the new owner of the bait shop." ,
    poster:"https://m.media-amazon.com/images/M/MV5BMjQxM2YyNjMtZjUxYy00OGYyLTg0MmQtNGE2YzNjYmUyZTY1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/rEnOoWs3FuA"
  };
  const createdMovie3 = await insertEntry(knex, "Movie", movie3);



  //Create Movie4
  const movie4 = {
    imdb_id: 114885,
    title: "Waiting to Exhale",
    year: 1995,
    length: '2h 4min',
    age_guide: 'R',
    description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
    poster:"https://m.media-amazon.com/images/M/MV5BYzcyMDY2YWQtYWJhYy00OGQ2LTk4NzktYWJkNDYwZWJmY2RjXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/j9xml1CxgXI"
  };
  const createdMovie4 = await insertEntry(knex, "Movie", movie4);



  //Create Movie5
  const movie5 = {
    imdb_id: 113041,
    title: "Father of the Bride Part II",
    year: 1995,
    length: '1h 46min',
    age_guide: 'G',
    description: "In this sequel to 'Father of the Bride', George Banks must accept the reality of what his daughter's ascension from daughter to wife, and now, to mother means when placed into perspective against his own stage of life. As the comfortable family unit starts to unravel in his mind, a rapid progression into mid-life crisis is in his future. His journey to regain his youth acts as a catalyst for a kind of 'rebirth' of his attitude on life when he and his wife, Nina, find how their lives are about to change as well." ,
    poster:"https://m.media-amazon.com/images/M/MV5BOTEyNzg5NjYtNDU4OS00MWYxLWJhMTItYWU4NTkyNDBmM2Y0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/_Pv5qMpwrdU"
  };
  const createdMovie5 = await insertEntry(knex, "Movie", movie5);



  //Create Movie6
  const movie6 = {
    imdb_id: 113277,
    title: "Heat",
    year: 1995,
    length: '2h 50min',
    age_guide: 'R18',
    description: "Hunters and their prey--Neil and his professional criminal crew hunt to score big money targets (banks, vaults, armored cars) and are, in turn, hunted by Lt. Vincent Hanna and his team of cops in the Robbery/Homicide police division. A botched job puts Hanna onto their trail while they regroup and try to put together one last big 'retirement' score. Neil and Vincent are similar in many ways, including their troubled personal lives. At a crucial moment in his life, Neil disobeys the dictum taught to him long ago by his criminal mentor--'Never have anything in your life that you can't walk out on in thirty seconds flat, if you spot the heat coming around the corner'--as he falls in love. Thus the stage is set for the suspenseful ending....",
    poster:"https://m.media-amazon.com/images/M/MV5BNGMwNzUwNjYtZWM5NS00YzMyLWI4NjAtNjM0ZDBiMzE1YWExXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg",
    trailer_url: "hhttps://www.youtube.com/embed/14oNcFxiVaQ"
  };
  const createdMovie6 = await insertEntry(knex, "Movie", movie6);

  


  //Create Movie7
  const movie7 = {
    imdb_id: 114319,
    title: "Sabrina",
    year: 1995,
    length: '2h 7min',
    age_guide: 'PG',
    description: "While she was growing up, Sabrina Fairchild spent more time perched in a tree watching the Larrabee family than she ever did on solid ground. As the chauffeur's daughter on their lavish Long Island estate, Sabrina was invisible behind the branches, but she knew them all below - There is Maude Larrabee, the modern matriarch of the Larrabee Corporation; Linus Larrabee, the serious older son who expanded a successful family business into the world's largest communications company; and David, the handsome, fun-loving Larrabee, who was the center of Sabrina's world until she was shipped off to Paris. After two years on the staff of Vogue magazine, Sabrina has returned to the Larrabee estate but now she has blossomed into a beautiful and sophisticated woman. And she's standing in the way of a billion dollar deal." ,
    poster:"https://m.media-amazon.com/images/M/MV5BYjQ5ZjQ0YzQtOGY3My00MWVhLTgzNWItOTYwMTE5N2ZiMDUyXkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/iEqPw_QP28c"
  };
  const createdMovie7 = await insertEntry(knex, "Movie", movie7);

    


  //Create Movie8
  const movie8 = {
    imdb_id: 112302,
    title: "Tom and Huck",
    year: 1995,
    length: '1h 37min',
    age_guide: 'PG',
    description: "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named 'Woody'. But, what do the toys do when Andy is not with them, they come to life. Woody believes that his life (as a toy) is good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips." ,
    poster:"https://m.media-amazon.com/images/M/MV5BN2ZkZTMxOTAtMzg1Mi00M2U0LWE2NWItZDg4YmQyZjVkMDdhXkEyXkFqcGdeQXVyNTM5NzI0NDY@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/-C-xXZyX2zU"
  };
  const createdMovie8 = await insertEntry(knex, "Movie", movie8);

    


  //Create Movie9
  const movie9 = {
    imdb_id: 114576,
    title: "Sudden Death",
    year: 1995,
    length: '1h 51min',
    age_guide: 'R',
    description: "Darren McCord takes his two kids to a Pittsburgh Penguins National Hockey League play-off game, unknowing that the sports arena has been taken over by terrorists, who are holding the Vice President of the United States, as well as many other high-ranking officials hostage. Darren later becomes the only one who is aware of the situation. And, the stakes are raised when the terrorists announce that they will blow-up the building at the end of the game. Therefore, Darren must not only subdue the terrorists, but postpone the game and send it to overtime." ,
    poster:"https://m.media-amazon.com/images/M/MV5BN2NjYWE5NjMtODlmZC00MjJhLWFkZTktYTJlZTI4YjVkMGNmXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/SCOxEKkuWG4"
  };
  const createdMovie9 = await insertEntry(knex, "Movie", movie9);

    


  //Create Movie10
  const movie10 = {
    imdb_id: 113189,
    title: "GoldenEye",
    year: 1995,
    length: '2h 10min',
    age_guide: 'PG',
    description: "When a deadly satellite weapon system falls into the wrong hands, only Agent James Bond 007 (Pierce Brosnan) can save the world from certain disaster. Armed with his licence to kill, Bond races to Russia in search of the stolen access codes for 'GoldenEye', an awesome space weapon that can fire a devastating electromagnetic pulse toward Earth. But 007 is up against an enemy who anticipates his every move: a mastermind motivated by years of simmering hatred. Bond also squares off against Xenia Onatopp (Famke Janssen), an assassin who uses pleasure as her ultimate weapon." ,
    poster:"https://m.media-amazon.com/images/M/MV5BMzk2OTg4MTk1NF5BMl5BanBnXkFtZTcwNjExNTgzNA@@._V1_.jpg",
    trailer_url: "https://www.youtube.com/embed/mSBHbGduo5I"
  };
  const createdMovie10 = await insertEntry(knex, "Movie", movie10);




  //Create Admin
  const admin = {
    username: "admin1",
    password: await bcrypt.hash("nadmin123", 12),
  };
  const createdAdmin = await insertEntry(knex, "Admin", admin);


  //Create Genre
  const genres = [
    { genre_id: 1, genre: "Animation" },
    { genre_id: 2, genre: "Comedy" },
    { genre_id: 3, genre: "Family" },
  ];
  await Promise.all(
    genres.map(async (genre) => {
      await insertEntry(knex, tableNames.Genre, genre);
    })
  );



  //Create Language
  const Languages = [
    { language_id: 1, language: "English" },
    { language_id: 2, language: "French" }
  ];
  await Promise.all(
    Languages.map(async (language) => {
      await insertEntry(knex, tableNames.Language ,  language);
    })
  );


  // Create Director
  const director = {
    director: 'John Lasseter',
  };
  const createdDirector = await insertEntry(knex, tableNames.Director, director);


  // Create Writer
  const writer = {
    writer: 'John Lasseter(original story by)',
  };
  const createdWriter = await insertEntry(knex, tableNames.Writer, writer);


  // Create Actor
  const actor = {
    actor: 'JTom Hanks',
    actor_image_url: "https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg"
  };
  const createdActor = await insertEntry(knex, tableNames.Actor, actor);
 


  // Create Movie_Genre
  const movieGenre = {
    movie_id: createdMovie.movie_id,
    genre_id: 1,
  };
  await insertEntry(knex, tableNames.Movie_Genre, movieGenre);


 // Create Movie_Language
  const movieLanguage = {
    movie_id: createdMovie.movie_id,
    language_id: 1,
  };
  await insertEntry(knex, tableNames.Movie_Language, movieLanguage);


 // Create Movie_Director
  const movieDirector = {
    movie_id: createdMovie.movie_id,
    director_id: createdDirector.director_id,
  };
  await insertEntry(knex, tableNames.Movie_Director, movieDirector);


  // Create Movie_Writer
  const movieWriter = {
    movie_id: createdMovie.movie_id,
    writer_id: createdWriter.writer_id,
  };
  await insertEntry(knex, tableNames.Movie_Writer, movieWriter);



  // Create Role
  const role = {
    movie_id: createdMovie.movie_id,
    actor_id: createdActor.actor_id,
    role: "Woody"
  };
  await insertEntry(knex, tableNames.Role, role);


    // Create User_Genre
    const userGenre = {
      user_id: createdUser.user_id,
      genre_id: 2,
    };
    await insertEntry(knex, tableNames.User_Genre, userGenre);


    // Create Rating
  const rating = {
    movie_id: createdMovie.movie_id,
    user_id: createdUser.user_id,
    rating: 3.6
  };
  await insertEntry(knex, tableNames.Rating, rating);


  // Create Review
    const review = {
      movie_id: createdMovie.movie_id,
      user_id: createdUser.user_id,
      review: "Good movie"
    };
    await insertEntry(knex, tableNames.Review, review);
};



