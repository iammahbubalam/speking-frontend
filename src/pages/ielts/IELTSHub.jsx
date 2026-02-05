import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen, Headphones, PenTool, Mic, Clock, Trophy,
    Play, ChevronRight, TrendingUp, BarChart3, ArrowUpRight
} from 'lucide-react';

// Mock user data for IELTS
const userData = {
    targetBand: 8.0,
    currentBand: 6.5,
    mocksTaken: 2,
    practiceHours: 18,
    streak: 4
};

// Metric Card Component
const MetricCard = ({ label, value, subtext, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-teal-100 hover:border-teal-300 transition-all shadow-sm hover:shadow-md group">
        <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                <Icon size={20} className="text-teal-700" />
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

const IELTSHub = () => {
    const navigate = useNavigate();
    const data = userData;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Professional Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-teal-600 mb-1">
                                <BookOpen size={16} />
                                <span>IELTS Academic Prep</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">IELTS Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-6 bg-teal-50 px-6 py-3 rounded-xl border border-teal-100">
                            <div>
                                <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Target Band</div>
                                <div className="text-2xl font-bold text-slate-900">{data.targetBand}</div>
                            </div>
                            <div className="w-px h-8 bg-teal-200"></div>
                            <div>
                                <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Current Band</div>
                                <div className={`text-2xl font-bold ${data.currentBand >= data.targetBand ? 'text-emerald-600' : 'text-amber-600'}`}>
                                    {data.currentBand}
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
                        subtext="Time spent learning"
                    />
                    <MetricCard
                        label="Mocks Completed"
                        value={data.mocksTaken}
                        icon={Trophy}
                        trend="+1"
                    />
                    <MetricCard
                        label="Day Streak"
                        value={data.streak}
                        icon={TrendingUp}
                        subtext="Consistency is key!"
                    />
                    <MetricCard
                        label="Avg Band Score"
                        value={data.currentBand}
                        icon={BarChart3}
                        trend="+0.5"
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Action - Teal Theme */}
                        <div className="bg-teal-900 rounded-2xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/30 transition-all duration-700"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4">Computer-Delivered IELTS Simulation</h2>
                                <p className="text-teal-100 max-w-xl mb-8 text-lg leading-relaxed">
                                    Take a full mock test with our authentic computer-delivered interface.
                                    Practice Listening, Reading, and Writing exactly as seen in the real exam.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => navigate('/ielts/mock')}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/25"
                                    >
                                        <Play fill="currentColor" size={18} /> Start Full Mock Test
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity / Next Steps */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 text-lg">Recommended Practice</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <button className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left group">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                            <Headphones size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Listening Practice</div>
                                            <div className="text-xs text-slate-500">Section 1: Conversation</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-teal-600 font-medium flex items-center">Start Session <ChevronRight size={16} className="ml-1" /></div>
                                </button>
                                <button className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left group">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                            <BookOpen size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">Reading Practice</div>
                                            <div className="text-xs text-slate-500">Academic Passage 1</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-teal-600 font-medium flex items-center">Start Session <ChevronRight size={16} className="ml-1" /></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Trophy size={18} className="text-amber-500" /> Skill Breakdown
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { skill: 'Listening', score: 7.0, color: 'bg-emerald-500' },
                                    { skill: 'Reading', score: 6.5, color: 'bg-teal-500' },
                                    { skill: 'Writing', score: 6.0, color: 'bg-amber-500' },
                                    { skill: 'Speaking', score: 6.5, color: 'bg-blue-500' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-500">{item.skill}</span>
                                            <span className="font-medium text-slate-900">{item.score}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color}`} style={{ width: `${(item.score / 9) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IELTSHub;
