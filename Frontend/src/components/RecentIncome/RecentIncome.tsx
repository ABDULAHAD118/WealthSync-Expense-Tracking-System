import { LuArrowRight } from 'react-icons/lu';
import { RecentTransactionsProps, TransactionInfoCardProps } from '../../Types';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = (props: RecentTransactionsProps) => {
    const { transactions, onSeeMore } = props;
    return (
        <div className="card">
            <div className="item-center flex justify-between">
                <h5 className="text-lg">Income</h5>
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
                                item.type == 'income'
                                    ? item.category
                                    : item.source
                            }
                            icon={item.icon}
                            date={moment(item.date).format('DD-MM-YYYY')}
                            amount={item.amount}
                            type="income"
                            hideDeleteBtn={true}
                        />
                    ))}
            </div>
        </div>
    );
};

export default RecentIncome;
