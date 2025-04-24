import { LuDownload } from 'react-icons/lu';
import { DeleteAlertProps } from '../../../Types';
import TransactionInfoCard from '../../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseList = (props: DeleteAlertProps) => {
    const { transactions, onDelete, onDownloadPDF, onDownloadExcel } = props;
    return (
        <div className="card">
            <div className="flex flex-col items-center justify-between sm:flex-row">
                <h5 className="text-lg">All Expenses</h5>
                <div className="flex">
                    <button className="card-btn m-1" onClick={onDownloadPDF}>
                        <LuDownload className="text-base" /> Download PDF
                    </button>
                    <button className="card-btn m-1" onClick={onDownloadExcel}>
                        <LuDownload className="text-base" /> Download Excel
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format('DD-MM-YYYY')}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn={false}
                        onDelete={() => onDelete(expense._id ?? '')}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
