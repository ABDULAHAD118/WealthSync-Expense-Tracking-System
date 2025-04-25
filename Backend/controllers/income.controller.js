const xlsx = require('xlsx');
const PDFDocument = require('pdfkit-table');
const Income = require('../models/income.model');

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
const downloadPdfIncome = async (req, res) => {
    const userId = req.user?.id; // Ensure auth middleware attaches req.user

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        if (income.length === 0) {
            return res.status(404).json({ message: 'No income found' });
        }

        const data = income.map((item, index) => [
            index + 1,
            item.icon,
            item.amount,
            item.source,
            item.date.toISOString().split('T')[0],
        ]);

        const doc = new PDFDocument();
        const buffers = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=Income_Details.pdf');
            res.send(pdfBuffer);
        });

        // Title
        doc.fontSize(18).text('Income Details', { align: 'center' });
        doc.moveDown();
        // Table using pdfkit-table

        await doc.table(
            {
                headers: ['Sr.No.', 'Icon', 'Amount', 'Source', 'Date'],
                rows: data,
            },
            {
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
                prepareRow: (row, index) => doc.font('Helvetica').fontSize(10),
            }
        );
        doc.end();
    } catch (error) {
        console.error('PDF generation error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const downloadExcelIncome = async (req, res) => {
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
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income Details');
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=Income_Details.xlsx');
        res.send(buffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addIncome, getAllIncome, deleteIncome, downloadPdfIncome, downloadExcelIncome };
