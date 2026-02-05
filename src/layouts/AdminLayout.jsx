import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, Radio } from 'lucide-react';
import { cn } from '../layouts/AppLayout';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
            isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
        )}
    >
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
    </NavLink>
);

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
            <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-900">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-blue-500 tracking-wider">COMMAND<span className="text-white">CENTER</span></h1>
                    <p className="text-xs text-slate-500 mt-1">Super Admin Console</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <div className="text-xs font-bold text-slate-600 uppercase mb-2 px-2 mt-4">Main</div>
                    <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Overview" />
                    <NavItem to="/admin/students" icon={Users} label="Student Manager" />

                    <div className="text-xs font-bold text-slate-600 uppercase mb-2 px-2 mt-6">Content</div>
                    <NavItem to="/admin/questions" icon={FileText} label="Question Bank" />
                    <NavItem to="/admin/mock-builder" icon={Settings} label="Mock Builder" />

                    <div className="text-xs font-bold text-slate-600 uppercase mb-2 px-2 mt-6">Live</div>
                    <NavItem to="/admin/live" icon={Radio} label="Class Monitor" />
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
