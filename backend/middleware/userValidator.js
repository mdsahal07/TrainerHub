import { body, validationResult } from 'express-validator';

export const validateUser = [
	body('fname').notEmpty().withMessage('Name is required'),
	body('username').notEmpty().withMessage('Username is required'),
	body('email').isEmail().withMessage('Email is invalid'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	body('role').notEmpty().withMessage('Role is required'),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
		}
		next(); // Proceed to the controller if no errors
	},
];

