const sqlite3 = require("sqlite3").verbose();
const queries = require("./queries");
const { SQLITE3_DATABASE_PATH } = require("../../utils/constants");


function connect() {
  const db = new sqlite3.Database(SQLITE3_DATABASE_PATH, (err) => {
    if (err) {
      console.log("Error: " + err.message);
    } else {
      console.log("Sqlite3 database connected!");
    }
  });
  return db;
}

const db = connect();
db.serialize(() => {
  db.run(queries.CREATE_USERS_TABLE_SQL, (err) => {
    if (err) {
      console.log("Error : " + err.message);
    }
  });
  
  db.run(queries.CREATE_COWS_TABLE_SQL, (err) => {
    if (err) {
      console.log("Error: " + err.message);
    }
  });

  db.run(queries.CREATE_INJECTION_COST_AND_AI_DATE_TABLE_SQL, (err) => {
    if (err) {
      console.log("Error: " + err.message);
    }
  });
});

module.exports = { db }; 