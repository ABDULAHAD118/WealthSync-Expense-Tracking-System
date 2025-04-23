import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import Modal from '../../components/Modal/Modal';

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [openDeleteAlert, setOpenDeleteAlert] = useState({
    //     show: false,
    //     data: null,
    // });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                API_PATH.INCOME.GET_ALL_INCOME
            );
            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error('Error fetching income details:', error);
        } finally {
            setLoading(false);
        }
    };
    // const handleAddIncome = async (income: string) => {};
    // const handleDeleteIncome = async (id: string) => {};
    // const handlePDFDownloadIncomeDetails = async () => {};
    // const handleExcelDownloadIncomeDetails = async () => {};

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="mx-auto my-5">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <div>Add Income Form</div>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Income;
