export interface UserContextType {
    user?: UserType | null;
    updateUser?: (userData: any) => void;
    clearUser?: () => void;
    token?: string | null;
    setToken?: (token: string | null) => void;
}

export interface UserType {
    _id: string;
    fullName: string;
    email: string;
    profileImageUrl: string;
}
