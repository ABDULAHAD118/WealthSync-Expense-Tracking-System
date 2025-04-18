import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions';
import { DashboardDataProps, TransactionInfoCardProps } from '../../Types';
import FinanceOverview from '../../components/FinanceOverview/FinanceOverview';

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] =
        useState<DashboardDataProps | null>(null);
    const [loading, setLoading] = useState(false);
    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                API_PATH.DASHBOARD.GET_DATA
            );
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong. Please try again later', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="mx-auto my-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandSeparator(
                            dashboardData?.totalBalance || 0
                        )}
                        color="bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandSeparator(
                            dashboardData?.totalIncome || 0
                        )}
                        color="bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandSeparator(
                            dashboardData?.totalExpense || 0
                        )}
                        color="bg-red-500"
                    />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <RecentTransactions
                        transactions={
                            dashboardData?.recentTransaction as TransactionInfoCardProps[]
                        }
                        onSeeMore={() => navigate('/expense')}
                    />
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
