const express = require('express');
const { registerUser } = require('../controllers/account-controllers');  // Importing the controller functions

const router = express.Router();

// User registration route
router.post('/register', registerUser);

module.exports = router;
