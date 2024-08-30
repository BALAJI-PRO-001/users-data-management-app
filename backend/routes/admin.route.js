const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { 
  login, 
  downloadUsersRecords,
  createNewUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/admin.controller");

router.post("/login", login)
      .post("/users", verifyAdminAuthenticationToken, createNewUser)
      .get("/users/all", verifyAdminAuthenticationToken, getUsers)
      .get("/users/:id", verifyAdminAuthenticationToken, getUser)
      .patch("/users/:id", verifyAdminAuthenticationToken, updateUser)
      .delete("/users/:id", deleteUser) 
      .get("/users-records/download", verifyAdminAuthenticationToken, downloadUsersRecords);

module.exports = router;