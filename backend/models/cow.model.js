const { db } = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");


function validateId(id, name) {
  if (!id) {
    throw new Error(`Given ${name} is null or undefined.`);
  }
}


async function addNewCow(userID, cowName, cowBreed, bullName, injectionInfoAndAiDates) {
  validateId(userID, "user")

  const newCow = await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(queries.INSERT_COW_RECORDS_SQL, [userID, cowName, cowBreed, bullName], (err) => {
        if (err) {
          reject(err);
        }
      });

      db.get(queries.SELECT_LAST_COW_SQL, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });

  await addNewInjectionInfoAndAiDatesToCow(newCow.id, injectionInfoAndAiDates);
  injectionInfoAndAiDates = await getInjectionInfoAndAiDatesByCowId(newCow.id);

  return {
    id: newCow.id,
    cowName: newCow.cow_name,
    cowBreed: newCow.cow_name,
    bullName: newCow.bull_name,
    createdAt: newCow.date_and_time,
    injectionInfoAndAiDates: [
      ...injectionInfoAndAiDates
    ]
  };
}



async function addNewInjectionInfoAndAiDatesToCow(cowId, injectionInfoAndAiDates) {
  validateId(cowId, "cow");

  const promises = [];

  for (let { name, cost, date } of injectionInfoAndAiDates) {
    const newPromise = new Promise((resolve, reject) => {
      db.run(queries.INSERT_INJECTION_INFO_AND_AI_DATES_SQL, [cowId, name, cost, date], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    promises.push(newPromise);
  }
  await Promise.all(promises);
}


async function getInjectionInfoAndAiDatesByCowId(cowId) {
  validateId(cowId, "cow");

  return new Promise((resolve, reject) => {
    db.all(queries.SELECT_INJECTION_INFO_AND_AI_DATES_BY_COW_ID_SQL, cowId, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows)
      }
    });
  });
}


async function getCowById(id) {
  validateId(id, "cow");

  return new Promise((resolve, reject) => {
    db.get(queries.SELECT_COW_BY_ID, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}


async function getAllCowsWithInjectionInfoAndAiDates() {
  let cows = await new Promise((resolve, reject) => {
    db.all(queries.SELECT_ALL_COWS_SQL, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  const injectionInfoAndAiDates = await new Promise((resolve, reject) => {
    db.all(queries.SELECT_ALL_INJECTION_INFO_AND_AI_DATES_SQL, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  cows = cows.map(({id, user_id, cow_name, cow_breed, bull_name, date_and_time}) => {
    const arrayOfInjectionInfoAndAiDates = [];
    for (let {cow_id, name, cost, date} of injectionInfoAndAiDates) {
      if (cow_id == id) {
        arrayOfInjectionInfoAndAiDates.push({name, cost, date});
      }
    }

    return {
      id: id,
      userId: user_id,
      cowName: cow_name,
      cowBreed: cow_breed,
      bullName: bull_name,
      injectionInfoAndAiDates : [
        ...arrayOfInjectionInfoAndAiDates
      ],
      createdAt: date_and_time
    };
  });

  return cows;
}


async function deleteAllCows() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(queries.DELETE_ALL_COWS_SQL, (err) => {
        if (err) {
          reject(err);
        }
      });

      db.run(queries.DELETE_ALL_INJECTION_INFO_AND_AI_DATES_SQL, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}


async function deleteCow(id) {
  validateId(id, "cow");

  return new Promise((resolve, reject) => {
    db.run(queries.DELETE_COW_BY_ID_SQL, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function getCowsWithInjectionInfoAndAiDatesByUserId(userId) {
  validateId(userId, "user");

  const cows = await new Promise((resolve, reject) => {
    db.all(queries.SELECT_COWS_BY_USER_ID_SQL, userId, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  const cowsWithInjectionInfoAndAiDates = [];
  for (let cow of cows) {
    const injectionInfoAndAiDates = await getInjectionInfoAndAiDatesByCowId(cow.id);
    cowsWithInjectionInfoAndAiDates.push({
      id: cow.id,
      cowName: cow.cow_name,
      cowBreed: cow.cow_breed,
      bullName: cow.bull_name,
      injectionInfoAndAiDates: injectionInfoAndAiDates,
      createdAt: cow.date_and_time
    });
  }

  return cowsWithInjectionInfoAndAiDates;
}




module.exports = {
  addNewCow,
  getAllCowsWithInjectionInfoAndAiDates,
  getCowById,
  deleteAllCows,
  deleteCow,
  getCowsWithInjectionInfoAndAiDatesByUserId,
  addNewInjectionInfoAndAiDatesToCow
};