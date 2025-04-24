import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import Modal from '../../components/Modal/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm/AddIncomeForm';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert/DeleteAlert';
import IncomeList from '../../components/Income/IncomeList/IncomeList';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
    useUserAuth();
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{
        show: boolean;
        data: string | null;
    }>({
        show: false,
        data: null,
    });
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
    const handleAddIncome = async (income: {
        source: string;
        amount: number;
        date: string;
        icon: string;
    }) => {
        const { source, amount, date, icon } = income;
        if (!icon) {
            toast.error('Icon is Required!');
            return;
        }
        if (!source.trim()) {
            toast.error('Source is Required!');
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error('Amount should be a valid number and greater than 0');
            return;
        }
        if (!date) {
            toast.error('Date is Required!');
            return;
        }
        try {
            const response = await axiosInstance.post(
                API_PATH.INCOME.ADD_INCOME,
                { source, amount, date, icon }
            );
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success(response.data.message);
                fetchIncomeDetails();
            }
        } catch (error: any) {
            console.log(
                'Error adding income:',
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || error.message);
        } finally {
            fetchIncomeDetails();
        }
    };
    const handleDeleteIncome = async (id: string | null) => {
        if (!id) {
            toast.error('Income Id is Required!');
            return;
        }
        try {
            const response = await axiosInstance.delete(
                API_PATH.INCOME.DELETE_INCOME(id)
            );
            if (response.status === 200) {
                setOpenDeleteAlert({ show: false, data: null });
                toast.success(response.data.message);
                fetchIncomeDetails();
            }
        } catch (error: any) {
            console.log(
                'Error deleting income: ',
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || error.message);
        }
    };
    const handlePDFDownloadIncomeDetails = async () => {};
    const handleExcelDownloadIncomeDetails = async () => {};

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
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id: string) =>
                            setOpenDeleteAlert({ show: true, data: id })
                        }
                        onDownloadPDF={handlePDFDownloadIncomeDetails}
                        onDownloadExcel={handleExcelDownloadIncomeDetails}
                    />
                </div>
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() =>
                        setOpenDeleteAlert({ show: false, data: null })
                    }
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income?"
                        onDelete={() =>
                            handleDeleteIncome(openDeleteAlert.data)
                        }
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Income;
