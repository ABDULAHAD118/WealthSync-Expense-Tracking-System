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
