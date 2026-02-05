import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trophy, Globe, Users, ArrowUp, ArrowDown, Crown,
    Flame, ChevronDown, Search, Medal, MapPin
} from 'lucide-react';

// Mock data
const leaderboardData = [
    { id: 1, rank: 1, name: 'Sarah Chen', country: 'Singapore', xp: 12450, level: 24, streak: 45, accuracy: 98, change: 0 },
    { id: 2, rank: 2, name: 'Rahul Sharma', country: 'India', xp: 11890, level: 23, streak: 38, accuracy: 96, change: 2 },
    { id: 3, rank: 3, name: 'Miguel Rodriguez', country: 'Spain', xp: 10890, level: 21, streak: 28, accuracy: 94, change: -1 },
    { id: 4, rank: 4, name: 'Aisha Khalid', country: 'UAE', xp: 9500, level: 18, streak: 21, accuracy: 92, change: 1 },
    { id: 5, rank: 5, name: 'John Smith', country: 'UK', xp: 8200, level: 15, streak: 14, accuracy: 89, change: -2 },
    { id: 6, rank: 6, name: 'Li Wei', country: 'China', xp: 7850, level: 14, streak: 12, accuracy: 91, change: 3 },
    { id: 7, rank: 7, name: 'Emma Wilson', country: 'USA', xp: 7200, level: 13, streak: 9, accuracy: 88, change: 0 },
    { id: 8, rank: 8, name: 'Ahmed Hassan', country: 'Egypt', xp: 6800, level: 12, streak: 7, accuracy: 87, change: -1 },
    { id: 9, rank: 9, name: 'Yuki Tanaka', country: 'Japan', xp: 6500, level: 11, streak: 6, accuracy: 85, change: 2 },
    { id: 10, rank: 10, name: 'Maria Garcia', country: 'Mexico', xp: 6200, level: 11, streak: 5, accuracy: 84, change: 0 },
];

const currentUser = {
    id: 'me', rank: 42, name: 'Sakib Ahmed', country: 'Bangladesh', xp: 1240, level: 12, streak: 5, accuracy: 72, change: 5, isMe: true,
};

const stats = { totalUsers: 1850, yourPercentile: 98, avgXP: 3420 };

// Rank Badge
const RankBadge = ({ rank }) => {
    if (rank === 1) return (
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Crown size={16} className="text-amber-600" />
        </div>
    );
    if (rank === 2) return (
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Medal size={16} className="text-slate-500" />
        </div>
    );
    if (rank === 3) return (
        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Medal size={16} className="text-orange-600" />
        </div>
    );
    return (
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
            <span className="text-sm font-semibold text-slate-500">{rank}</span>
        </div>
    );
};

// Change Indicator
const ChangeIndicator = ({ change }) => {
    if (change > 0) return (
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
            <ArrowUp size={12} strokeWidth={2.5} />
            {change}
        </span>
    );
    if (change < 0) return (
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-500">
            <ArrowDown size={12} strokeWidth={2.5} />
            {Math.abs(change)}
        </span>
    );
    return <span className="text-xs text-slate-300">—</span>;
};

const Leaderboard = () => {
    const navigate = useNavigate();
    const [timeframe, setTimeframe] = useState('weekly');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-white">
            {/* Clean Header */}
            <div className="border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">Leaderboard</h1>
                            <p className="text-slate-500 text-sm mt-1">{stats.totalUsers.toLocaleString()} learners competing</p>
                        </div>

                        {/* Timeframe Dropdown */}
                        <div className="relative">
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 cursor-pointer hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="daily">Today</option>
                                <option value="weekly">This Week</option>
                                <option value="monthly">This Month</option>
                                <option value="alltime">All Time</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-slate-900">#{currentUser.rank}</div>
                            <div className="text-sm text-slate-500">Your Rank</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-slate-900">Top {100 - stats.yourPercentile}%</div>
                            <div className="text-sm text-slate-500">Percentile</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-slate-900 flex items-center gap-1">
                                {currentUser.streak}
                                <Flame size={20} className="text-orange-500" />
                            </div>
                            <div className="text-sm text-slate-500">Day Streak</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                {/* Search & Filters */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1 max-w-xs">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search learners..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-white text-slate-900 shadow-sm">
                            <Globe size={14} className="inline mr-1.5" />
                            Global
                        </button>
                        <button className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-700">
                            <Users size={14} className="inline mr-1.5" />
                            Friends
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="col-span-1">Rank</div>
                        <div className="col-span-5">Learner</div>
                        <div className="col-span-2 text-right">XP</div>
                        <div className="col-span-2 text-right">Level</div>
                        <div className="col-span-1 text-right">Streak</div>
                        <div className="col-span-1 text-right">Change</div>
                    </div>

                    {/* Your Position (Sticky at top) */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-4 bg-blue-50 border-b-2 border-blue-200 items-center">
                        <div className="col-span-1">
                            <RankBadge rank={currentUser.rank} />
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold">
                                {currentUser.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900">
                                    {currentUser.name}
                                    <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">YOU</span>
                                </div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <MapPin size={10} /> {currentUser.country}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 text-right font-semibold text-slate-900">{currentUser.xp.toLocaleString()}</div>
                        <div className="col-span-2 text-right text-slate-600">{currentUser.level}</div>
                        <div className="col-span-1 text-right">
                            <span className="inline-flex items-center gap-1 text-orange-500">
                                <Flame size={14} /> {currentUser.streak}
                            </span>
                        </div>
                        <div className="col-span-1 text-right">
                            <ChangeIndicator change={currentUser.change} />
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="px-4 py-2 bg-white border-b border-slate-100 text-xs text-slate-400 text-center">
                        ↑ {currentUser.rank - 1} positions above you
                    </div>

                    {/* Leaderboard Rows */}
                    {leaderboardData.map((user, i) => (
                        <div
                            key={user.id}
                            className={`grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-slate-50 transition-colors ${i < leaderboardData.length - 1 ? 'border-b border-slate-100' : ''
                                }`}
                        >
                            <div className="col-span-1">
                                <RankBadge rank={user.rank} />
                            </div>
                            <div className="col-span-5 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${user.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                                        user.rank === 2 ? 'bg-gradient-to-br from-slate-400 to-slate-500' :
                                            user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-amber-600' :
                                                'bg-gradient-to-br from-slate-300 to-slate-400'
                                    }`}>
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">{user.name}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin size={10} /> {user.country}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-right font-semibold text-slate-900">{user.xp.toLocaleString()}</div>
                            <div className="col-span-2 text-right text-slate-600">{user.level}</div>
                            <div className="col-span-1 text-right">
                                <span className="inline-flex items-center gap-1 text-slate-500">
                                    <Flame size={14} className={user.streak >= 30 ? 'text-orange-500' : 'text-slate-300'} />
                                    {user.streak}
                                </span>
                            </div>
                            <div className="col-span-1 text-right">
                                <ChangeIndicator change={user.change} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-slate-500">
                        Showing 1-10 of {stats.totalUsers.toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
