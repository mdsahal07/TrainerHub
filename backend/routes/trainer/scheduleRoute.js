import express from 'express';
import { createSchedule, getTrainerSchedule, getUserByUsername } from '../../controllers/trainer/scheduler.js';

const router = express.Router();

router.get('/finduser', (req, res, next) => { console.log("GET user id"); next(); }, getUserByUsername);
router.post('/create', (req, res, next) => { console.log("Create Schedule Router"); next(); }, createSchedule);
router.get('/:trainerId', (req, res, next) => { console.log("GET schedule router"); next(); }, getTrainerSchedule);
export default router;
