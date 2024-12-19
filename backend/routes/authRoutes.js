const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const { validateUser } = require('../validator/userValidator');

router.post("/register", (req, res, next) => {
	console.log("Route");
	next();
}, validateUser, register);


router.post("/login", (req, res, next) => {
	console.log("login Route");
	next();
}, login);
module.exports = router;

