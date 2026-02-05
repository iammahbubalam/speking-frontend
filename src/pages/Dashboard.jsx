import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mic, BookOpen, GraduationCap, Trophy, Target,
    Clock, ArrowRight, Sparkles, Zap, Star,
    Book, Lightbulb, Activity, Brain
} from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';

// --- Components ---

const BentoCard = ({ children, className, onClick, delay = 0 }) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-3xl border border-slate-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}
        style={{ animationFillMode: 'both', animationDelay: `${delay}ms` }}
    >
        {children}
    </div>
);

const ModuleCard = ({ title, subtitle, icon: Icon, color, to, gradient }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(to)} className={`h-full flex flex-col justify-between relative z-10 ${gradient} p-1 rounded-2xl group-hover:p-0 transition-all duration-500`}>
            <div className="bg-white h-full rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative background blob */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${color.bg} rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                        <Icon size={28} />
                    </div>
                </div>

                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:translate-x-1 transition-transform">{title}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">{subtitle}</p>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                        Enter Module <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, icon: Icon, color }) => (
    <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>
            <Icon size={18} />
        </div>
        <div>
            <div className="text-lg font-bold text-slate-900 leading-none">{value}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">{label}</div>
        </div>
    </div>
);

// --- Main Page ---

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">{user?.name || 'Student'}</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">Your learning consistency is improving!</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Online
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-wrap gap-8 md:gap-12 items-center justify-between shadow-sm">
                <StatItem label="Overall Score" value="72" icon={Target} color="bg-blue-100 text-blue-600" />
                <StatItem label="Practice Time" value="4h 12m" icon={Clock} color="bg-emerald-100 text-emerald-600" />
                <StatItem label="Day Streak" value="5" icon={Zap} color="bg-amber-100 text-amber-600" />
                <StatItem label="Rank" value="#420" icon={Trophy} color="bg-violet-100 text-violet-600" />
            </div>

            {/* Main Modules - Equal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Speaking Card */}
                <BentoCard onClick={() => navigate('/speaking')} className="!p-0 border-0 shadow-lg shadow-blue-900/5">
                    <ModuleCard
                        title="Speaking Coach"
                        subtitle="AI-powered pronunciation & fluency training"
                        icon={Mic}
                        color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                        to="/speaking"
                        gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
                    />
                </BentoCard>

                {/* PTE Card */}
                <BentoCard onClick={() => navigate('/pte')} className="!p-0 border-0 shadow-lg shadow-violet-900/5">
                    <ModuleCard
                        title="PTE Academic"
                        subtitle="Real exam mock tests & practice questions"
                        icon={BookOpen}
                        color={{ bg: 'bg-violet-50', text: 'text-violet-600' }}
                        to="/pte"
                        gradient="bg-gradient-to-br from-violet-500 to-purple-600"
                    />
                </BentoCard>

                {/* IELTS Card */}
                <BentoCard onClick={() => navigate('/ielts')} className="!p-0 border-0 shadow-lg shadow-emerald-900/5">
                    <ModuleCard
                        title="IELTS Prep"
                        subtitle="Computer-delivered authentic simulation"
                        icon={GraduationCap}
                        color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
                        to="/ielts"
                        gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
                    />
                </BentoCard>
            </div>

            {/* Content & Extras Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-64">

                {/* Word of the Day */}
                <BentoCard className="flex flex-col justify-between bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
                    <div>
                        <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-4">
                            <Lightbulb size={18} /> Word of the Day
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">Ubiquitous</h3>
                        <p className="text-slate-500 italic text-sm">(adj.) Existing or being everywhere</p>
                    </div>
                    <div className="mt-4 bg-white/50 p-3 rounded-lg text-xs text-slate-600">
                        "Smartphones have become ubiquitous in modern society."
                    </div>
                </BentoCard>

                {/* Exam Tips */}
                <BentoCard className="flex flex-col justify-between bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-100">
                    <div>
                        <div className="flex items-center gap-2 text-sky-600 font-bold text-sm mb-4">
                            <Brain size={18} /> Pro Tip
                        </div>
                        <p className="font-medium text-slate-800 leading-relaxed">
                            In IELTS Speaking Part 2, keep talking until the examiner stops you. It shows fluency and confidence!
                        </p>
                    </div>
                    <button className="text-sky-600 text-sm font-bold mt-4 hover:underline text-left">View more tips</button>
                </BentoCard>

                {/* Leaderboard Compact */}
                <BentoCard onClick={() => navigate('/leaderboard')} className="flex flex-col justify-between hover:border-slate-300">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Leaderboard</div>
                            <div className="text-sm text-slate-500">Global Rank #420</div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-4">
                        {/* Fake mini leaderboard */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200"></div> User 1</div>
                            <span className="font-bold text-emerald-600">920 pts</span>
                        </div>
                        <div className="flex items-center justify-between text-sm opacity-50">
                            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200"></div> User 2</div>
                            <span className="font-bold">850 pts</span>
                        </div>
                    </div>
                </BentoCard>
            </div>

            {/* Admin Footer Link */}
            <div className="flex justify-center mt-8">
                <button onClick={() => navigate('/admin')} className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors flex items-center gap-2">
                    <Sparkles size={14} /> Admin Portal
                </button>
            </div>

        </div>
    );
};

export default Dashboard;
