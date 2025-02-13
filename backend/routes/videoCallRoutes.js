import express from 'express';
import { startVideoCall, getNotifications, handleResponse } from '../controllers/videoCallController.js';

const router = express.Router();

router.post('/start', (req, res, next) => { console.log("Videocall start route"); next(); }, startVideoCall);
router.get('/notifications/:clientId', getNotifications);
router.post('/response', handleResponse);

export default router;
