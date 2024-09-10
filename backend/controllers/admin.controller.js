const errorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const { USERS_RECORDS_CSV_FILE_PATH } = require("../utils/constants");


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
    const {name, phoneNo, address, cowName, breed, bullName, aiDate, injectionCost} = req.body;
    await User.addNewUser(name, phoneNo, address, cowName, breed, bullName, aiDate, injectionCost);
    res.status(201).json({
      success: true,
      message: "New user created successfully"
    });
  } catch(err) {
    if (err.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_no")) {
      return next(errorHandler(409, "Duplicate Key (Phone Number)"));
    }
    next(err);
  }
}


async function getUsers(req, res, next) {
  try {
    const users = await User.getUsers();
    const modifiedUsers = [];
    for (let user of users) {
      modifiedUsers.push({
        id: user.id,
        name: user.name,
        phoneNo: users.phone_no,
        address: user.address,
        cowName: user.cow_name,
        breed: user.breed
      });
    }
    res.status(200).json({
      success: true,
      data: {
        users: modifiedUsers
      }
    });
  } catch(err) {
    next(err);
  }
}


async function getUser(req, res, next) {
  try {

  } catch(err) {
    next(err);
  }
}


async function updateUser(req, res, next) {
  try {
    
  } catch(err) {
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