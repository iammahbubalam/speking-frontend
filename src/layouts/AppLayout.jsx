import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import {
    LayoutDashboard,
    LogOut,
    Sparkles,
    Search,
    Bell,
    ArrowLeft
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const AppLayout = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo & Brand + Back Button */}
                    <div className="flex items-center gap-4">
                        {/* Intelligent Back Button */}
                        {location.pathname !== '/dashboard' && (
                            <button
                                onClick={() => navigate(-1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                title="Go Back"
                            >
                                <ArrowLeft size={18} />
                            </button>
                        )}

                        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:inline">
                                Speking<span className="text-blue-600">.</span>
                            </span>
                        </button>
                    </div>

                    {/* Center Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/speaking"
                            className={({ isActive }) => cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            Speaking
                        </NavLink>
                        <NavLink
                            to="/leaderboard"
                            className={({ isActive }) => cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            Leaderboard
                        </NavLink>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all w-48 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
                            <Bell size={20} className="text-slate-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>

                        {/* Level Badge */}
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
                            <span>Level {user?.level || 12}</span>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="Avatar" />
                            </div>
                            <button
                                onClick={() => useAuthStore.getState().logout()}
                                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-slate-500"
                                title="Sign out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white mt-auto shrink-0">
                <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-400">
                    © 2024 Speking. AI-Powered English Learning Platform.
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
