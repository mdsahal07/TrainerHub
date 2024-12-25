const express = require('express');
const router = express.Router();
const { getClientDashboard } = require('../controllers/dashController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/client', verifyToken, getClientDashboard);

module.exports = router;
