import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mic, BookOpen, Headphones, FileText, Clock, Target,
    Trophy, Play, ChevronRight, Calendar, TrendingUp, Zap,
    BarChart3, ArrowUpRight
} from 'lucide-react';

import { mocks } from './mock/MockExamData';

// Mock user data
const userData = {
    targetScore: 79,
    currentScore: 65,
    practiceHours: 24,
    mocksTaken: 3,
    streak: 5,
    lastPractice: 'Yesterday',
};

// Modern Stat Card
const MetricCard = ({ label, value, subtext, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md group">
        <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                <Icon size={20} className="text-slate-600" />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {trend} <ArrowUpRight size={12} className="ml-1" />
                </span>
            )}
        </div>
        <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{value}</div>
            <div className="text-sm font-medium text-slate-500">{label}</div>
            {subtext && <div className="text-xs text-slate-400 mt-2">{subtext}</div>}
        </div>
    </div>
);

// Professional Section Card
const PracticeSection = ({ title, icon: Icon, stats, progress, color, to }) => {
    const navigate = useNavigate();

    // Subtle color mapping
    const theme = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-700', bar: 'bg-blue-600' },
        violet: { bg: 'bg-violet-50', text: 'text-violet-700', bar: 'bg-violet-600' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-600' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-600' },
    }[color];

    return (
        <button
            onClick={() => navigate(to)}
            className="group relative bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left w-full overflow-hidden"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity`}>
                <ArrowUpRight className="text-slate-400" size={20} />
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-lg ${theme.bg} flex items-center justify-center`}>
                    <Icon size={24} className={theme.text} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
                    <p className="text-sm text-slate-500">{stats}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-slate-500">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${theme.bar} transition-all duration-500 ease-out group-hover:scale-x-105 origin-left`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </button>
    );
};

const PTEHub = () => {
    const navigate = useNavigate();
    const data = userData;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Professional Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                                <BookOpen size={16} />
                                <span>Exam Preparation</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">PTE Academic Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                            <div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target</div>
                                <div className="text-2xl font-bold text-slate-900">{data.targetScore}</div>
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current</div>
                                <div className={`text-2xl font-bold ${data.currentScore >= data.targetScore ? 'text-emerald-600' : 'text-amber-600'}`}>
                                    {data.currentScore}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Analytics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <MetricCard
                        label="Practice Hours"
                        value={data.practiceHours}
                        icon={Clock}
                        subtext="Total time spent"
                    />
                    <MetricCard
                        label="Mock Confidence"
                        value="High"
                        icon={BarChart3}
                        trend="+12%"
                    />
                    <MetricCard
                        label="Day Streak"
                        value={data.streak}
                        icon={Zap}
                        subtext="Keep it up!"
                    />
                    <MetricCard
                        label="Questions Done"
                        value="480"
                        icon={FileText}
                        trend="+45"
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content Area - 2/3 width */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Action */}
                        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/30 transition-all duration-700"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-blue-300 font-medium mb-2">
                                    <Target size={18} /> Recommended Next Step
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Full Mock Exam Simulation</h2>
                                <p className="text-slate-300 max-w-xl mb-8 text-lg leading-relaxed">
                                    Experience the real exam environment with our AI-powered simulation.
                                    Includes all 20 question types, accurate timing, and instant scoring analysis.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => navigate('/pte/mock')}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-600/25"
                                    >
                                        <Play fill="currentColor" size={18} /> Start Mock Test
                                    </button>
                                    <button className="px-6 py-3 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                                        View History
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Available Mocks List */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-slate-900">Available Mock Tests</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                {mocks.map(mock => (
                                    <button key={mock.id} onClick={() => navigate('/pte/mock/exam', { state: { examId: mock.id } })} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group text-left">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide ${mock.difficulty === 'Standard' ? 'bg-emerald-100 text-emerald-700' : mock.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{mock.difficulty}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{mock.title}</h3>
                                        <p className="text-xs text-slate-500 mb-3">20 Questions • ~45 mins</p>
                                        <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider">
                                            Start Now <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Section Practice */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Skill Development</h2>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    View Study Plan <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <PracticeSection
                                    title="Speaking & Writing"
                                    icon={Mic}
                                    stats="7 Question Types • 25 Tasks"
                                    progress={35}
                                    color="blue"
                                    to="/pte/speaking"
                                />
                                <PracticeSection
                                    title="Reading"
                                    icon={BookOpen}
                                    stats="5 Question Types • 40 Tasks"
                                    progress={20}
                                    color="violet"
                                    to="/pte/reading"
                                />
                                <PracticeSection
                                    title="Listening"
                                    icon={Headphones}
                                    stats="8 Question Types • 32 Tasks"
                                    progress={15}
                                    color="amber"
                                    to="/pte/listening"
                                />
                                <PracticeSection
                                    title="Writing Focus"
                                    icon={FileText}
                                    stats="Essay & Summary • 12 Tasks"
                                    progress={40}
                                    color="emerald"
                                    to="/pte/writing"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area - 1/3 width */}
                    <div className="space-y-6">
                        {/* Performance Card */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Trophy size={18} className="text-amber-500" /> Recent Performance
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div>
                                        <div className="text-sm font-medium text-slate-900">Mock Test #3</div>
                                        <div className="text-xs text-slate-500">Completed yesterday</div>
                                    </div>
                                    <div className="text-xl font-bold text-slate-900">65</div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-500">Speaking</span>
                                            <span className="font-medium text-slate-900">62/90</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-500">Writing</span>
                                            <span className="font-medium text-slate-900">68/90</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Weak Areas */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-red-500" /> Focus Areas
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Describe Image', score: '45%', color: 'text-red-600 bg-red-50' },
                                    { name: 'Re-tell Lecture', score: '52%', color: 'text-amber-600 bg-amber-50' },
                                    { name: 'Essay Writing', score: '58%', color: 'text-amber-600 bg-amber-50' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${item.color}`}>
                                            {item.score}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-900 font-medium border border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-all">
                                Generate Practice Set
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PTEHub;
