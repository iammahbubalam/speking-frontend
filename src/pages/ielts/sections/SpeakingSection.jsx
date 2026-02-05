import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, User } from 'lucide-react';

export const SpeakingSection = ({ data, onAnswer }) => {
    const [status, setStatus] = useState('idle'); // idle, listening (to AI), speaking (user), processing
    const [currentPart, setCurrentPart] = useState(0);

    // Mock speaking simulation
    const startSpeaking = () => {
        setStatus('speaking');
        // Simulate recording duration
        setTimeout(() => {
            setStatus('processing');
            setTimeout(() => setStatus('idle'), 1500);
        }, 5000);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-slate-50 p-6">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-teal-100 rounded-full mx-auto flex items-center justify-center mb-4 relative">
                        <User size={64} className="text-teal-600" />
                        {status === 'listening' && (
                            <div className="absolute inset-0 border-4 border-teal-400 rounded-full animate-ping opacity-20"></div>
                        )}
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 inline-block">
                        <p className="text-slate-700 font-medium">Please describe your hometown.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {status === 'speaking' ? (
                        <div className="animate-pulse">
                            <div className="text-red-500 font-bold mb-2 flex items-center justify-center gap-2">
                                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span> Recording...
                            </div>
                            <div className="h-16 flex items-center justify-center gap-1">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="w-2 bg-slate-300 rounded-full animate-[bounce_1s_infinite]" style={{ height: Math.random() * 40 + 10 + 'px', animationDelay: i * 0.1 + 's' }}></div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={startSpeaking}
                            className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 mx-auto"
                        >
                            <Mic size={32} />
                        </button>
                    )}

                    <p className="text-slate-400 text-sm">
                        {status === 'speaking' ? 'Speak clearly into your microphone' : 'Click the microphone to start answering'}
                    </p>
                </div>
            </div>
        </div>
    );
};
