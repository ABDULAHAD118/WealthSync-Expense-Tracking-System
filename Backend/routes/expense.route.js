const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
    addExpense,
    getAllExpense,
    downloadPdfExpense,
    downloadExcelExpense,
    deleteExpense,
} = require('../controllers/expense.controller');
const router = express.Router();

router.post('/add', authMiddleware, addExpense);
router.get('/get', authMiddleware, getAllExpense);
router.get('/downloadPdf', authMiddleware, downloadPdfExpense);
router.get('/downloadExcel', authMiddleware, downloadExcelExpense);
router.delete('/:id', authMiddleware, deleteExpense);
module.exports = router;
