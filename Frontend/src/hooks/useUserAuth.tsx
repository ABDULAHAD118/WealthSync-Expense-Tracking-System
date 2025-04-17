import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import axiosInstance from '../utils/axiosInstance';
import { API_PATH } from '../utils/apiPath';
import { useNavigate } from 'react-router-dom';

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext<any>(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) return;
        let isMounted = true;
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(
                    API_PATH.AUTH.GET_USER_INFO
                );
                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                if (isMounted) {
                    clearUser();
                    navigate('/login');
                }
            }
        };
        fetchUserInfo();
        return () => {
            isMounted = false;
        };
    }, [updateUser, clearUser, navigate]);
};
