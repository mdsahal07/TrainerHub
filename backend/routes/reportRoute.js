import express from 'express';
import { createReport } from '../controllers/reportController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createReport);

export default router;
