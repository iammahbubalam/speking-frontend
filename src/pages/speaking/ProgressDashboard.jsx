import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, TrendingUp, Clock, Flame, Award, Target, Volume2,
    ChevronRight, Star, Trophy, Zap, Calendar, BarChart3,
    CheckCircle, XCircle, RefreshCw, Medal, Crown, BookOpen, Mic
} from 'lucide-react';

// Mock data
const mockData = {
    overallScore: 68,
    bandScore: 6.5,
    totalQuestions: 127,
    practiceTime: '12h 45m',
    streak: 5,
    rank: 42,
    totalUsers: 1850,

    scores: {
        pronunciation: { current: 68, previous: 62, change: +6 },
        fluency: { current: 72, previous: 70, change: +2 },
        grammar: { current: 75, previous: 73, change: +2 },
        vocabulary: { current: 70, previous: 65, change: +5 },
        coherence: { current: 65, previous: 60, change: +5 },
    },

    weeklyData: [
        { day: 'Mon', score: 62, minutes: 25, questions: 8 },
        { day: 'Tue', score: 65, minutes: 30, questions: 10 },
        { day: 'Wed', score: 68, minutes: 45, questions: 15 },
        { day: 'Thu', score: 64, minutes: 20, questions: 6 },
        { day: 'Fri', score: 71, minutes: 35, questions: 12 },
        { day: 'Sat', score: 75, minutes: 50, questions: 18 },
        { day: 'Sun', score: 72, minutes: 40, questions: 14 },
    ],

    monthlyTrend: [58, 60, 62, 61, 65, 68, 72, 70, 75, 73, 76, 78],

    problematicWords: [
        { word: 'particularly', issue: 'Stress placement', attempts: 8, lastScore: 45 },
        { word: 'environment', issue: 'Missing syllable', attempts: 5, lastScore: 52 },
        { word: 'comfortable', issue: 'Vowel sound', attempts: 6, lastScore: 48 },
        { word: 'technology', issue: 'TH sound', attempts: 4, lastScore: 55 },
        { word: 'restaurant', issue: 'Silent letters', attempts: 3, lastScore: 60 },
    ],

    achievements: [
        { id: 1, name: 'First Steps', desc: 'Complete your first question', icon: '🎯', unlocked: true, date: 'Jan 15' },
        { id: 2, name: '10 Question Streak', desc: 'Answer 10 questions correctly', icon: '🔥', unlocked: true, date: 'Jan 20' },
        { id: 3, name: 'Week Warrior', desc: 'Practice 7 days in a row', icon: '📅', unlocked: false },
        { id: 4, name: 'Pronunciation Pro', desc: 'Score 90%+ in pronunciation', icon: '🎤', unlocked: false },
        { id: 5, name: 'Grammar Guru', desc: 'Score 90%+ in grammar', icon: '📚', unlocked: false },
        { id: 6, name: 'Century Club', desc: 'Complete 100 questions', icon: '💯', unlocked: true, date: 'Feb 1' },
    ],

    recentSessions: [
        { id: 1, track: 'Conversation', level: 4, score: 72, date: 'Today', status: 'passed' },
        { id: 2, track: 'Academic', level: 2, score: 68, date: 'Yesterday', status: 'passed' },
        { id: 3, track: 'Corporate', level: 1, score: 58, date: '2 days ago', status: 'failed' },
        { id: 4, track: 'Conversation', level: 3, score: 75, date: '3 days ago', status: 'passed' },
    ],

    skillBreakdown: [
        { skill: 'Introductions', mastery: 85 },
        { skill: 'Describing Places', mastery: 72 },
        { skill: 'Opinions', mastery: 68 },
        { skill: 'Comparisons', mastery: 55 },
        { skill: 'Hypotheticals', mastery: 42 },
    ],
};

// Score Circle Component
const ScoreCircle = ({ score, size = 'md', showChange, change }) => {
    const sizes = {
        sm: { outer: 'w-16 h-16', inner: 'text-lg', stroke: 4 },
        md: { outer: 'w-24 h-24', inner: 'text-2xl', stroke: 6 },
        lg: { outer: 'w-32 h-32', inner: 'text-4xl', stroke: 8 },
    };
    const s = sizes[size];
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 70 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <div className={`${s.outer} relative`}>
            <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r={radius} fill="none" stroke="#e2e8f0" strokeWidth={s.stroke} />
                <circle
                    cx="50%" cy="50%" r={radius} fill="none" stroke={color} strokeWidth={s.stroke}
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                    className="transition-all duration-1000"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`${s.inner} font-black text-slate-900`}>{score}</span>
                {showChange && change !== undefined && (
                    <span className={`text-xs font-bold ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {change >= 0 ? '+' : ''}{change}%
                    </span>
                )}
            </div>
        </div>
    );
};

// Mini Bar Chart
const MiniBarChart = ({ data, height = 80 }) => {
    const max = Math.max(...data.map(d => d.score));
    return (
        <div className="flex items-end justify-between gap-1" style={{ height }}>
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                        className={`w-full rounded-t transition-all ${i === data.length - 1 ? 'bg-blue-500' : 'bg-blue-200'
                            }`}
                        style={{ height: `${(d.score / max) * 100}%`, minHeight: 4 }}
                    />
                    <span className="text-[10px] text-slate-400">{d.day}</span>
                </div>
            ))}
        </div>
    );
};

// Trend Line
const TrendLine = ({ data, height = 60 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100 / (data.length - 1);

    const points = data.map((val, i) => {
        const x = i * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg className="w-full" style={{ height }} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
            <polyline
                points={points}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
            {data.map((val, i) => (
                <circle
                    key={i}
                    cx={i * width}
                    cy={height - ((val - min) / range) * height}
                    r="3"
                    fill="#3b82f6"
                    className="drop-shadow-sm"
                />
            ))}
        </svg>
    );
};

// Stat Card
const StatCard = ({ icon: Icon, value, label, color = 'blue', subtext }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        violet: 'bg-violet-50 text-violet-600',
    };
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center mb-3`}>
                <Icon size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900">{value}</div>
            <div className="text-sm text-slate-500">{label}</div>
            {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
        </div>
    );
};

const ProgressDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const data = mockData;

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/speaking')} className="p-2 hover:bg-slate-100 rounded-lg">
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">My Progress</h1>
                                <p className="text-sm text-slate-500">Track your speaking improvement over time</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200">
                                <RefreshCw size={16} /> Refresh
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4 -mb-px">
                        {['overview', 'skills', 'history'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2.5 font-medium text-sm capitalize rounded-t-lg transition-colors ${activeTab === tab
                                        ? 'bg-slate-100 text-blue-600 border-b-2 border-blue-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Top Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard icon={Target} value={data.totalQuestions} label="Questions Completed" color="blue" />
                            <StatCard icon={Clock} value={data.practiceTime} label="Practice Time" color="violet" />
                            <StatCard icon={Flame} value={`${data.streak} days`} label="Current Streak" color="amber" />
                            <StatCard icon={Trophy} value={`#${data.rank}`} label="Leaderboard Rank" color="emerald" subtext={`of ${data.totalUsers} users`} />
                        </div>

                        {/* Main Score + Weekly Chart */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Overall Score */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-900">Overall Performance</h2>
                                    <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                                        <TrendingUp size={14} /> +8% this month
                                    </span>
                                </div>

                                <div className="flex items-center justify-center mb-6">
                                    <div className="text-center">
                                        <ScoreCircle score={data.overallScore} size="lg" />
                                        <div className="mt-2 text-sm text-slate-500">Band Score: <span className="font-bold text-slate-900">{data.bandScore}</span></div>
                                    </div>
                                </div>

                                {/* Skill Scores */}
                                <div className="grid grid-cols-5 gap-2">
                                    {Object.entries(data.scores).map(([key, val]) => (
                                        <div key={key} className="text-center">
                                            <ScoreCircle score={val.current} size="sm" showChange change={val.change} />
                                            <div className="text-xs text-slate-500 capitalize mt-1">{key.slice(0, 5)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Weekly Progress */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-900">Weekly Progress</h2>
                                    <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                                        <BarChart3 size={14} /> This Week
                                    </span>
                                </div>

                                <MiniBarChart data={data.weeklyData} height={120} />

                                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-100">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-900">{data.weeklyData.reduce((a, b) => a + b.questions, 0)}</div>
                                        <div className="text-xs text-slate-500">Questions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-900">{data.weeklyData.reduce((a, b) => a + b.minutes, 0)}m</div>
                                        <div className="text-xs text-slate-500">Practice Time</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-900">{Math.round(data.weeklyData.reduce((a, b) => a + b.score, 0) / 7)}%</div>
                                        <div className="text-xs text-slate-500">Avg Score</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Trend */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-slate-900">12-Month Trend</h2>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-slate-500">Started: <span className="font-medium text-slate-900">58%</span></span>
                                    <span className="text-emerald-600 font-medium">Now: 78% (+20%)</span>
                                </div>
                            </div>
                            <TrendLine data={data.monthlyTrend} height={80} />
                            <div className="flex justify-between text-xs text-slate-400 mt-2">
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                                <span>Nov</span>
                                <span>Dec</span>
                                <span>Jan</span>
                                <span>Feb</span>
                            </div>
                        </div>

                        {/* Words to Practice + Achievements */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Problematic Words */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-900">Words to Practice</h2>
                                    <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
                                        Practice All <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.problematicWords.map((w, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${w.lastScore >= 60 ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {w.lastScore}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-slate-900">{w.word}</div>
                                                <div className="text-xs text-slate-500">{w.issue}</div>
                                            </div>
                                            <div className="text-xs text-slate-400">{w.attempts} attempts</div>
                                            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">
                                                <Volume2 size={14} className="text-slate-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-900">Achievements</h2>
                                    <span className="text-sm text-slate-500">
                                        {data.achievements.filter(a => a.unlocked).length}/{data.achievements.length} Unlocked
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {data.achievements.map((a) => (
                                        <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl ${a.unlocked ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50'
                                            }`}>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${a.unlocked ? 'bg-emerald-100' : 'bg-slate-200 grayscale'
                                                }`}>
                                                {a.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-semibold ${a.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                                                    {a.name}
                                                </div>
                                                <div className="text-xs text-slate-500">{a.desc}</div>
                                            </div>
                                            {a.unlocked ? (
                                                <div className="flex items-center gap-1 text-xs text-emerald-600">
                                                    <Star size={12} fill="currentColor" />
                                                    {a.date}
                                                </div>
                                            ) : (
                                                <div className="text-xs text-slate-400">Locked</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-6">
                        {/* Skill Breakdown */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <h2 className="font-bold text-slate-900 mb-4">Skill Mastery</h2>
                            <div className="space-y-4">
                                {data.skillBreakdown.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-700">{skill.skill}</span>
                                            <span className={`text-sm font-bold ${skill.mastery >= 70 ? 'text-emerald-600' :
                                                    skill.mastery >= 50 ? 'text-amber-600' : 'text-red-600'
                                                }`}>{skill.mastery}%</span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${skill.mastery >= 70 ? 'bg-emerald-500' :
                                                        skill.mastery >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${skill.mastery}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Scores */}
                        <div className="grid md:grid-cols-5 gap-4">
                            {Object.entries(data.scores).map(([key, val]) => (
                                <div key={key} className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                                    <ScoreCircle score={val.current} size="md" showChange change={val.change} />
                                    <div className="font-semibold text-slate-900 capitalize mt-3">{key}</div>
                                    <div className="text-xs text-slate-500 mt-1">Previous: {val.previous}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-6">
                        {/* Recent Sessions */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <h2 className="font-bold text-slate-900 mb-4">Recent Sessions</h2>
                            <div className="space-y-3">
                                {data.recentSessions.map((session) => (
                                    <div key={session.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${session.status === 'passed'
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}>
                                            {session.score}%
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-slate-900">{session.track} - Level {session.level}</div>
                                            <div className="text-sm text-slate-500">{session.date}</div>
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-medium ${session.status === 'passed' ? 'text-emerald-600' : 'text-red-600'
                                            }`}>
                                            {session.status === 'passed' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                            {session.status === 'passed' ? 'Passed' : 'Failed'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Heatmap Placeholder */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <h2 className="font-bold text-slate-900 mb-4">Activity Calendar</h2>
                            <div className="grid grid-cols-7 gap-1">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <div key={i} className="text-center text-xs text-slate-400 py-1">{d}</div>
                                ))}
                                {[...Array(35)].map((_, i) => {
                                    const activity = Math.random();
                                    return (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-sm ${activity > 0.7 ? 'bg-emerald-500' :
                                                    activity > 0.4 ? 'bg-emerald-300' :
                                                        activity > 0.2 ? 'bg-emerald-100' :
                                                            'bg-slate-100'
                                                }`}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-3 text-xs text-slate-500">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-slate-100 rounded-sm" />
                                    <div className="w-3 h-3 bg-emerald-100 rounded-sm" />
                                    <div className="w-3 h-3 bg-emerald-300 rounded-sm" />
                                    <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProgressDashboard;
