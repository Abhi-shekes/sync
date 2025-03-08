const express = require("express");
const router = express.Router();
const signup = require("../controllers/authController/signup");
const login = require("../controllers/authController/login");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
