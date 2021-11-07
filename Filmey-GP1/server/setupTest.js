module.exports = async () => {
  delete require.cache[require.resolve("./db.js")];
  let db = require("./db");
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
};
