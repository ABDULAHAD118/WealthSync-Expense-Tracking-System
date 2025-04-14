// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useContext, ReactNode } from 'react';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useContext(UserContext) || {};
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;
