import { useState } from 'react';
import { AddIncomeFormProps } from '../../../Types';
import Input from '../../Input/Input';
import EmojiPickerPopup from '../../Input/EmojiPickerPopup';

const AddIncomeForm = (props: AddIncomeFormProps) => {
    const { onAddIncome } = props;
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
    });
    const handelChange = (key: string, value: string) => {
        setIncome((prev) => ({ ...prev, [key]: value }));
    };
    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(e) => handelChange('icon', e)}
            />
            <Input
                value={income.source}
                type="text"
                placeholder="Freelance, Salary etc"
                label="Income Source"
                onChange={(e) => handelChange('source', e.target.value)}
            />
            <Input
                value={income.amount}
                type="number"
                placeholder="1000, 2000 etc"
                label="Amount"
                onChange={(e) => handelChange('amount', e.target.value)}
            />
            <Input
                value={income.date}
                type="date"
                placeholder="2023-10-01"
                label="Date"
                onChange={(e) => handelChange('date', e.target.value)}
            />
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
