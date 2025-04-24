// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useContext, ReactNode } from 'react';
import { UserContext } from '../contexts/UserContext';
import Spinner from '../components/Spinner/Spinner';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useContext(UserContext) || {};
    if (loading)
        return <Spinner width={16} height={16} fillColor="fill-violet-800" />;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;
