import { FC } from 'react';
import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const CustomBarChart = ({ data }: any) => {
    const getBarColor = (index: number) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    };
    const CustomTooltip: FC<{
        active?: boolean;
        payload?: {
            payload: {
                category: string;
                amount: number;
            };
        }[];
    }> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
                    <p className="mb-1 text-sm font-semibold text-purple-800">
                        {payload[0].payload.category.charAt(0).toUpperCase() +
                            payload[0].payload.category.slice(1)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Amount:{' '}
                        <span className="text-sm font-medium text-gray-900">
                            ${payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };
    return (
        <div className="mt-6 bg-white">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke="none"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke="none"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="amount"
                        fill="#FF8842"
                        radius={[10, 10, 0, 0]}
                        activeDot={{ r: 8, fill: 'yellow' }}
                        activeStyle={{ fill: 'green' }}
                    >
                        {data.map((index: number) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
