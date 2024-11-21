const express = require("express");

const dashboardControllers = require("../controllers/dashboard-controllers");

const router = express.Router();

// router.get("/getuserchallenges", dashboardControllers.getChallengesByUserId);
router.get("/", dashboardControllers.getUserChallenges);
router.get("/userchallenges/:id", dashboardControllers.getChallengesByUserId);


module.exports = router;
