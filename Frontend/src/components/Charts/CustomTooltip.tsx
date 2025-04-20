import { CustomTooltipProps } from '../../Types';

const CustomTooltip = (props: CustomTooltipProps) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
                <p className="mb-1 text-xs font-semibold text-purple-800">
                    {payload[0].name.charAt(0).toUpperCase() +
                        payload[0].name.slice(1).toLowerCase()}
                </p>
                <p className="text-sm text-gray-600">
                    Amount:{' '}
                    <span className="text-sm font-medium text-gray-900">
                        ${payload[0].value}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
