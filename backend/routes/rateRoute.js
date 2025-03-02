import express from 'express';
import { getRatings, submitRating } from '../controllers/RateController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:trainerId', verifyToken, (req, res, next) => { console.log("GET Rating routes"); next(); }, getRatings);
router.post('/', verifyToken, (req, res, next) => { console.log("Rating routes"); next(); }, submitRating);

export default router;
