import React, { useState } from 'react';
import { Play, Pause, Volume2, Info } from 'lucide-react';

export const ListeningSection = ({ data, onAnswer }) => {
    const [currentPartIdx, setCurrentPartIdx] = useState(0);
    const parts = data?.parts || [];
    const currentPart = parts[currentPartIdx];

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Audio Header */}
            <div className="bg-slate-800 text-white p-4 flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center hover:bg-teal-400 shadow-sm transition-all active:scale-95">
                        <Play size={20} fill="white" className="ml-0.5" />
                    </button>
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Audio Track</div>
                        <div className="font-mono text-sm">00:00 / 30:00</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Volume2 size={18} className="text-slate-400" />
                    <div className="w-24 md:w-32 h-1.5 bg-slate-700 rounded-full">
                        <div className="w-2/3 h-full bg-teal-500 rounded-full cursor-pointer hover:bg-teal-400"></div>
                    </div>
                </div>
            </div>

            {/* Part Tabs */}
            <div className="flex justify-center bg-white border-b border-slate-200 sticky top-0 z-10">
                {parts.map((part, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPartIdx(idx)}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${idx === currentPartIdx
                                ? 'border-teal-500 text-teal-700'
                                : 'border-transparent text-slate-500 hover:text-teal-600'
                            }`}
                    >
                        {part.name}
                    </button>
                ))}
            </div>

            {/* Questions Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full">
                {currentPart ? (
                    <div className="space-y-8 animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                            <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-blue-800 font-medium">{currentPart.instruction}</p>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                            {currentPart.questions.map((q, qIdx) => (
                                <div key={q.id} className="mb-6 last:mb-0">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 shrink-0 shadow-inner">
                                            {q.id}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <p className="text-slate-800 font-medium leading-relaxed">{q.text}</p>

                                            {/* Render Question Inputs Based on Type */}
                                            {q.type === 'form' && (
                                                <div className="flex items-center gap-2 max-w-md bg-slate-50 p-2 rounded-lg border border-slate-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
                                                    {q.prefix && <span className="text-slate-500 font-medium ml-2">{q.prefix}</span>}
                                                    <input
                                                        type="text"
                                                        className="bg-transparent outline-none flex-1 font-medium text-slate-900 placeholder-slate-400"
                                                        placeholder="Type answer..."
                                                    />
                                                </div>
                                            )}

                                            {q.type === 'mcq' && (
                                                <div className="space-y-2">
                                                    {q.options.map((opt, oIdx) => (
                                                        <label key={oIdx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-teal-50 hover:border-teal-200 cursor-pointer transition-all group">
                                                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-teal-500 flex items-center justify-center">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                            </div>
                                                            <span className="text-slate-700 group-hover:text-slate-900">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {qIdx < currentPart.questions.length - 1 && <div className="h-px bg-slate-100 my-6 ml-12"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-12">No questions available for this part.</div>
                )}
            </div>
        </div>
    );
};
