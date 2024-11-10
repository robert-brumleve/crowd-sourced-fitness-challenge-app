const express = require('express');
const accountControllers = require("../controllers/account-controllers");

const router = express.Router();

// User registration route
router.post('/register', accountControllers.registerUser);
router.post('/login', accountControllers.login);

module.exports = router;
