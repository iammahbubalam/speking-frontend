import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4 text-2xl shadow-lg shadow-violet-200">
                    S
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Sign in to Speking
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Or{' '}
                    <a href="#" className="font-medium text-violet-600 hover:text-violet-500 transition-colors">
                        start your 14-day free trial
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-2xl sm:px-10 border border-slate-100 relative overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
