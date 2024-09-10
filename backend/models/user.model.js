const { db } = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");

async function addNewUser(name, phoneNo, address, cowName, breed, bullName, aiDate, injectionCost) {
  const params = {name, phoneNo, address, cowName, breed, bullName, aiDate, injectionCost};
  for (let [key, value] of Object.entries(params)) {
    if (value == null || value == undefined) {
      throw new Error(`${key} is null or undefined`);
    }
  }

  if (typeof phoneNo !== "number" || isNaN(phoneNo) || String(phoneNo).length !== 10) {
    throw new Error("Phone number must be a valid number with exactly 10 digits");
  }

  if (typeof injectionCost !== "number" || isNaN(injectionCost)) {
    throw new Error("Injection cost must be a valid number not string");
  }

  return new Promise((resolve, reject) => {
    db.run(queries.INSERT_USER_RECORDS_SQL, Object.values(params), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function getUsers() {
  const users = new Promise((resolve, reject) => {
    db.all(queries.SELECT_ALL_USERS_SQL, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  return users;
}


module.exports = {
  addNewUser,
  getUsers
};