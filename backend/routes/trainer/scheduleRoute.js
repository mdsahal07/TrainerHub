import express from 'express';
import { createSchedule, getSchedulesByDate, getUserByUsername, deleteSchedule, getUsernameById } from '../../controllers/trainer/scheduler.js';

const router = express.Router();

router.get('/:trainerId/date/:date', (req, res, next) => { console.log("GET user id"); next(); }, getSchedulesByDate);
router.post('/create', (req, res, next) => { console.log("Create Schedule Router"); next(); }, createSchedule);
router.get('/:trainerId', (req, res, next) => { console.log("GET schedule router"); next(); }, getUserByUsername);
router.delete('/delete/:slotId', (req, res, next) => { console.log("Scedule delete router"); next(); }, deleteSchedule);
router.get('/trainer/:trainerId', (req, res, next) => { console.log("Getting trainer name"); next(); }, getUsernameById);

export default router;
