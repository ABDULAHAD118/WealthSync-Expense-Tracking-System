const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { getDashboardData } = require('../controllers/dashboard.controller');

const router = express.Router();

router.get('/', authMiddleware, getDashboardData);

module.exports = router;
