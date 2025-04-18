import { InfoCardProps } from '../../Types';

const InfoCard = (props: InfoCardProps) => {
    const { icon, label, value, color } = props;
    return (
        <div className="flex gap-6 rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
            <div
                className={`flex h-14 w-14 items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
            >
                {icon}
            </div>
            <div>
                <h5 className="mb-1 text-sm text-gray-500">{label}</h5>
                <span className="text-[22px]">${value}</span>
            </div>
        </div>
    );
};

export default InfoCard;
