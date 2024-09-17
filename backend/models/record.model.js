const User = require("./user.model");
const Cow = require("./cow.model");


async function createNewRecord(user, cows) {
  const newUser = await User.addNewUser(user.name, user.phoneNumber, user.address);
  const newCows = [];
  for (let {cowName, cowBreed, bullName, injectionInfoAndAiDates} of cows) {
    const newCow = await Cow.addNewCow(newUser.id, cowName, cowBreed, bullName, injectionInfoAndAiDates);
    newCows.push(newCow);
  }

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      phoneNumber: newUser.phone_number,
      address: newUser.address,
      isCurrentUser: newUser.is_current_user === 1 ? true : false,
      createdAt: newUser.date_and_time 
    },
    cows: [
      ...newCows
    ],
    recordCreatedAt: newUser.date_and_time
  };
}


async function getAllRecords() {
 const users = await User.getAllUsers();
 const cows = await Cow.getAllCowsWithInjectionInfoAndAiDates();
 const records = users.map(({id, name, phone_number, address, is_current_user, date_and_time}) => {
  const userCows = [];

  for (let cow of cows) {
    if (cow.userId == id) {
      const {userId, ...rest} = cow;
      userCows.push(rest);
    }
  }

  return {
    user: {
      id: id,
      name: name,
      phoneNumber: phone_number,
      address: address,
      isCurrentUser: is_current_user === 1 ? true : false,
      createdAt: date_and_time
    },
    cows: userCows,
    recordCreatedAt: date_and_time
  };
 });
 return records;
}


async function getRecordByUserId(id) {
  const user = await User.getUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  const cows = await Cow.getCowsWithInjectionInfoAndAiDatesByUserId(id);

  return {
    user: {
      id: id,
      name: user.name,
      phoneNumber: user.phone_number,
      address: user.address,
      createdAt: user.date_and_time
    },
    cows: cows,
    recordCreatedAt: user.date_and_time
  };
}


async function deleteAllRecords() {
  await User.deleteAllUsers();
  await Cow.deleteAllCows();
}


async function addNewCowRecordToUser(userId, cowName, cowBreed, bullName, injectionCostsAndAiDates) {
    const user = await User.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await Cow.addNewCow(userId, cowName, cowBreed, bullName, injectionCostsAndAiDates);
}


async function addNewInjectionInfoAndAiDatesToCow(cowId, injectionName, injectionCost, aiDate) {
  
}


async function saveRecordsToFile(path) {
  const records = await getAllRecords();
  
}


module.exports = {
  createNewRecord,
  addNewCowRecordToUser,
  getAllRecords,
  getRecordByUserId,
  deleteAllRecords,
  saveRecordsToFile
}