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
    throw new Error(`User not found for the specified ID: ${id}.`);
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



async function deleteRecord(userId) {
  const user = await User.getUserById(userId);
  if (!user) {
    throw new Error(`User not found for the specified ID: ${userId}.`);
  }
  
  await User.deleteUser(userId);
  const cows = await Cow.getCowsWithInjectionInfoAndAiDatesByUserId(userId);
  for (let cow of cows) {
    await Cow.deleteCow(cow.id);
  }
}



async function addNewCowRecordToUser(userId, cowName, cowBreed, bullName, injectionCostsAndAiDates) {
    const user = await User.getUserById(userId);
    if (!user) {
      throw new Error(`User not found for the specified ID: ${userId}.`);
    }
    return await Cow.addNewCow(userId, cowName, cowBreed, bullName, injectionCostsAndAiDates);
}



async function addNewInjectionInfoAndAiDatesToCow(userId, cowId, name, cost, date) {
  const user = await User.getUserById(userId);
  if (!user) {
    throw new Error(`User not found for the specified ID: ${userId}.`);
  }

  const cow = await Cow.getCowById(cowId);
  if (!cow) {
    throw new Error(`Cow not found for the specified ID: ${cowId}.`);
  }

  await Cow.addNewInjectionInfoAndAiDatesToCow(cowId, [{name, cost, date}]);
}



async function removeInjectionInfoAndAiDatesFormCow(userId, cowId, id) {
  const user = await User.getUserById(userId);
  if (!user) {
    throw new Error(`User not found for the specified ID: ${userId}.`);
  }

  const cow = await Cow.getCowById(cowId);
  if (!cow) {
    throw new Error(`Cow not found for the specified ID: ${cowId}.`);
  }

  const injectionInfoAndAiDates = await Cow.getInjectionInfoAndAiDatesById(id);
  if (!injectionInfoAndAiDates) {
    throw new Error(`Injection info and ai dates not found for the specified ID: ${id}`);
  }

  await Cow.removeInjectionInfoAndAiDatesById(id);
}



async function removeCowFormUser(userId, cowId) {
  const user = await User.getUserById(userId);
  if (!user) {
    throw new Error(`User not found for the specified ID: ${userId}.`);
  }

  const cowToDelete = await Cow.getCowById(cowId);
  if (!cowToDelete) {
    throw new Error(`Cow not found for the specified ID: ${cowId}.`);
  }

  await Cow.deleteCow(cowId);
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
  deleteRecord,
  removeCowFormUser,
  saveRecordsToFile,
  addNewInjectionInfoAndAiDatesToCow,
  removeInjectionInfoAndAiDatesFormCow
}