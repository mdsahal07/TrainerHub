// backend/routes/requests.js
import express from 'express';
const router = express.Router();
import { getPendingRequests, updateRequestStatus, getClientProfile } from '../../controllers/trainer/reqHandler.js';

router.get('/trainer/:trainerId/pending', getPendingRequests); // Get pending requests
router.patch('/trainer/:trainerId/requests/:requestId', updateRequestStatus); // Accept/decline requests
router.get('/clients/:clientId', getClientProfile); // Get client profile

module.exports = router;
