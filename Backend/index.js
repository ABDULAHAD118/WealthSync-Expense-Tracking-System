require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDb = require('./config/db');
const authRoutes = require('./routes/auth.route');
const incomeRoutes = require('./routes/income.route');
const expenseRoutes = require('./routes/expense.route');
const dashboardRoutes = require('./routes/dashboard.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(express.json());

(async () => {
    await connectDb();
})();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
