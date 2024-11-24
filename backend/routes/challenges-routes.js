const express = require("express");

//for image upload
const multer = require("multer");
const multerStorage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
}).single("imageURL");

const challengesControllers = require("../controllers/challenges-controllers");

const router = express.Router();

router.get("/", challengesControllers.getChallenges);

router.post("/", upload, challengesControllers.createChallenge);

router.get("/view/:id", challengesControllers.getChallengeById);

router.delete("/delete/:id", challengesControllers.deleteChallengeById);

router.patch("/update/:id", challengesControllers.updateChallenge);

// router.get("/search/:keywords", challengesControllers.searchChallenge);

router.post("/join", challengesControllers.joinChallenge);

router.get("/challengeWithUser", challengesControllers.challengeWithUser);

module.exports = router;
