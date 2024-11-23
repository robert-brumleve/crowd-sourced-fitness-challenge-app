const express = require("express");

const dashboardControllers = require("../controllers/dashboard-controllers");

const router = express.Router();

router.get("/", dashboardControllers.getUserChallenges);
router.get("/userchallenges/:id", dashboardControllers.getChallengesByUserId);
router.get("/userbadges/:id", dashboardControllers.getBadgesByUserId);
router.post("/updatecompleted/:uid/:cid", dashboardControllers.updateUserHasChallenges);

// router.post("/updatecompleted/:id", dashboardControllers.updateUserHasChallenges);



module.exports = router