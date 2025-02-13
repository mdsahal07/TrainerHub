import express from 'express';
import { getTrainerDashboard } from '../../controllers/trainer/dashController.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { acceptedClients } from '../../controllers/trainer/clientsList.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res, next) => { console.log("Trainer Dashboard router"); next(); }, getTrainerDashboard);

router.get('/your-clients', verifyToken, (req, res, next) => { console.log("Clients list router"); next(); }, acceptedClients);


export default router;
