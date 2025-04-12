// const PDFDocument = require('pdfkit');
const PDFDocument = require('pdfkit-table');
const Income = require('../models/income.model');
const fs = require('fs');

const addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, amount, source, date } = req.body;
        if (!icon || !amount || !source) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const income = await Income.create({
            userId,
            icon,
            amount,
            source,
            date,
        });
        if (income) {
            return res.status(201).json({ message: 'Income added successfully', income });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        if (incomes.length === 0) {
            return res.status(404).json({ message: 'No income found' });
        }
        return res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteIncome = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
        const income = await Income.findOneAndDelete({ _id: id, userId });
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        return res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const downloadIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        if (income.length === 0) {
            return res.status(404).json({ message: 'No income found' });
        }
        const data = income.map((item) => ({
            icon: item.icon,
            amount: item.amount,
            source: item.source,
            date: item.date.toISOString().split('T')[0],
        }));

        // Generate PDF file
        const pdfFileName = 'Income_Details.pdf';
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfFileName));
        doc.fontSize(16).text('Income Details', { align: 'center' });
        doc.moveDown();
        await doc.table(
            {
                headers: ['#', 'Icon', 'Amount', 'Source', 'Date'],
                rows: data.map((item, index) => [
                    index + 1,
                    item.icon,
                    item.amount,
                    item.source,
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

module.exports = { addIncome, getAllIncome, deleteIncome, downloadIncome };
