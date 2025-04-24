import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview/ExpenseOverview';
import Modal from '../../components/Modal/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert/DeleteAlert';
import Spinner from '../../components/Spinner/Spinner';

const Expense = () => {
    useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expenseLoading, setExpenseLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState<{
        show: boolean;
        data: string | null;
    }>({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                API_PATH.EXPENSE.GET_ALL_EXPENSE
            );
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error('Error fetching expense details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (expense: {
        category: string;
        amount: number;
        date: string;
        icon: string;
    }) => {
        const { category, amount, date, icon } = expense;
        if (!icon) {
            toast.error('Icon is Required!');
            return;
        }
        if (!category.trim()) {
            toast.error('Category is Required!');
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
            setExpenseLoading(true);
            const response = await axiosInstance.post(
                API_PATH.EXPENSE.ADD_EXPENSE,
                { category, amount, date, icon }
            );
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success(response.data.message);
                setExpenseLoading(false);
                fetchExpenseDetails();
            }
        } catch (error: any) {
            console.log(
                'Error adding expense:',
                error.response?.data?.message || error.message
            );
            setExpenseLoading(false);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setExpenseLoading(false);
            fetchExpenseDetails();
        }
    };

    const handleDeleteExpense = async (id: string | null) => {
        if (!id) {
            toast.error('Expense Id is Required!');
            return;
        }
        try {
            const response = await axiosInstance.delete(
                API_PATH.EXPENSE.DELETE_EXPENSE(id)
            );
            if (response.status === 200) {
                setOpenDeleteAlert({ show: false, data: null });
                toast.success(response.data.message);
                fetchExpenseDetails();
            }
        } catch (error: any) {
            console.log(
                'Error deleting expense: ',
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const handlePDFDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATH.EXPENSE.DOWNLOAD_PDF_EXPENSE,
                { responseType: 'blob' }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'Expense_details.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast.error('Error downloading PDF');
        }
    };
    const handleExcelDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATH.EXPENSE.DOWNLOAD_EXCEL_EXPENSE,
                { responseType: 'blob' }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading Excel:', error);
            toast.error('Error downloading Excel');
        }
    };
    useEffect(() => {
        fetchExpenseDetails();
    }, []);
    return (
        <DashboardLayout activeMenu="Expense">
            {loading ? (
                <Spinner width={12} height={12} fillColor="fill-violet-800" />
            ) : (
                <div className="mx-auto my-5">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="">
                            <ExpenseOverview
                                transactions={expenseData}
                                onAddExpense={() =>
                                    setOpenAddExpenseModal(true)
                                }
                            />
                        </div>
                        <ExpenseList
                            transactions={expenseData}
                            onDelete={(id: string) =>
                                setOpenDeleteAlert({ show: true, data: id })
                            }
                            onDownloadPDF={handlePDFDownloadExpenseDetails}
                            onDownloadExcel={handleExcelDownloadExpenseDetails}
                        />
                    </div>
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={handleAddExpense}
                            loading={expenseLoading}
                        />
                    </Modal>
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() =>
                            setOpenDeleteAlert({ show: false, data: null })
                        }
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense?"
                            onDelete={() =>
                                handleDeleteExpense(openDeleteAlert.data)
                            }
                        />
                    </Modal>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Expense;
