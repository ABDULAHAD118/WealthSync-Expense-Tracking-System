import { useState } from 'react';
import { AddFormProps } from '../../../Types';
import Input from '../../Input/Input';
import EmojiPickerPopup from '../../Input/EmojiPickerPopup';
import Spinner from '../../Spinner/Spinner';

const AddExpenseForm = (props: AddFormProps) => {
    const { onAddExpense, loading } = props;
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    });
    const handelChange = (key: string, value: string) => {
        setExpense((prev) => ({ ...prev, [key]: value }));
    };
    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(e) => handelChange('icon', e)}
            />
            <Input
                value={expense.category}
                type="text"
                placeholder="Food, Home Allowance etc"
                label="Category"
                onChange={(e) => handelChange('category', e.target.value)}
            />
            <Input
                value={expense.amount}
                type="number"
                placeholder="1000, 2000 etc"
                label="Amount"
                onChange={(e) => handelChange('amount', e.target.value)}
            />
            <Input
                value={expense.date}
                type="date"
                placeholder="2023-10-01"
                label="Date"
                onChange={(e) => handelChange('date', e.target.value)}
            />
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense?.(expense)}
                >
                    {loading ? (
                        <Spinner
                            width={5}
                            height={5}
                            fillColor="fill-white"
                            screenHeight={true}
                        />
                    ) : (
                        'Add Expense'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
