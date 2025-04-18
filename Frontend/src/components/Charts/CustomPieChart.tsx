import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import { CustomPieChartProps } from '../../Types';
import CustomLegend from './CustomLegend';

const CustomPieChart = (props: CustomPieChartProps) => {
    const { data, label, totalAmount, color, showTextAnchor } = props;
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={color[index % color.length]}
                            className="cursor-pointer"
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <div>ddd</div>
                {showTextAnchor && (
                    <svg>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bol"
                        >
                            {totalAmount}
                        </text>
                    </svg>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
