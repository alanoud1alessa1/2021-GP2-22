
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




  //Create User1
  const user1 = {
    email: "noufalduraibi12@gmail.com",
    username: "Nouf",
    password: await bcrypt.hash("12345678", 12),
    date_of_birth: '2000-01-01',
    gender: 'F',
    location:"Riyadh"
  };
  const createdUser1 = await insertEntry(knex, "User", user1);



  //  //Create User2
  //  const user2 = {
  //   email: "nouf1@gmail.com",
  //   username: "Nouf1",
  //   password: await bcrypt.hash("12345678", 12),
  //   date_of_birth: '2000-01-01',
  //   gender: 'F',
  //   location:"Riyadh"
  // };
  // const createdUser2 = await insertEntry(knex, "User", user2);

  
  //  //Create User3
  //  const user3 = {
  //   email: "nouf2@gmail.com",
  //   username: "Nouf2",
  //   password: await bcrypt.hash("12345678", 12),
  //   date_of_birth: '2000-01-01',
  //   gender: 'F',
  //   location:"Riyadh"
  // };
  // const createdUser3 = await insertEntry(knex, "User", user3);

  
  //  //Create User4
  //  const user4 = {
  //   email: "nou34@gmail.com",
  //   username: "Nouf3",
  //   password: await bcrypt.hash("12345678", 12),
  //   date_of_birth: '2000-01-01',
  //   gender: 'F',
  //   location:"Riyadh"
  // };
  // const createdUser4 = await insertEntry(knex, "User", user4);

  
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





// //create user with more than 20 ratings
// //Create user2
// const user2 = {
//   email: "noufCB@gmail.com",
//   username: "NoufCB",
//   password: await bcrypt.hash("12345678", 12),
//   date_of_birth: '2000-01-01',
//   gender: 'F',
//   location:"Riyadh"
// };
// const createdUser2 = await insertEntry(knex, "User", user2);

// // create favorite genres list for user2
// const list = {


// }



};



