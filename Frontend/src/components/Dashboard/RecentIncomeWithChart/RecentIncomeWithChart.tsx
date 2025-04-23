import { useEffect, useState } from 'react';
import { TransactionInfoCardProps } from '../../../Types';
import CustomPieChart from '../../Charts/CustomPieChart';

interface RecentIncomeWithChartProps {
    data: TransactionInfoCardProps[];
    totalIncome: number;
}
const RecentIncomeWithChart = (props: RecentIncomeWithChartProps) => {
    const { data, totalIncome } = props;
    const [chartData, setChartData] = useState<
        { name: string; amount: number }[]
    >([]);
    const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];
    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source || '',
            amount: item?.amount || 0,
        }));
        setChartData(dataArr);
    };
    useEffect(() => {
        prepareChartData();
    }, [data]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor={true}
                color={COLORS}
            />
        </div>
    );
};

export default RecentIncomeWithChart;
