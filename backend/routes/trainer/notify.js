import express from 'express';
import { sendNotification } from '../../controllers/trainer/notifyController.js';

const router = express.Router();

router.post('/meeting-time', sendNotification);

export default router;
