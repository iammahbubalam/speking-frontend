import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

const RequireAuth = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
