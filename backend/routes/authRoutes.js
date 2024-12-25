const express = require('express');
const { register, login, forgotPassword } = require('../controllers/authController');
const router = express.Router();
const { validateUser } = require('../middleware/userValidator');


router.post("/register", (req, res, next) => {
	console.log("Route");
	next();
}, validateUser, register);


router.post("/login", (req, res, next) => {
	console.log("login Route");
	next();
}, login);

router.post('/forgot-password', (req, res, next) => {
	console.log("forgot pass route");
	next();
}, forgotPassword);

module.exports = router;

