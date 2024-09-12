const errorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const { USERS_RECORDS_CSV_FILE_PATH } = require("../utils/constants");
const convertKeyNameUnderScoreToCamelCase = require("../utils/convertKeyNameUnderscoreToCamelCase");
const convertKeyNameCamelCaseToUnderscore = require("../utils/convertKeyNameCamelCaseToUnderscore");



async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL) {
      return next(errorHandler(404, "Admin not found (Invalid email)"));
    }
    if (!bcryptjs.compareSync(password, process.env.ADMIN_PASSWORD)) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const adminAccessToken = jwt.sign({email: process.env.ADMIN_EMAIL}, process.env.JWT_SECRET_KEY);
    res.status(200).cookie("admin_access_token", adminAccessToken, {httpOnly: true, maxAge: 604800000}).json({
      success: true,
      statusCode: 200,
      message: "Admin logged in successfully"
    });
  } catch(err) {
    next(err);
  }
}


async function createNewUser(req, res, next) {
  try {
    const {name, phoneNumber, address, cowName, cowBreed, bullName, aiDate, injectionCost} = req.body;
    await User.addNewUser(name, phoneNumber, address, cowName, cowBreed, bullName, aiDate, injectionCost);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "New user created successfully"
    });
  } catch(err) {
    if (err.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_number")) {
      return next(errorHandler(409, "Duplicate Key (Phone Number)"));
    }
    next(err);
  }
}


async function getUsers(req, res, next) {
  try {
    let users = await User.getUsers();
    users = users.map((user) => (convertKeyNameUnderScoreToCamelCase(user)));
    res.status(200).json({
      success: true,
      statusCode: 200,
      count: users.length,
      data: {
        users: users
      }
    });
  } catch(err) {
    next(err);
  }
}


async function getUser(req, res, next) {
  try {
    const userID = req.params.id;
    let user = await User.getUser(userID);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    user = convertKeyNameUnderScoreToCamelCase(user);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        user: user
      }
    });
  } catch(err) {
    next(err);
  }
}


async function updateUser(req, res, next) {
  try {
    const userID = req.params.id;
    const userToUpdate = await User.getUser(userID);
    if (!userToUpdate) {
      return next(errorHandler(404, "User not found"));
    }

    if (req.body.id) {
      return next(errorHandler(400, "Cannot updated id"));
    }

    
    let updatedUser = await User.updateUser(userID, convertKeyNameCamelCaseToUnderscore(req.body));
    updatedUser = convertKeyNameUnderScoreToCamelCase(updatedUser);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        user: updatedUser
      }
    });
  } catch(err) {
    if (err.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_number")) {
      return next(errorHandler(409, "Duplicate Key (Phone Number)"));
    }
    next(err);
  }
}


async function deleteUser(req, res, next) {
  try {

  } catch(err) {
    next(err);
  }
}


async function downloadUsersRecords(req, res, next) {
  try {
    res.download(USERS_RECORDS_CSV_FILE_PATH);
  } catch(err) {
    next(err);
  }
}


module.exports = {
  login,
  createNewUser,
  getUsers, getUser,
  updateUser,
  deleteUser,
  downloadUsersRecords
};