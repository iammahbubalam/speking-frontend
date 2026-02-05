import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* The AuthLayout now acts as a clean slate wrapper */}
            {/* Individual pages (Login, Register) handle their own layout structure (Split screen, etc.) */}
            <Outlet />
        </div>
    );
};

export default AuthLayout;
