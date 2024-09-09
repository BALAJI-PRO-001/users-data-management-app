const errorHandler = require("../utils/errorHandler");
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

  } catch(err) {
    next(err);
  }
}


async function getUsers(req, res, next) {
  try {

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