import { useEffect, useState } from 'react';
import {
    RecentTransactionsProps,
    TransactionInfoCardProps,
} from '../../../Types';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../../utils/helper';
import CustomLineChart from '../../Charts/CustomLineChart';

const ExpenseOverview = (props: RecentTransactionsProps) => {
    const { transactions, onAddExpense } = props;
    const [chartData, setChartData] = useState<TransactionInfoCardProps[]>([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions || []);
        setChartData(result);
    }, [transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="mt-0.5 text-xs text-gray-400">
                        Track your spending trends over time and gain insight
                        into where your money goes .
                    </p>
                </div>
                <button className="add-btn" onClick={onAddExpense}>
                    <LuPlus className="text-lg" /> Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverview;
