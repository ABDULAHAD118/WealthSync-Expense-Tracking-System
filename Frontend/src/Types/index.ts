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
