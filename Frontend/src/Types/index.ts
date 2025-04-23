import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';
export interface UserContextType {
    user?: UserType | null;
    setUser?: (user: UserType | null) => void;
    loading?: boolean;
    updateUser?: (userData: any) => void;
    clearUser?: () => void;
}
export interface UserType {
    _id: string;
    fullName: string;
    email: string;
    profileImageUrl: string;
}
export interface DashboardLayoutProps {
    activeMenu: string;
    children?: ReactNode;
}
export interface SideMenuDataType {
    id: string;
    name: string;
    icon: ReactNode | IconType;
    path: string;
}
export interface CharAvatarProps {
    fullName?: string;
    width?: string;
    height?: string;
    style?: string;
}
export interface InfoCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    color: string;
}
export interface DashboardDataProps {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    totalTransactions: number;
    recentTransaction: TransactionInfoCardProps;
    expenseLast30Days: {
        transaction: TransactionInfoCardProps[];
    };
    incomeLast60Days: {
        transaction: TransactionInfoCardProps[];
    };
}
export interface RecentTransactionsProps {
    transactions?: TransactionInfoCardProps[];
    onSeeMore?: () => void;
    onAddIncome?: () => void;
}
export interface TransactionInfoCardProps {
    _id?: string;
    category?: string;
    source?: string;
    title?: string;
    icon?: string;
    date?: string;
    amount?: number;
    type?: string;
    hideDeleteBtn?: boolean;
}
export interface CustomPieChartProps {
    data?: { name: string; amount: number }[];
    label?: string;
    totalAmount?: string;
    color?: string[];
    showTextAnchor?: boolean;
}
export interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        name: string;
        value: number;
    }[];
}
export interface FinanceOverviewProps {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}
export interface LegendEntry {
    color: string;
    value: string;
}
