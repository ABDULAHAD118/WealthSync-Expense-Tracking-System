import { useEffect, useState } from 'react';
import { TransactionInfoCardProps } from '../../Types';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = (props: { data: TransactionInfoCardProps[] }) => {
    const { data } = props;
    const [chartData, setChartData] = useState<TransactionInfoCardProps[]>([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
    }, [data]);
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            <CustomBarChart data={chartData} />
        </div>
    );
};

export default Last30DaysExpenses;
