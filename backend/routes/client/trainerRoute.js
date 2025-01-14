import express from 'express';
import { getTrainerById } from '../../controllers/trainerController.js';
import { reqStatus, sendReq, respondReq, cancelReq, trainerReq } from '../../controllers/reqController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get("/:id", (req, res, next) => { next(); }, getTrainerById);

router.get('/status/:trainerId', verifyToken, (req, res, next) => { console.log("Request status router"); next(); }, reqStatus);

router.post('/send-req', verifyToken, (req, res, next) => { console.log("Request router"); next(); }, sendReq);

router.post('/cancel-req', verifyToken, (req, res, next) => { console.log("Cancel router"); next(); }, cancelReq);

router.get('/pending-req', verifyToken, (req, res, next) => { console.log("Pending Request Router"); next(); }, trainerReq);

router.post('/respont-req', verifyToken, (req, res, next) => { console.log("Respond router"); next(); }, respondReq);


export default router;
