const tableNames = require("../../constents/tableNames")



function references(
  table,
  tableName,
  columnName,
) {
  const definition = table
    .integer(`${columnName}_id`)
    .references(`${columnName}_id`)
    .inTable(tableName)
    // .OnDelete("CASCADE")
    // .OnUpdate(OnUpdate)
    .notNullable();

  return definition;
}


exports.up = async (knex) => {
  await Promise.all([
    await knex.schema.createTable("User", (table) => {
      table.increments("user_id").notNullable();
      table.string("email", 100).unique().notNullable();
      table.string("username", 30).unique().notNullable();
      table.string("password", 100).notNullable();
      table.date("date_of_birth", 30).notNullable();
      table.string("gender", 6).notNullable();
      table.string("location", 15).notNullable();
    }),
    await knex.schema.createTable("Movie", (table) => {
      table.increments("movie_id").notNullable();
      // table.integer("imdb_id").notNullable();
      table.string("title", 100).notNullable();
      table.integer("year").notNullable();
      table.string("length", 10).notNullable();
      table.string("age_guide", 10).notNullable();
      table.text('description','longtext').notNullable();
      table.string("poster", 255).notNullable();
      table.string("trailer_url", 255).notNullable();
    }),
    await knex.schema.createTable("Admin", (table) => {
        table.increments("admin_id").notNullable();
        table.string("username", 30).unique().notNullable();
        table.string("password", 100).notNullable();
      }),
    await knex.schema.createTable("Genre", (table) => {
      table.increments("genre_id").notNullable();
      table.string("genre", 12).notNullable();
    }),
    await knex.schema.createTable("Language", (table) => {
        table.increments("language_id").notNullable();
        table.string("language", 25).notNullable();
    }),
    await knex.schema.createTable("Director", (table) => {
        table.increments("director_id").notNullable();
        table.string("director", 40).notNullable();
    }),
    await knex.schema.createTable("Writer", (table) => {
        table.increments("writer_id").notNullable();
        table.string("writer", 30).notNullable();
    }),
    await knex.schema.createTable("Actor", (table) => {
        table.increments("actor_id").notNullable();
        table.string("actor", 40).notNullable();
        table.string("actor_image_url", 255);

    }) ,
    await knex.schema.createTable("Movie_Genre", (table) => {
        references(table, "Movie" , "movie");
        references(table, "Genre" , 'genre');
        table.primary(["movie_id", "genre_id"]);
    }),
    await knex.schema.createTable("Movie_Language", (table) => {
        references(table, "Movie" , "movie");
        references(table, "Language" , 'language');
        table.primary(["movie_id", "language_id"]);
    }),
    await knex.schema.createTable("Movie_Director", (table) => {
        references(table, "Movie" , "movie");
        references(table, "Director" , 'director');
        table.primary(["movie_id", "director_id"]);
    }),
    await knex.schema.createTable("Movie_Writer", (table) => {
        references(table, "Movie" , "movie");
        references(table, "Writer" , 'writer');
        table.primary(["movie_id", "writer_id"]);
    }),
    await knex.schema.createTable("Role", (table) => {
        references(table, "Movie" , "movie");
        references(table, "Actor" , 'actor');
        table.string("role", 35);
        table.primary(["movie_id", "actor_id"]);
    }),
    await knex.schema.createTable("User_Genre", (table) => {
        references(table, "User" , "user");
        references(table, "Genre" , "genre");
        table.primary(["user_id", "genre_id"]);
      }),
    await knex.schema.createTable("Rating", (table) => {
        references(table, "Movie" , "movie");
        references(table, "User" , "user");
        table.integer("rating").notNullable();
        table.primary(["movie_id", "user_id"]);
      }),
      await knex.schema.createTable("Review", (table) => {
        references(table, "Movie" , "movie");
        references(table, "User" , "user");
        table.string("review", 225).notNullable();
        table.primary(["movie_id", "user_id"]);
      })
  ]);
};
/**
 * @param {Knex} knex
 */

  exports.down = function(knex) {
    return knex.schema
        .dropTable("Movie_Genre")
        .dropTable("Movie_Language")
        .dropTable("Movie_Director")
        .dropTable("Movie_Writer")
        .dropTable("Role")
        .dropTable("User_Genre")
        .dropTable("Rating")
        .dropTable("Review")
        .dropTable("Genre")
        .dropTable("Language")
        .dropTable("Director")
        .dropTable("Writer")
        .dropTable("Admin")
        .dropTable("Actor")
        .dropTable("User")
        .dropTable("Movie");
  };




