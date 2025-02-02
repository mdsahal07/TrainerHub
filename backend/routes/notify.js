import express from 'express';
const router = express.Router();
import { createNotification, getNotifications } from '../controllers/notifyController.js';

router.post('/create', createNotification);

router.get('/:userId', getNotifications);

export default router;
