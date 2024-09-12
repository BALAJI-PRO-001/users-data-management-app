const { db } = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");

function checkIfPhoneNoIsValid(phoneNo) {
  if (typeof phoneNo !== "number" || isNaN(phoneNo) || String(phoneNo).length !== 10) {
    throw new Error("Phone number must be a valid number with exactly 10 digits");
  }
}

function checkIfInjectionCostIsValid(injectionCost) {
  if (typeof injectionCost !== "number" || isNaN(injectionCost)) {
    throw new Error("Injection cost must be a valid number not string");
  }
}


async function addNewUser(name, phoneNumber, address, cowName, cowBreed, bullName, aiDate, injectionCost) {
  checkIfPhoneNoIsValid(phoneNumber);
  checkIfInjectionCostIsValid(injectionCost);

  return new Promise((resolve, reject) => {
    db.run(queries.INSERT_USER_RECORDS_SQL, [name, phoneNumber, address, cowName, cowBreed, bullName, aiDate, injectionCost], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function getUsers() {
  return new Promise((resolve, reject) => {
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


async function getUser(id) {
  return new Promise((resolve, reject) => {
    db.get(queries.SELECT_USER_SQL, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
  return user;
}


async function updateUser(id, data) {
  if (data.phoneNo) {
    checkIfPhoneNoIsValid(data.phoneNo);
  } 

  if (data.injectionCost) {
    checkIfInjectionCostIsValid(data.injectionCost);
  }

  const promises = [];
  for (let [key, value] of Object.entries(data)) {
    const promise = new Promise((resolve, reject) => {
      db.run(queries.UPDATE_USER_SQL.replace("<column_name>", key), [value, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    promises.push(promise);
  }

  await Promise.all(promises);
  return await getUser(id);
}


module.exports = {
  addNewUser,
  getUsers,
  getUser, 
  updateUser
};