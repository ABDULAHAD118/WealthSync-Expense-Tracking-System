import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { RecentTransactionsProps, TransactionInfoCardProps } from '../../Types';

const RecentTransactions = (props: RecentTransactionsProps) => {
    const { transactions, onSeeMore } = props;
    return (
        <div className="card">
            <div className="item-center flex justify-between">
                <h5 className="text-lg">Recent Transactions</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactions
                    ?.slice(0, 5)
                    .map((item: TransactionInfoCardProps) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={
                                item.type == 'expense'
                                    ? item.category
                                    : item.source
                            }
                            icon={item.icon}
                            date={moment(item.date).format('DD MM YYYY')}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
