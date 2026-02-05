import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSpeakingStore from '../stores/useSpeakingStore';
import { ArrowLeft, Lock, Star, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// Enhanced Level Node Component
const LevelNode = ({ level, onSelect }) => {
    const isLocked = level.status === 'locked';
    const isCompleted = level.status === 'completed';
    const isUnlocked = level.status === 'unlocked';

    return (
        <button
            onClick={() => !isLocked && onSelect(level.id)}
            disabled={isLocked}
            className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${isLocked
                    ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-60'
                    : isCompleted
                        ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                        : 'bg-blue-50 border-blue-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
                }
            `}
        >
            <div className="flex items-center gap-4">
                {/* Level Badge */}
                <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shrink-0 border-4
                    ${isLocked
                        ? 'bg-slate-200 text-slate-400 border-slate-100'
                        : isCompleted
                            ? 'bg-emerald-500 text-white border-emerald-200'
                            : 'bg-blue-600 text-white border-blue-200 animate-pulse'
                    }
                `}>
                    {isLocked ? <Lock size={24} /> : level.id}
                </div>

                {/* Level Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className={`font-bold truncate ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                            Level {level.id}: {level.title}
                        </h3>
                        {isUnlocked && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase">
                                New
                            </span>
                        )}
                    </div>
                    <p className={`text-sm ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                        {level.questionsCount} questions
                    </p>

                    {/* Stars */}
                    {isCompleted && (
                        <div className="flex gap-0.5 mt-1">
                            {[...Array(3)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < level.stars ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Icon */}
                <div className={`shrink-0 ${isLocked ? 'text-slate-300' : isCompleted ? 'text-emerald-500' : 'text-blue-600'}`}>
                    {isCompleted ? (
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Zap size={16} className="fill-emerald-500" />
                        </div>
                    ) : isUnlocked ? (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
                            <span className="text-lg">▶</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </button>
    );
};

const SpeakingLevels = () => {
    const navigate = useNavigate();
    const levels = useSpeakingStore((state) => state.levels);

    const completedCount = levels.filter(l => l.status === 'completed').length;
    const totalStars = levels.reduce((acc, l) => acc + l.stars, 0);

    const handleSelectLevel = (levelId) => {
        navigate(`/speaking/level/${levelId}`);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900">Speaking Practice</h1>
                    <p className="text-sm text-slate-500">Master your speaking skills level by level</p>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-blue-100 mb-1">Your Progress</div>
                        <div className="text-3xl font-bold">{completedCount}/{levels.length} Levels</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="flex items-center gap-1 text-amber-300">
                                <Star size={20} className="fill-amber-300" />
                                <span className="text-2xl font-bold">{totalStars}</span>
                            </div>
                            <div className="text-xs text-blue-100">Stars Earned</div>
                        </div>
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-5xl">
                            🎯
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="h-2 bg-blue-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${(completedCount / levels.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Levels List */}
            <div className="space-y-3">
                {levels.map((level) => (
                    <LevelNode key={level.id} level={level} onSelect={handleSelectLevel} />
                ))}
            </div>

            {/* Motivational Footer */}
            <div className="mt-8 text-center text-sm text-slate-500">
                <p>Complete all levels to unlock the <Crown size={14} className="inline text-amber-500" /> Master Badge!</p>
            </div>
        </div>
    );
};

export default SpeakingLevels;
