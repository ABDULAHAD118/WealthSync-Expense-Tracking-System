import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserContextType, UserType } from '../Types';
import axiosInstance from '../utils/axiosInstance';
import { API_PATH } from '../utils/apiPath';

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    const updateUser = (userData: UserType) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get(API_PATH.AUTH.VERIFY_TOKEN);
                setUser(res.data.user);
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser, loading, updateUser, clearUser }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
