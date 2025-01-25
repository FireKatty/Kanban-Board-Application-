const express = require("express");
const router = express.Router();

const {signup,check_email,login} = require("../authController/userAuthentication");

// Define the routes
router.post('/signup',signup);
router.post('/check-email',check_email);
router.post('/login',login);

module.exports = router;
