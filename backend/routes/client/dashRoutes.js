import express from 'express';
import { getClientDashboard } from '../../controllers/dashController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res, next) => { console.log("Dashboard route", req.user); next(); }, getClientDashboard);

export default router;
