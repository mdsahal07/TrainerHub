import express from 'express';
import { getClientById } from '../../controllers/clientDetails.js';

const router = express.Router();

router.get('/:id', (req, res, next) => { console.log("Client Details route"); next(); }, getClientById);

export default router;
