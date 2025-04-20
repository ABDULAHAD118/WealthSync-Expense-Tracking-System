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
