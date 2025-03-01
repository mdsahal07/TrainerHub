import express from 'express';
import { getClientDashboard, getTrainers, startVideoCall, getClientVideoCallRoom } from '../../controllers/dashController.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { acceptedTrainers } from '../../controllers/trainerList.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res, next) => { console.log("Dashboard route", req.user); next(); }, getClientDashboard);
router.get('/trainers', verifyToken, getTrainers);
router.post('/startVideoCall', verifyToken, startVideoCall);
router.get('/videoCallRoom', verifyToken, (req, res, next) => { console.log("VideoCallRoom route"); next(); }, getClientVideoCallRoom);
router.get('/your-trainer', verifyToken, (req, res, next) => { console.log("Trainer List router"); next(); }, acceptedTrainers);

export default router;
