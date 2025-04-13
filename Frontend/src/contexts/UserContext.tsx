import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserContextType, UserType } from '../Types';

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const updateUser = (userData: UserType) => {
        // Check if token exists in local storage and set it to state
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        } else {
            setToken(null);
        }
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    useEffect(() => {
        // Check if token exists in local storage and set it to state
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setToken(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, token }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
