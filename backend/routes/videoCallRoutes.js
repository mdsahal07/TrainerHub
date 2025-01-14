import express from 'express';
import { startCall, joinCall, endCall } from '../controllers/videoCallController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.post('/start', verifyToken, (req, res, next) => { console.log("Router start call"); next(); }, startCall);

router.post('/join', verifyToken, (req, res, next) => { console.log("Router join call"); next(); }, joinCall);

router.post('/end', verifyToken, (req, res, next) => { console.log("Router end call"); next(); }, endCall);

export default router;
