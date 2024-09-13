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

function validateId(id) {
  if (id == null || id == undefined) {
    throw new Error("Id is null or undefined");
  }
}


async function addNewUser(name, phoneNumber, address, cowName, cowBreed, bullName, aiDate, injectionCost) {
  checkIfPhoneNoIsValid(phoneNumber);
  checkIfInjectionCostIsValid(injectionCost);

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(queries.INSERT_USER_RECORDS_SQL, [name, phoneNumber, address, cowName, cowBreed, bullName, aiDate, injectionCost], (err) => {
        if (err) {
          reject(err);
        }

        db.get(queries.SELECT_LAST_USER_SQL, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
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
}


async function getUser(id) {
  validateId(id);

  return new Promise((resolve, reject) => {
    db.get(queries.SELECT_USER_BY_ID_SQL, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}


async function updateUser(id, data) {
  validateId(id);

  if (data.phoneNo) {
    checkIfPhoneNoIsValid(data.phoneNo);
  } 

  if (data.injectionCost) {
    checkIfInjectionCostIsValid(data.injectionCost);
  }

  const promises = [];
  for (let [key, value] of Object.entries(data)) {
    const promise = new Promise((resolve, reject) => {
      db.run(queries.UPDATE_USER_BY_ID_SQL.replace("<column_name>", key), [value, id], (err) => {
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


async function deleteUser(id) {
  validateId(id);

  return new Promise((resolve, reject) => {
    db.run(queries.DELETE_USER_BY_ID_SQL, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}



async function deleteAllUsers() {
  return new Promise((resolve, reject) => {
    db.run(queries.DELETE_ALL_USERS_SQL, (err) => {
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
  getUsers,
  getUser, 
  updateUser,
  deleteUser,
  deleteAllUsers
};