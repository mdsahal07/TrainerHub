const express = require('express');
const { register, login } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post("/register", [
	body("username").notEmpty().withMessage("Username is required"),
	body("email").notEmpty().withMessage("valid email is required"),
	body("password").isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
], (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	next();
}, register);


router.post("/login", [
	body("email").isEmail().withMessage("Username is required"),
	body("password").notEmpty().withMessage("Password is required")
], (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	next();
}, login);

module.exports = router;

