import express from 'express';
import { register, login, forgotPassword } from '../controllers/authController.js';
import { validateUser } from '../middleware/userValidator.js';

const router = express.Router();

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

export default router;

