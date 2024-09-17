const express = require("express");
const router = express.Router();
const verifyAdminAuthenticationToken = require("../utils/verifyAdminAuthenticationToken");
const { 
  createNewRecord,
  addNewCowRecordToUser,
  getAllRecords,
  getRecord,
  deleteAllRecords,
  downloadRecords,
  removeCowFormUser,
  addNewInjectionInfoAndAiDatesToCow
} = require("../controllers/records.controller");

router.post("/records",verifyAdminAuthenticationToken, createNewRecord)
      .get("/records/all", verifyAdminAuthenticationToken, getAllRecords)
      .get("/records/:userId", verifyAdminAuthenticationToken, getRecord)
      .delete("/records/all", verifyAdminAuthenticationToken, deleteAllRecords)
      .post("/records/:userId/cows",verifyAdminAuthenticationToken, addNewCowRecordToUser)
      .delete("/records/:userId/cows/:cowId", verifyAdminAuthenticationToken, removeCowFormUser)
      .post("/records/:userId/cows/:cowId/inject-info-ai-dates", verifyAdminAuthenticationToken, addNewInjectionInfoAndAiDatesToCow)
      .get("/records/download", verifyAdminAuthenticationToken, downloadRecords);

module.exports = router;
