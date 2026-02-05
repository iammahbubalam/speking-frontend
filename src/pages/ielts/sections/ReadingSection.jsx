import React, { useState } from 'react';

export const ReadingSection = ({ data, onAnswer }) => {
    const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
    const passages = data?.passages || [];
    const currentPassage = passages[currentPassageIdx];

    return (
        <div className="h-full flex flex-col lg:flex-row lg:divide-x divide-y lg:divide-y-0 divide-slate-200">
            {/* Passage Tabs (Mobile Only - usually sticky) */}
            <div className="lg:hidden flex overflow-x-auto bg-white border-b border-slate-200 sticky top-0 z-10">
                {passages.map((p, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPassageIdx(idx)}
                        className={`px-4 py-3 text-xs font-bold whitespace-nowrap ${idx === currentPassageIdx ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500'}`}
                    >
                        Passage {idx + 1}
                    </button>
                ))}
            </div>

            {/* Left Pane: Passage */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col bg-slate-50">
                {/* Desktop Passage Tabs */}
                <div className="hidden lg:flex bg-white border-b border-slate-200">
                    {passages.map((p, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPassageIdx(idx)}
                            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${idx === currentPassageIdx
                                    ? 'border-teal-500 text-teal-700 bg-teal-50/50'
                                    : 'border-transparent text-slate-500 hover:text-teal-600 hover:bg-slate-50'
                                }`}
                        >
                            Passage {idx + 1}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {currentPassage ? (
                        <>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">{currentPassage.title}</h2>
                            <div className="prose prose-slate max-w-none text-justify text-slate-700 leading-relaxed font-serif">
                                {currentPassage.content.split('\n\n').map((para, i) => (
                                    <p key={i} className="mb-4">{para}</p>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="p-8 text-center text-slate-400">Select a passage to begin reading.</div>
                    )}
                </div>
            </div>

            {/* Right Pane: Questions */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-white p-4 md:p-8">
                {currentPassage?.questions?.length > 0 ? (
                    <div className="space-y-8">
                        {currentPassage.questions.map((qGroup, gIdx) => (
                            <div key={gIdx} className="border-b last:border-0 pb-8 last:pb-0 border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">{qGroup.instruction}</h3>

                                <div className="space-y-6">
                                    {qGroup.items.map((item, iIdx) => (
                                        <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-300 transition-all">
                                            <div className="flex gap-4">
                                                <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-xs font-bold text-slate-500 mt-1">{item.id}</span>
                                                <div className="flex-1">
                                                    <p className="text-slate-800 font-medium mb-3">{item.text}</p>

                                                    {/* Dropdown Type (e.g. Headings) */}
                                                    {item.type === 'dropdown' && (
                                                        <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:border-teal-500 outline-none text-sm font-medium text-slate-700">
                                                            <option value="">Select an answer...</option>
                                                            {item.options.map(opt => <option key={opt}>{opt}</option>)}
                                                        </select>
                                                    )}

                                                    {/* TFNG (True/False/Not Given) */}
                                                    {item.type === 'tfng' && (
                                                        <div className="flex gap-4">
                                                            {['TRUE', 'FALSE', 'NOT GIVEN'].map(opt => (
                                                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                                    <input type="radio" name={`q-${item.id}`} className="accent-teal-600 w-4 h-4" />
                                                                    <span className="text-sm font-bold text-slate-600">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Text Input */}
                                                    {item.type === 'text' && (
                                                        <input type="text" className="w-full p-2 border-b-2 border-slate-200 focus:border-teal-500 outline-none font-medium bg-transparent transition-colors placeholder:text-slate-300" placeholder="Type answer here..." />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-400 mt-20">No questions for this passage.</div>
                )}
            </div>
        </div>
    );
};
