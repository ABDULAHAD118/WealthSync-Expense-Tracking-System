const Expense = require('../models/expense.model');
const xlsx = require('xlsx');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');

const addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, amount, category, date } = req.body;
        if (!icon || !amount || !category) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const expense = await Expense.create({
            userId,
            icon,
            amount,
            category,
            date,
        });
        if (expense) {
            return res.status(201).json({ message: 'Expense added successfully', Expense });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        if (expenses.length === 0) {
            return res.status(404).json({ message: 'No expense found' });
        }
        return res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteExpense = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
        const expense = await Expense.findOneAndDelete({ _id: id, userId });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const downloadPdfExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        if (expense.length === 0) {
            return res.status(404).json({ message: 'No expense found' });
        }
        const data = expense.map((item) => ({
            icon: item.icon,
            amount: item.amount,
            category: item.category,
            date: item.date.toISOString().split('T')[0],
        }));

        // Generate PDF file
        const pdfFileName = 'Expense_Details.pdf';
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfFileName));
        doc.fontSize(16).text('Expense Details', { align: 'center' });
        doc.moveDown();
        await doc.table(
            {
                headers: ['Sr.No.', 'Icon', 'Amount', 'Category', 'Date'],
                rows: data.map((item, index) => [
                    index + 1,
                    item.icon,
                    item.amount,
                    item.category,
                    item.date,
                ]),
            },
            {
                prepareHeader: () => doc.fontSize(12),
                prepareRow: (row, i) => doc.fontSize(10),
            }
        );
        doc.end();

        res.download(pdfFileName);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const downloadExcelExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        if (expense.length === 0) {
            return res.status(404).json({ message: 'No expense found' });
        }
        const data = expense.map((item) => ({
            icon: item.icon,
            amount: item.amount,
            category: item.category,
            date: item.date.toISOString().split('T')[0],
        }));

        // Generate PDF file
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense Details');
        const fileName = 'Expense_Details.xlsx';
        xlsx.writeFile(wb, fileName);

        res.download(fileName);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadPdfExpense,
    downloadExcelExpense,
};
