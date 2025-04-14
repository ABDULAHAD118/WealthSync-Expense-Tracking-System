const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/auth.controller');

const { authMiddleware, verifyToken } = require('../middleware/auth.middleware');
const uploadImageMiddleware = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/register', uploadImageMiddleware, registerUser);
router.post('/login', loginUser);
router.get('/getUser', authMiddleware, getUserInfo);
router.get('/verifyToken', verifyToken);

module.exports = router;
