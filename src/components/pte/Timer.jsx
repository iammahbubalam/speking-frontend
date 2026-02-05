import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onComplete, label = "Time Remaining" }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete?.();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-sm font-bold text-slate-800">
            <span className="mr-2">{label}:</span>
            <span className="font-mono">{formatTime(timeLeft)}</span>
        </div>
    );
};

export default Timer;
