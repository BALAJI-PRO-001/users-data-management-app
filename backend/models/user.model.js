const sqlite3 = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");

async function addNewUser(name, phoneNo, address, cowName, breed, bullName, aiDate, injectionCost) {
    const params = {name, phoneNo, address, cowName, breed, bullName, aiDate, injectionCost};
    for (let [key, value] of Object.entries(params)) {
      if (value == null || value == undefined) {
        throw new Error(`${key} is null or undefined`);
      }
    }

  return new Promise((resolve, reject) => {
    sqlite3.run(queries.INSERT_USER_RECORDS_SQL, Object.values(params), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}



module.exports = {
  addNewUser,
};