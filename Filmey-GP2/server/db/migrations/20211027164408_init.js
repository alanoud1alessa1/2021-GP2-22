const tableNames = require("../../constents/tableNames");

function references(table, tableName, columnName) {
  const definition = table
    .integer(`${columnName}_id`)
    .references(`${columnName}_id`)
    .inTable(tableName)
    .onDelete("CASCADE")
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
      table.string("title", 100).notNullable();
      table.integer("year").notNullable();
      table.string("length", 10);
      table.string("age_guide", 10);
      table.text("description", "longtext");
      table.string("poster", 255);
      table.string("trailer_url", 255);
      table.boolean("is_deleted").notNullable().defaultTo(false);
      table.boolean("is_in_cinema").notNullable().defaultTo(false);
      table.boolean("is_coming_soon").notNullable().defaultTo(false);
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
    }),
    await knex.schema.createTable("Movie_Genre", (table) => {
      references(table, "Movie", "movie");
      references(table, "Genre", "genre");
      table.primary(["movie_id", "genre_id"]);
    }),
    await knex.schema.createTable("Movie_Language", (table) => {
      references(table, "Movie", "movie");
      references(table, "Language", "language");
      table.primary(["movie_id", "language_id"]);
    }),
    await knex.schema.createTable("Movie_Director", (table) => {
      references(table, "Movie", "movie");
      references(table, "Director", "director");
      table.primary(["movie_id", "director_id"]);
    }),
    await knex.schema.createTable("Movie_Writer", (table) => {
      references(table, "Movie", "movie");
      references(table, "Writer", "writer");
      table.primary(["movie_id", "writer_id"]);
    }),
    await knex.schema.createTable("Role", (table) => {
      references(table, "Movie", "movie");
      references(table, "Actor", "actor");
      table.string("role", 35);
      table.primary(["movie_id", "actor_id"]);
    }),
    await knex.schema.createTable("User_Genre", (table) => {
      references(table, "User", "user");
      references(table, "Genre", "genre");
      table.primary(["user_id", "genre_id"]);
    }),
    await knex.schema.createTable("Rating", (table) => {
      references(table, "Movie", "movie");
      references(table, "User", "user");
      table.integer("rating").notNullable();
      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.boolean("is_deleted").notNullable().defaultTo(false);
      table.primary(["movie_id", "user_id"]);
    }),
    await knex.schema.createTable("Review", (table) => {
      table.increments("review_id").notNullable();
      references(table, "Movie", "movie");
      references(table, "User", "user");
      table.string("review", 255).notNullable();
      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.boolean("is_deleted").notNullable().defaultTo(false);
    }),
    await knex.schema.createTable("Admin_Add_Movie", (table) => {
      references(table, "Movie", "movie");
      references(table, "Admin", "admin");
      table
        .dateTime("added_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.primary(["movie_id", "admin_id"]);
    }),
    await knex.schema.createTable("Admin_Edit_Movie", (table) => {
      references(table, "Movie", "movie");
      references(table, "Admin", "admin");
      table
        .dateTime("edited_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.primary(["movie_id", "admin_id", "edited_at"]);
    }),
    await knex.schema.createTable("Admin_Delete_Movie", (table) => {
      references(table, "Movie", "movie");
      references(table, "Admin", "admin");
      table
        .dateTime("deleted_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.primary(["movie_id", "admin_id"]);
    }),
    await knex.schema.createTable("Admin_Delete_Review", (table) => {
      references(table, "Review", "review");
      references(table, "Admin", "admin");
      table
        .dateTime("deleted_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table.primary(["review_id", "admin_id"]);
    }),
    await knex.schema.createTable("Cinema", (table) => {
      table.increments("cinema_id").notNullable();
      table.string("name", 20).notNullable();
      table.string("city", 20).notNullable();
      table.string("location", 50).notNullable();
    }),
    await knex.schema.createTable("In_Cinema", (table) => {
      references(table, "Cinema", "cinema");
      references(table, "Movie", "movie");
      table.string("booking_link", 150).notNullable();
      table.primary(["movie_id", "cinema_id"]);

    }),
    await knex.schema.createTable("Coming_soon", (table) => {
      table.increments("coming_soon_id").notNullable();
      references(table, "Movie", "movie");
      table.string("cinema_name", 20).notNullable();
      table.dateTime("release_date").notNullable();
    }),
    await knex.schema.createTable("WatchList", (table) => {
      references(table, "Movie", "movie");
      references(table, "User", "user");
      table.primary(["movie_id", "user_id"]);

    }),
  ]);
};
/**
 * @param {Knex} knex
 */

exports.down = function (knex) {
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
