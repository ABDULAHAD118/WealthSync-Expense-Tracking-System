const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const {
    getAllIncome,
    addIncome,
    deleteIncome,
    downloadPdfIncome,
    downloadExcelIncome,
} = require('../controllers/income.controller');
const router = express.Router();

router.post('/add', authMiddleware, addIncome);
router.get('/get', authMiddleware, getAllIncome);
router.get('/downloadPdf', authMiddleware, downloadPdfIncome);
router.get('/downloadExcel', authMiddleware, downloadExcelIncome);
router.delete('/:id', authMiddleware, deleteIncome);

module.exports = router;
