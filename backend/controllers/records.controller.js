const Record = require("../models/record.model");
const errorHandler = require("../utils/errorHandler");

async function createNewRecord(req, res, next) {
  try {
    const { user, cows } = req.body;
    await Record.createNewRecord(user, cows);
  
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "New record created successfully",
    });
  } catch(err) {
    if (err.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_number")) {
      return next(errorHandler(409, "Duplicate Key (Phone Number)"));
    }
    next(err);
  }
}



async function getAllRecords(req, res, next) {
  try {
    const records = await Record.getAllRecords();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        records: records
      }
    });
  } catch(err) {
    next(err);
  }
}



async function getRecord(req, res, next) {
  const { userId } = req.params;
  try {
    const record = await Record.getRecordByUserId(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        record: record
      }
    });
  } catch(err) {
    if (err.message.includes("No user found for the given ID")) {
      return next(errorHandler(404, `Record not found for the given user ID: ${userId}.`));
    }
    next(err);
  }
}


async function addNewCowRecordToUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const { cowName, cowBreed, bullName, injectionInfoAndAiDates } = req.body;
    await Record.addNewCowRecordToUser(userId, cowName, cowBreed, bullName, injectionInfoAndAiDates);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `A new cow record was successfully created for user ID: ${userId}`
    });
  } catch(err) {
    if (err.message.includes("No user found for the given ID")) {
      return next(errorHandler(404, err.message));
    }
    next(err);
  }
}


// async function addNewInjectionInfoAndAiDates(req, res, next) {
//   try {
    
//     await Record.addNewInjectionInfoAndAiDatesToCow(cowId, );
//   } catch(err) {
//     next(err);
//   }
// }


async function deleteAllRecords(req, res, next) {
  try {
    await Record.deleteAllRecords();
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}


async function removeCowFormUser(req, res, next) {
  try {
    const { userId, cowId } = req.body;
    await Record.removeCowFormUser(userId, cowId);
  } catch(err) {
    next(err);
  }
}


async function downloadRecords(req, res, next) {
  try {
    await Record.saveRecordsToFile();
  } catch(err) {
    next(err);
  }
}

module.exports = {
  createNewRecord,
  getAllRecords,
  getRecord,
  deleteAllRecords,
  addNewCowRecordToUser,
  downloadRecords,
  removeCowFormUser
};