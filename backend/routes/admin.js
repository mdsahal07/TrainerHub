import express from 'express';
import {
	getAllTrainers,
	getAllClients,
	verifyTrainer,
	suspendUser,
	deleteUser,
	getFeedbacks,
	getAdminDash,
} from '../controllers/adminController.js';

import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res, next) => { console.log("Admin dashboard route"); next(); }, getAdminDash)

router.get('/clients', getAllClients);

router.get('/trainers', getAllTrainers);

router.put('/:trainerId/verify', verifyTrainer);

// Suspend a user
router.put('/users/suspend/:userId', (req, res, next) => { console.log("Suspend route"); next(); }, suspendUser);

// Delete a user
router.delete('/users/:userId', deleteUser);

// Get all feedbacks
router.get('/feedbacks', getFeedbacks);

export default router;
