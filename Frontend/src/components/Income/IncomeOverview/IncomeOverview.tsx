import { useEffect, useState } from 'react';
import {
    RecentTransactionsProps,
    TransactionInfoCardProps,
} from '../../../Types';
import { prepareIncomeBarChartData } from '../../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../../Charts/CustomBarChart';

const IncomeOverview = (props: RecentTransactionsProps) => {
    const { transactions, onAddIncome } = props;
    const [chartData, setChartData] = useState<TransactionInfoCardProps[]>([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions || []);
        setChartData(result);
    }, [transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="mt-0.5 text-xs text-gray-400">
                        Track your earnings over time and analyze your income
                        trends.
                    </p>
                </div>
                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" /> Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverview;
