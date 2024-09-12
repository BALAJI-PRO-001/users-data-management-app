const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { 
  login, logOut,
  downloadUsersRecords,
  createNewUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers
} = require("../controllers/admin.controller");

router.post("/login", login)
      .get("/log-out", logOut)
      .post("/users", verifyAdminAuthenticationToken, createNewUser)
      .get("/users/all", verifyAdminAuthenticationToken, getUsers)
      .get("/users/:id", verifyAdminAuthenticationToken, getUser)
      .patch("/users/:id", verifyAdminAuthenticationToken, updateUser)
      .delete("/users/:id", verifyAdminAuthenticationToken, deleteUser) 
      .get("/users-records/download", verifyAdminAuthenticationToken, downloadUsersRecords)
      .delete("/users/clear/all", verifyAdminAuthenticationToken, deleteAllUsers);

module.exports = router;