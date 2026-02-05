import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mic, BookOpen, Briefcase, Volume2, BarChart3, Zap,
    Trophy, Flame, Target, Star, ChevronRight, Clock,
    ArrowRight, Sparkles, TrendingUp, Play, Award, Users
} from 'lucide-react';

// Mock user data
const userData = {
    name: 'Sakib',
    streak: 5,
    totalXP: 1240,
    rank: 42,
    todayQuestions: 3,
    level: 12,
    tracks: {
        conversation: { completed: 3, total: 12, lastLevel: 4 },
        academic: { completed: 0, total: 10, lastLevel: 1 },
        corporate: { completed: 0, total: 8, lastLevel: 1 },
    },
    dailyGoal: { current: 3, target: 5 },
    recentActivity: { track: 'conversation', level: 4, score: 72 },
};

// Premium Track Card
const TrackCard = ({
    title,
    subtitle,
    icon: Icon,
    gradient,
    completedLevels,
    totalLevels,
    lastLevel,
    to,
    isActive = false
}) => {
    const navigate = useNavigate();
    const progress = Math.round((completedLevels / totalLevels) * 100);

    return (
        <button
            onClick={() => navigate(to)}
            className={`relative group w-full text-left p-6 rounded-2xl transition-all duration-300 overflow-hidden ${isActive
                    ? 'bg-gradient-to-br shadow-xl scale-[1.02] ring-2 ring-white/50'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:scale-[1.01]'
                } ${gradient}`}
        >
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            )}

            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gradient-to-br from-slate-100 to-slate-50'
                        }`}>
                        <Icon size={28} className={isActive ? 'text-white' : 'text-slate-700'} />
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {completedLevels}/{totalLevels} Levels
                    </span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                </h3>
                <p className={`text-sm mb-4 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                    {subtitle}
                </p>

                {/* Progress */}
                <div className="mb-4">
                    <div className={`h-2 rounded-full overflow-hidden ${isActive ? 'bg-white/20' : 'bg-slate-100'
                        }`}>
                        <div
                            className={`h-full rounded-full transition-all ${isActive ? 'bg-white' : 'bg-blue-500'
                                }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className={`text-xs mt-1.5 ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                        {progress}% complete
                    </div>
                </div>

                {/* CTA */}
                <div className={`flex items-center gap-2 font-semibold ${isActive ? 'text-white' : 'text-blue-600'
                    }`}>
                    {completedLevels > 0 ? `Continue Level ${lastLevel}` : 'Start Now'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </button>
    );
};

// Stat Pill
const StatPill = ({ icon: Icon, value, label, color }) => {
    const colors = {
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        violet: 'bg-violet-50 text-violet-600 border-violet-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    };

    return (
        <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${colors[color]}`}>
            <Icon size={18} />
            <div>
                <div className="text-base font-bold">{value}</div>
                <div className="text-[10px] uppercase font-medium opacity-70">{label}</div>
            </div>
        </div>
    );
};

// Tool Card
const ToolCard = ({ icon: Icon, title, description, to, color }) => {
    const navigate = useNavigate();
    const colors = {
        violet: 'bg-violet-500 text-white hover:bg-violet-600',
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        emerald: 'bg-emerald-500 text-white hover:bg-emerald-600',
    };

    return (
        <button
            onClick={() => navigate(to)}
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left w-full"
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]} transition-colors`}>
                <Icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900">{title}</h4>
                <p className="text-sm text-slate-500 truncate">{description}</p>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
        </button>
    );
};

// Quick Practice Button
const QuickPracticeCard = ({ onClick }) => (
    <button
        onClick={onClick}
        className="relative w-full p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white overflow-hidden group hover:shadow-xl transition-all"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Zap size={28} />
                </div>
                <div className="text-left">
                    <h3 className="text-xl font-bold">Quick Practice</h3>
                    <p className="text-white/80 text-sm">5-minute random questions</p>
                </div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
                <Play size={24} fill="white" />
            </div>
        </div>
    </button>
);

// Daily Challenge Card
const DailyChallengeCard = ({ current, target }) => {
    const progress = (current / target) * 100;
    const isComplete = current >= target;

    return (
        <div className={`p-5 rounded-2xl ${isComplete
                ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                : 'bg-gradient-to-br from-slate-800 to-slate-900'
            }`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Target size={18} className="text-white" />
                    <span className="text-white font-semibold text-sm">Daily Challenge</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${isComplete ? 'bg-white/30 text-white' : 'bg-emerald-500 text-white'
                    }`}>
                    +50 XP
                </span>
            </div>

            <p className="text-white/90 text-sm mb-3">
                {isComplete
                    ? '🎉 Challenge completed! Great work!'
                    : `Complete ${target} questions today to maintain your streak!`
                }
            </p>

            <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <span className="text-white font-bold text-sm">{current}/{target}</span>
            </div>
        </div>
    );
};

// Continue Card
const ContinueCard = ({ track, level, score }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Continue Where You Left</span>
                <Clock size={14} className="text-slate-400" />
            </div>

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Mic size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-900 capitalize">{track} - Level {level}</h4>
                    <p className="text-sm text-slate-500">Last score: {score}%</p>
                </div>
                <button
                    onClick={() => navigate(`/speaking/level/${level}?track=${track}`)}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    Resume <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

const SpeakingHub = () => {
    const navigate = useNavigate();
    const data = userData;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Hero Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={20} className="text-amber-500" />
                                <span className="text-sm font-medium text-amber-600">Level {data.level}</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 mb-2">Speaking Coach</h1>
                            <p className="text-slate-500">Master English speaking through structured practice</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/leaderboard')}
                                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                <Users size={16} />
                                Leaderboard
                            </button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-3">
                        <StatPill icon={Flame} value={`${data.streak} days`} label="Streak" color="orange" />
                        <StatPill icon={Star} value={data.totalXP.toLocaleString()} label="Total XP" color="blue" />
                        <StatPill icon={Trophy} value={`#${data.rank}`} label="Rank" color="violet" />
                        <StatPill icon={Target} value={`${data.todayQuestions} today`} label="Questions" color="emerald" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Continue Card */}
                {data.recentActivity && (
                    <div className="mb-8">
                        <ContinueCard
                            track={data.recentActivity.track}
                            level={data.recentActivity.level}
                            score={data.recentActivity.score}
                        />
                    </div>
                )}

                {/* Practice Tracks */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Practice Tracks</h2>
                        <span className="text-sm text-slate-500">Choose your focus area</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <TrackCard
                            title="Daily Conversation"
                            subtitle="Real-life situations: restaurants, shopping, travel"
                            icon={Mic}
                            gradient="from-blue-500 to-indigo-600"
                            completedLevels={data.tracks.conversation.completed}
                            totalLevels={data.tracks.conversation.total}
                            lastLevel={data.tracks.conversation.lastLevel}
                            to="/speaking/track/conversation"
                            isActive={true}
                        />
                        <TrackCard
                            title="Academic English"
                            subtitle="Presentations, discussions, formal responses"
                            icon={BookOpen}
                            gradient="from-violet-500 to-purple-600"
                            completedLevels={data.tracks.academic.completed}
                            totalLevels={data.tracks.academic.total}
                            lastLevel={data.tracks.academic.lastLevel}
                            to="/speaking/track/academic"
                        />
                        <TrackCard
                            title="Corporate English"
                            subtitle="Meetings, interviews, client calls"
                            icon={Briefcase}
                            gradient="from-emerald-500 to-teal-600"
                            completedLevels={data.tracks.corporate.completed}
                            totalLevels={data.tracks.corporate.total}
                            lastLevel={data.tracks.corporate.lastLevel}
                            to="/speaking/track/corporate"
                        />
                    </div>
                </div>

                {/* Two Columns: Tools + Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Tools */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Practice Tools</h2>
                        <div className="space-y-3">
                            <ToolCard
                                icon={Volume2}
                                title="Pronunciation Lab"
                                description="Master difficult sounds with targeted drills"
                                to="/speaking/pronunciation"
                                color="violet"
                            />
                            <ToolCard
                                icon={BarChart3}
                                title="My Progress"
                                description="View detailed analytics and track improvement"
                                to="/speaking/progress"
                                color="blue"
                            />
                        </div>
                    </div>

                    {/* Right: Quick Actions */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                        <div className="space-y-4">
                            <QuickPracticeCard onClick={() => navigate('/speaking/quick')} />
                            <DailyChallengeCard
                                current={data.dailyGoal.current}
                                target={data.dailyGoal.target}
                            />
                        </div>
                    </div>
                </div>

                {/* Achievement Teaser */}
                <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white">
                                <Award size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Unlock Your Next Achievement</h3>
                                <p className="text-sm text-slate-600">Complete 2 more questions today to earn "Week Warrior"</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/speaking/progress')}
                            className="px-4 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors"
                        >
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakingHub;
