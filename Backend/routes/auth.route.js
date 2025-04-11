const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/auth.controller');

const authMiddleware = require('../middleware/auth.middleware');
const uploadImageMiddleware = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', authMiddleware, getUserInfo);
router.post('/upload-image', uploadImageMiddleware, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ message: 'Image uploaded successfully', file: req.imageURL });
});

module.exports = router;
