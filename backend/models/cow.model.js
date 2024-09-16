const { db } = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");


async function addNewCow(userID, cowName, cowBreed, bullName, injectionCostsAndAiDates) {
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

  await insertNewInjectionCostsAndAiDates(newCow.id, injectionCostsAndAiDates);
  injectionCostsAndAiDates = await getInjectionCostsAndAiDatesByCowId(newCow.id);

  return {
    cowId: newCow.id,
    cowName: newCow.cow_name,
    cowBreed: newCow.cow_name,
    bullName: newCow.bull_name,
    cowCreatedAt: newCow.date_and_time,
    injectionCostsAndAiDates: [
      ...injectionCostsAndAiDates
    ]
  };
}



async function insertNewInjectionCostsAndAiDates(cowId, injectionCostsAndAiDates) {
  const promises = [];

  for (let { cost, date } of injectionCostsAndAiDates) {
    const newPromise = new Promise((resolve, reject) => {
      db.run(queries.INSERT_INJECTION_COST_AND_AI_DATE_SQL, [cowId, cost, date], (err) => {
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


async function getInjectionCostsAndAiDatesByCowId(cowId) {
  return new Promise((resolve, reject) => {
    db.all(queries.SELECT_INJECTION_COSTS_AND_AI_DATE_BY_COW_ID_SQL, cowId, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows)
      }
    });
  });
}


async function getAllCows() {
  return new Promise((resolve, reject) => {
    db.all(queries.SELECT_ALL_COWS_WITH_INJECTION_COST_AND_AI_DATE_SQL, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


async function deleteAllCows() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(queries.DELETE_ALL_COWS_SQL, (err) => {
        if (err) {
          reject(err);
        }
      });

      db.run(queries.DELETE_ALL_INJECTION_COSTS_AND_AI_DATES_SQL, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}


module.exports = {
  addNewCow,
  getAllCows,
  deleteAllCows,
};