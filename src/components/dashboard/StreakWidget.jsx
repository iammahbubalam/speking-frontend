import React from 'react';
import { Flame } from 'lucide-react';

const StreakWidget = () => {
    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-200 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Flame className="text-white fill-white" size={20} />
                    </div>
                    <span className="font-bold text-orange-50 tracking-wide uppercase text-xs">Day Streak</span>
                </div>

                <div>
                    <div className="text-5xl font-black mb-1">12</div>
                    <div className="text-sm text-orange-100 font-medium">You're on fire! 🔥</div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-10 transform scale-150 rotate-12">
                <Flame size={120} />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
    );
};

export default StreakWidget;
