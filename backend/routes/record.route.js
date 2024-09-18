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
  addNewInjectionInfoAndAiDatesToCow,
  removeInjectionInfoAndAiDatesFormCow
} = require("../controllers/records.controller");


router.get("/records/all", verifyAdminAuthenticationToken, getAllRecords)
      .get("/records/:userId", verifyAdminAuthenticationToken, getRecord)
      .get("/records/download", verifyAdminAuthenticationToken, downloadRecords);

router.post("/records", verifyAdminAuthenticationToken, createNewRecord)
      .post("/records/:userId/cows",verifyAdminAuthenticationToken, addNewCowRecordToUser)
      .post("/records/:userId/cows/:cowId/inject-info-ai-dates", verifyAdminAuthenticationToken, addNewInjectionInfoAndAiDatesToCow);

      
router.delete("/records/all", verifyAdminAuthenticationToken, deleteAllRecords)
      .delete("/records/:userId/cows/:cowId", verifyAdminAuthenticationToken, removeCowFormUser)
      .delete("/records/:userId/cows/:cowId/inject-info-ai-dates/:id", verifyAdminAuthenticationToken, removeInjectionInfoAndAiDatesFormCow);

module.exports = router;
