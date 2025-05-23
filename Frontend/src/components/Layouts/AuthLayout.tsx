import { ReactNode } from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import Chart from '../../assets/images/Chart.png';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex">
            <div className="h-screen w-screen px-12 pt-8 pb-12 md:w-[68vw]">
                <h2 className="text-lg font-bold text-purple-800">
                    WealthSync
                </h2>
                {children}
            </div>
            <div className="bg-auth-bg-img relative hidden h-screen w-[48vw] overflow-hidden bg-violet-50 bg-cover bg-center bg-no-repeat p-8 md:block">
                <div className="absolute -top-7 -left-5 h-48 w-48 rounded-[40px] bg-purple-600" />
                <div className="absolute top-[30%] -right-10 h-56 w-48 rounded-[40px] border-[20px] border-fuchsia-600" />
                <div className="absolute -bottom-7 -left-5 h-48 w-48 rounded-[40px] bg-violet-500" />
                <div className="z-20 grid grid-cols-1">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income & Expenses"
                        value="430,000"
                        color="bg-primary"
                    />
                </div>
                <img
                    src={Chart}
                    alt={Chart}
                    title={Chart}
                    className="absolute bottom-10 w-64 shadow-lg shadow-blue-400/15 lg:w-[90%]"
                />
            </div>
        </div>
    );
};

export default AuthLayout;

const StatsInfoCard = ({
    icon,
    label,
    value,
    color,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    color: string;
}) => {
    return (
        <div className="z-10 flex gap-6 rounded-xl border border-gray-200/50 bg-white p-4 shadow-md shadow-purple-400/10">
            <div
                className={`flex h-12 w-12 items-center justify-center text-white ${color} rounded-full drop-shadow-xl`}
            >
                {icon}
            </div>
            <div className="ml-4">
                <h6 className="mb-1 text-xs text-gray-500">{label}</h6>
                <span className="text-[20px]">${value}</span>
            </div>
        </div>
    );
};
