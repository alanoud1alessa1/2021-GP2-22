
const bcrypt = require("bcrypt");
const Knex = require("knex");

const tableNames = {
  User: "User",
  Admin: "Admin",
  Review: "Review",

};

async function insertEntry(knex, table, entry) {
  const [created] = await knex(table).insert(entry).returning("*");
  console.log(`added to table ${table} entry: `, entry);
  return created;
}


exports.seed = async (knex) => {

  // Deletes ALL existing entries in tableNames tables
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



};



