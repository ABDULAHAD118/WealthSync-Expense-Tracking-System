export interface UserContextType {
    user?: UserType | null;
    updateUser?: (userData: any) => void;
    clearUser?: () => void;
}

export interface UserType {
    _id: string;
    fullName: string;
    email: string;
    profileImageUrl: string;
}
