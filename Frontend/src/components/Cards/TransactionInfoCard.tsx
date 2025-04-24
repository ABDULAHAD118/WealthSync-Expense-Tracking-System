import {
    LuTrash2,
    LuTrendingDown,
    LuTrendingUp,
    LuUtensils,
} from 'react-icons/lu';
import { TransactionInfoCardProps } from '../../Types';

const TransactionInfoCard = (props: TransactionInfoCardProps) => {
    const { title, icon, date, amount, type, hideDeleteBtn, onDelete } = props;
    const getAmountStyle = () => {
        if (type === 'income') {
            return 'bg-green-50 text-green-500';
        }
        if (type === 'expense') {
            return 'bg-red-50 text-red-500';
        }
    };
    return (
        <div className="group relative mt-2 flex items-center gap-4 rounded-lg p-3 hover:bg-gray-100/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800">
                {icon ? (
                    <img
                        src={icon}
                        alt={title}
                        title={title}
                        className="h-6 w-6"
                    />
                ) : (
                    <LuUtensils />
                )}
            </div>
            <div className="flex flex-1 items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-700">
                        {title &&
                            title?.charAt(0).toUpperCase() + title?.slice(1)}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{date}</p>
                </div>
                <div className="item-center flex gap-2">
                    {!hideDeleteBtn && (
                        <button
                            className="cursor-pointer text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}
                    <div
                        className={`item-center flex gap-2 rounded-md px-3 py-1.5 ${getAmountStyle()}`}
                    >
                        <h6 className="text-xs font-medium">
                            {type === 'income' ? '+' : '-'}
                            {amount}
                        </h6>
                        {type === 'income' ? (
                            <LuTrendingUp />
                        ) : (
                            <LuTrendingDown />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;
