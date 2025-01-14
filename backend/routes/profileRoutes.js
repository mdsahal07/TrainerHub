import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'; // Middleware to check JWT
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();
// Get user profile (works for both client and trainer)
router.get('/profile', verifyToken, (req, res, next) => { next(); }, getProfile);
// Update user profile (works for both client and trainer)
router.put('/profile', verifyToken, updateProfile);

export default router;
