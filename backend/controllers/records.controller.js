const Record = require("../models/record.model");
const errorHandler = require("../utils/errorHandler");

async function createNewRecord(req, res, next) {
  try {
    const { user, cows } = req.body;
    const newRecord = await Record.createNewRecord(user, cows);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "New record created successfully"
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


async function addNewCowRecordToUser(req, res, next) {
  try {
    const userId = req.params.userId;
    await Record.addNewCowRecordToUser(userId, ...Object.values(req.body));
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `A new cow record was successfully created for user ID: ${userId}`
    });
  } catch(err) {
    if (err.message.includes("User not found")) {
      return next(errorHandler(404, "User not found"));
    }
    next(err);
  }
}


async function deleteAllRecords(req, res, next) {
  try {
    await Record.deleteAllRecords();
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}


module.exports = {
  createNewRecord,
  getAllRecords,
  deleteAllRecords,
  addNewCowRecordToUser
};