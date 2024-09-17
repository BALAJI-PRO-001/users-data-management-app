const { db } = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");

function checkIfPhoneNoIsValid(phoneNo) {
  if (typeof phoneNo !== "number" || isNaN(phoneNo) || String(phoneNo).length !== 10) {
    throw new Error("Phone number must be a valid number with exactly 10 digits");
  }
}


function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    throw new Error("Phone number is null or undefined");
  }

  if (String(phoneNumber).length != 10) {
    throw new Error("Phone number must be 10 digit long");
  }
}


function validateId(id) {
  if (!id) {
    throw new Error("Give user id is null or undefined.");
  }
}


async function addNewUser(name, phoneNumber, address) {
  checkIfPhoneNoIsValid(phoneNumber);

  const isUserExists = await getUserByPhoneNumber(phoneNumber);
  if (isUserExists) {
    throw new Error("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_number");
  }

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(queries.INSERT_USER_RECORDS_SQL, [name, phoneNumber, address], (err) => {
        if (err) {
          reject(err);
        }
      });

      db.get(queries.SELECT_LAST_USER_SQL, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
}


async function getAllUsers() {
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


async function getUserById(id) {
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


async function getUserByPhoneNumber(phoneNumber) {
  validatePhoneNumber(phoneNumber);

  return new Promise((resolve, reject) => {
    db.get(queries.SELECT_USER_BY_PHONE_NUMBER_SQL, phoneNumber, (err, row) => {
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
  return await getUserById(id);
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
  getAllUsers,
  getUserById, 
  getUserByPhoneNumber,
  updateUser,
  deleteUser,
  deleteAllUsers
};