const User = require("./user.model");
const Cow = require("./cow.model");
const { db } = require("../db/sqlite3");
const queries = require("../db/sqlite3/queries");

async function createNewRecord(user, cows) {
  const newUser = await User.addNewUser(user.name, user.phoneNumber, user.address);
  const newCows = [];
  for (let {cowName, cowBreed, bullName, injectionCostsAndAiDates} of cows) {
    const newCow = await Cow.addNewCow(newUser.id, cowName, cowBreed, bullName, injectionCostsAndAiDates);
    newCows.push(newCow);
  }

  return {
    user: {
      userId: newUser.id,
      name: newUser.name,
      phoneNumber: newUser.phone_number,
      address: newUser.address,
      userCreatedAt: newUser.date_and_time 
    },
    cows: [
      ...newCows
    ],
    recordCreatedAt: newUser.date_and_time
  };
}


async function getAllRecords() {
  const sql = `
    SELECT 
      users.name AS user_name, 
      users.phone_number AS user_phone_number,
      users.address AS user_address,
      GROUP_CONCAT(cows.cow_name, ', ') AS cows_names,
      GROUP_CONCAT(cows.cow_breed, ', ') AS cows_breeds,
      GROUP_CONCAT(cows.bull_name, ', ') AS cows_bull_names,
      GROUP_CONCAT(injection_costs_and_ai_dates.date, ', ') AS injection_dates,
      GROUP_CONCAT(injection_costs_and_ai_dates.cost, ', ') AS injection_costs
    FROM 
      users 
    INNER JOIN 
      cows ON users.id = cows.user_id 
    INNER JOIN 
      injection_costs_and_ai_dates ON cows.id = injection_costs_and_ai_dates.cow_id 
    GROUP BY 
      users.name, users.phone_number, users.address;
  `;

  try {
    db.all(sql, (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(rows);
    });
  } catch (error) {
    console.error('Error executing query:', error);
  }
}


async function deleteAllRecords() {
  await User.deleteAllUsers();
  await Cow.deleteAllCows();
}


async function addNewCowRecordToUser(userId, {cowName, cowBreed, bullName, injectionCostsAndAiDates}) {
    const user = await User.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await Cow.addNewCow(userId, cowName, cowBreed, bullName, injectionCostsAndAiDates);
}


module.exports = {
  createNewRecord,
  addNewCowRecordToUser,
  getAllRecords,
  deleteAllRecords
}