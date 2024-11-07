const express = require("express");

const challengesControllers = require("../controllers/challenges-controllers");

const router = express.Router();

router.get("/", challengesControllers.getChallenges);

router.post("/", challengesControllers.createChallenge);

router.get("/view/:id", challengesControllers.getChallengeById);

// router.get("/user/:uID", challengesControllers.getChallengesByUserId);

router.delete("/delete/:id", challengesControllers.deleteChallengeById);

router.patch("/update/:id", challengesControllers.updateChallenge);

module.exports = router;
