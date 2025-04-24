import moment from 'moment';
import { TransactionInfoCardProps } from '../Types';

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name: string) => {
    if (!name) return '';
    const words = name.split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        if (words[i]) {
            initials += words[i][0];
        }
        return initials.toUpperCase();
    }
};

export const addThousandSeparator = (num: number | null): string => {
    if (num == null || isNaN(num)) return '';
    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (
    data: TransactionInfoCardProps[]
) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
};

export const prepareIncomeBarChartData = (data: TransactionInfoCardProps[]) => {
    const storedData = [...data].sort(
        (a, b) =>
            new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
    );

    const chartData = storedData.map((item) => ({
        month: moment(item?.date).format('DD-MMM'),
        category: item?.source,
        amount: item?.amount,
    }));

    return chartData;
};
export const prepareExpenseLineChartData = (
    data: TransactionInfoCardProps[]
) => {
    const storedData = [...data].sort(
        (a, b) =>
            new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
    );

    const chartData = storedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
};
