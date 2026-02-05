import React, { useState } from 'react';

export const WritingSection = ({ data, onAnswer }) => {
    const [wordCount, setWordCount] = useState(0);
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        const val = e.target.value;
        setText(val);
        const count = val.trim().split(/\s+/).filter(w => w.length > 0).length;
        setWordCount(count);
    };

    return (
        <div className="h-full flex flex-col lg:flex-row lg:divide-x divide-y lg:divide-y-0 divide-slate-200">
            {/* Left Pane: Prompt */}
            <div className="w-full lg:w-1/2 h-2/5 lg:h-full p-4 md:p-6 overflow-y-auto bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Writing Task 1</h2>
                <div className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base">
                    <p>You should spend about 20 minutes on this task.</p>
                    <div className="bg-white p-4 border border-slate-200 rounded-xl my-4">
                        <strong>The chart below shows the value of one country's exports in various categories during 2015 and 2016.</strong>
                        <div className="my-4 h-32 md:h-48 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                            [Bar Chart Placeholder]
                        </div>
                    </div>
                    <p>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p>Write at least 150 words.</p>
                </div>
            </div>

            {/* Right Pane: Editor */}
            <div className="w-full lg:w-1/2 h-3/5 lg:h-full p-4 md:p-6 bg-white flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-slate-700">Your Answer</h3>
                    <span className={`text-sm font-medium ${wordCount < 150 ? 'text-amber-500' : 'text-emerald-600'}`}>
                        Word Count: {wordCount}
                    </span>
                </div>
                <textarea
                    className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:border-teal-500 outline-none resize-none font-mono text-sm leading-relaxed"
                    placeholder="Start typing your essay here..."
                    onChange={handleTextChange}
                    value={text}
                ></textarea>
            </div>
        </div>
    );
};
