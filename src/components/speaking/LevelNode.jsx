import React from 'react';
import { Lock, Star, Trophy } from 'lucide-react';
import { cn } from '../../layouts/AppLayout';

const LevelNode = ({ level, status, stars, position }) => {
    // status: 'locked', 'unlocked', 'completed'
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div
            className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110",
                isLocked ? "grayscale opacity-70" : ""
            )}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
            <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg active:scale-95 transition-transform relative z-10",
                isLocked ? "bg-slate-200 border-slate-300" :
                    isCompleted ? "bg-amber-400 border-amber-200" : "bg-violet-600 border-violet-400 animate-bounce"
            )}>
                {isLocked ? (
                    <Lock size={20} className="text-slate-400" />
                ) : isCompleted ? (
                    <span className="text-2xl font-black text-white">{level}</span>
                ) : (
                    <span className="text-2xl font-black text-white">{level}</span>
                )}

                {/* Stars for completed levels */}
                {isCompleted && (
                    <div className="absolute -bottom-2 flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                            <Star key={i} size={12} className={i < stars ? "fill-yellow-300 text-yellow-600" : "fill-slate-300 text-slate-400"} />
                        ))}
                    </div>
                )}
            </div>

            {/* Label */}
            <div className="mt-2 text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Level {level}
            </div>
        </div>
    );
};

export default LevelNode;
