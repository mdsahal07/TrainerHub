import express from 'express';
import { startVideoCall, getNotifications } from '../controllers/videoCallController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/start', verifyToken, (req, res, next) => { console.log("Videocall start route"); next(); }, startVideoCall);
router.get('/:userId/:userModel', getNotifications);

export default router;
