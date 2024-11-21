const express = require('express');
const multer = require('multer');
const accountControllers = require("../controllers/account-controllers");

const multerStorage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
}).single('profilePicture'); // Expect a single file with the name 'profilePicture'

const router = express.Router();

// User registration route
router.post("/register", upload, accountControllers.registerUser);
router.post("/login", accountControllers.login);

module.exports = router;
