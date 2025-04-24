const Income = require('../models/income.model');
const Expense = require('../models/expense.model');
const { Types } = require('mongoose');

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: '$amount' },
                },
            },
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    totalExpense: { $sum: '$amount' },
                },
            },
        ]);

        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransaction.reduce((sum, transaction) => {
            sum + transaction.amount, 0;
        });

        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransaction.reduce((sum, transaction) => {
            sum + transaction.amount, 0;
        });

        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map((transaction) => ({
                ...transaction.toObject(),
                type: 'income',
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map((transaction) => ({
                ...transaction.toObject(),
                type: 'expense',
            })),
        ].sort((a, b) => b.date - a.date);
        res.json({
            totalBalance: (totalIncome[0]?.totalIncome || 0) - (totalExpense[0]?.totalExpense || 0),
            totalIncome: totalIncome[0]?.totalIncome || 0,
            totalExpense: totalExpense[0]?.totalExpense || 0,
            expenseLast30Days: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction,
            },
            incomeLast60Days: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransaction,
            },
            recentTransaction: lastTransaction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = { getDashboardData };
