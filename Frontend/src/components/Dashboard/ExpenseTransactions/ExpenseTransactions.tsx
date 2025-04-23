import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../../Cards/TransactionInfoCard';
import moment from 'moment';

interface ExpenseTransactionsProps {
    transactions: any[]; // Replace 'any' with the actual type of your transactions
    onSeeMore: () => void;
}

const ExpenseTransactions = (props: ExpenseTransactionsProps) => {
    const { transactions, onSeeMore } = props;
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h2 className="text-lg">Expenses</h2>
                <button onClick={onSeeMore} className="card-btn">
                    See More <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactions.slice(0, 5).map((transaction) => (
                    <TransactionInfoCard
                        key={transaction._id}
                        title={transaction.category}
                        icon={transaction.icon}
                        date={moment(transaction.date).format('DD-MM-YYYY')}
                        amount={transaction.amount}
                        type="expense"
                        hideDeleteBtn={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseTransactions;
