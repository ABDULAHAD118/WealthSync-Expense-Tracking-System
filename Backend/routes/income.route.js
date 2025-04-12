const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
    getAllIncome,
    addIncome,
    deleteIncome,
    downloadIncome,
} = require('../controllers/income.controller');
const router = express.Router();

router.post('/add', authMiddleware, addIncome);
router.get('/get', authMiddleware, getAllIncome);
router.get('/download', authMiddleware, downloadIncome);
router.delete('/:id', authMiddleware, deleteIncome);

module.exports = router;
