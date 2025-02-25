import express from 'express';
import { getClientDashboard, getTrainers, startVideoCall, getClientVideoCallRoom } from '../../controllers/dashController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res, next) => { console.log("Dashboard route", req.user); next(); }, getClientDashboard);
router.get('/trainers', verifyToken, getTrainers);
router.post('/startVideoCall', verifyToken, startVideoCall);
router.get('/videoCallRoom', verifyToken, (req, res, next) => { console.log("VideoCallRoom route"); next(); }, getClientVideoCallRoom);

export default router;
