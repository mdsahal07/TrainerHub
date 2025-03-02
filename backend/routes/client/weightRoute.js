import express from 'express';
import { getWeightData, updateWeightData } from '../../controllers/weightController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/:clientId', verifyToken, (req, res, next) => { console.log("weight route"); next(); }, getWeightData);
router.post('/:clientId', verifyToken, (req, res, next) => { console.log("weight route update"); next(); }, updateWeightData);

export default router;
