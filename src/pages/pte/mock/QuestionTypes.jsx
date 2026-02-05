import React, { useState } from 'react';
import { Mic, Square, Play, Check, Move, ChevronUp, ChevronDown } from 'lucide-react';

// ===== SPEAKING & WRITING QUESTIONS =====

// 1. Read Aloud
export const ReadAloudQ = ({ q, onAnswer }) => {
    const [phase, setPhase] = useState('prep');
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Read Aloud</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="text-lg leading-relaxed">{q.content}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
                {phase === 'prep' && (
                    <button onClick={() => setPhase('rec')} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                        <Mic size={20} className="inline mr-2" />Start Recording
                    </button>
                )}
                {phase === 'rec' && (
                    <>
                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Mic size={32} className="text-white" />
                        </div>
                        <p className="text-slate-600 mb-4">Recording in progress...</p>
                        <button onClick={() => { setPhase('done'); onAnswer?.({}); }} className="px-8 py-4 bg-slate-800 text-white rounded-xl font-medium">
                            <Square size={16} className="inline mr-2" fill="white" />Stop Recording
                        </button>
                    </>
                )}
                {phase === 'done' && <p className="text-emerald-600 font-medium flex items-center justify-center gap-2"><Check size={20} />Recording saved</p>}
            </div>
        </div>
    );
};

// 2. Repeat Sentence
export const RepeatSentenceQ = ({ q, onAnswer }) => {
    const [phase, setPhase] = useState('listen');
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
            setTimeout(() => setPhase('rec'), 3000);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Repeat Sentence</div>
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
                {phase === 'listen' && (
                    <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl font-medium ${played ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        <Play size={20} className="inline mr-2" />{played ? 'Playing...' : 'Play Audio'}
                    </button>
                )}
                {phase === 'rec' && (
                    <>
                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Mic size={32} className="text-white" />
                        </div>
                        <button onClick={() => { setPhase('done'); onAnswer?.({}); }} className="px-8 py-4 bg-slate-800 text-white rounded-xl">
                            <Square size={16} className="inline mr-2" fill="white" />Stop
                        </button>
                    </>
                )}
                {phase === 'done' && <p className="text-emerald-600 font-medium"><Check size={20} className="inline mr-2" />Recording saved</p>}
            </div>
        </div>
    );
};

// 3. Describe Image
export const DescribeImageQ = ({ q, onAnswer }) => {
    const [phase, setPhase] = useState('prep');
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Describe Image</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-slate-500">
                        <div className="text-6xl mb-2">📊</div>
                        <p className="text-sm">{q.imageDesc || 'Bar chart showing sales data'}</p>
                    </div>
                </div>
                <p className="text-sm text-slate-500">Describe what you see in the image. You have 40 seconds to speak.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
                {phase === 'prep' && <button onClick={() => setPhase('rec')} className="px-8 py-4 bg-blue-600 text-white rounded-xl"><Mic size={20} className="inline mr-2" />Start Recording</button>}
                {phase === 'rec' && (
                    <>
                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><Mic size={32} className="text-white" /></div>
                        <button onClick={() => { setPhase('done'); onAnswer?.({}); }} className="px-8 py-4 bg-slate-800 text-white rounded-xl"><Square size={16} className="inline mr-2" fill="white" />Stop</button>
                    </>
                )}
                {phase === 'done' && <p className="text-emerald-600 font-medium"><Check size={20} className="inline mr-2" />Recording saved</p>}
            </div>
        </div>
    );
};

// 4. Re-tell Lecture
export const RetellLectureQ = ({ q, onAnswer }) => {
    const [phase, setPhase] = useState('listen');
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(q.audioText);
            u.rate = 0.9;
            window.speechSynthesis.speak(u);
            setPlayed(true);
            setTimeout(() => setPhase('rec'), 5000);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Re-tell Lecture</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                {phase === 'listen' && <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl font-medium ${played ? 'bg-slate-100' : 'bg-blue-600 text-white'}`}><Play size={20} className="inline mr-2" />{played ? 'Playing lecture...' : 'Play Lecture'}</button>}
                {phase === 'rec' && (
                    <>
                        <p className="text-slate-600 mb-4">Now summarize what you heard</p>
                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><Mic size={32} className="text-white" /></div>
                        <button onClick={() => { setPhase('done'); onAnswer?.({}); }} className="px-8 py-4 bg-slate-800 text-white rounded-xl"><Square size={16} className="inline mr-2" fill="white" />Stop</button>
                    </>
                )}
                {phase === 'done' && <p className="text-emerald-600 font-medium"><Check size={20} className="inline mr-2" />Recording saved</p>}
            </div>
        </div>
    );
};

// 5. Answer Short Question
export const AnswerShortQ = ({ q, onAnswer }) => {
    const [phase, setPhase] = useState('listen');
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
            setTimeout(() => setPhase('rec'), 2000);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Answer Short Question</div>
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
                {phase === 'listen' && <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-blue-600 text-white'}`}><Play size={20} className="inline mr-2" />{played ? 'Playing...' : 'Play Question'}</button>}
                {phase === 'rec' && (
                    <>
                        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><Mic size={32} className="text-white" /></div>
                        <button onClick={() => { setPhase('done'); onAnswer?.({}); }} className="px-8 py-4 bg-slate-800 text-white rounded-xl"><Square size={16} className="inline mr-2" fill="white" />Stop</button>
                    </>
                )}
                {phase === 'done' && <p className="text-emerald-600"><Check size={20} className="inline mr-2" />Answer recorded</p>}
            </div>
        </div>
    );
};

// 6. Summarize Written Text
export const SummarizeWrittenQ = ({ q, onAnswer }) => {
    const [text, setText] = useState('');
    const wordCount = text.trim().split(/\s+/).filter(w => w).length;
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Summarize Written Text (5-75 words)</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 max-h-64 overflow-y-auto">
                <p className="leading-relaxed">{q.content}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
                <textarea value={text} onChange={e => { setText(e.target.value); onAnswer?.({ text: e.target.value }); }} placeholder="Write your summary in one sentence..." className="w-full h-32 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className={`text-right text-sm mt-2 ${wordCount < 5 || wordCount > 75 ? 'text-red-500' : 'text-emerald-600'}`}>Words: {wordCount} / 5-75</div>
            </div>
        </div>
    );
};

// 7. Essay
export const EssayQ = ({ q, onAnswer }) => {
    const [text, setText] = useState('');
    const wordCount = text.trim().split(/\s+/).filter(w => w).length;
    return (
        <div className="space-y-6">
            <div className="text-sm text-blue-600 font-medium">Essay (200-300 words)</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="font-medium">{q.prompt}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
                <textarea value={text} onChange={e => { setText(e.target.value); onAnswer?.({ text: e.target.value }); }} placeholder="Write your essay here..." className="w-full h-64 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className={`text-right text-sm mt-2 ${wordCount < 200 || wordCount > 300 ? 'text-amber-500' : 'text-emerald-600'}`}>Words: {wordCount} / 200-300</div>
            </div>
        </div>
    );
};

// ===== READING QUESTIONS =====

// 8. MCQ Single Answer
export const MCQSingleQ = ({ q, onAnswer }) => {
    const [sel, setSel] = useState(null);
    return (
        <div className="space-y-6">
            <div className="text-sm text-violet-600 font-medium">Multiple Choice - Single Answer</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="leading-relaxed mb-4">{q.content}</p>
                <p className="font-medium">{q.question}</p>
            </div>
            <div className="space-y-3">
                {q.options.map((o, i) => (
                    <button key={i} onClick={() => { setSel(i); onAnswer?.({ selected: i }); }} className={`w-full p-4 rounded-xl text-left transition-all ${sel === i ? 'bg-violet-50 border-2 border-violet-500' : 'bg-white border-2 border-slate-200 hover:border-slate-300'}`}>
                        <span className="inline-block w-6 h-6 rounded-full border-2 mr-3 text-center text-sm leading-5 ${sel === i ? 'bg-violet-500 border-violet-500 text-white' : 'border-slate-300'}">{String.fromCharCode(65 + i)}</span>
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
};

// 9. MCQ Multiple Answers
export const MCQMultipleQ = ({ q, onAnswer }) => {
    const [sel, setSel] = useState([]);
    const toggle = (i) => {
        const newSel = sel.includes(i) ? sel.filter(x => x !== i) : [...sel, i];
        setSel(newSel);
        onAnswer?.({ selected: newSel });
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-violet-600 font-medium">Multiple Choice - Multiple Answers</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="leading-relaxed mb-4">{q.content}</p>
                <p className="font-medium">{q.question}</p>
            </div>
            <div className="space-y-3">
                {q.options.map((o, i) => (
                    <button key={i} onClick={() => toggle(i)} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 ${sel.includes(i) ? 'bg-violet-50 border-2 border-violet-500' : 'bg-white border-2 border-slate-200'}`}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${sel.includes(i) ? 'bg-violet-500 border-violet-500' : 'border-slate-300'}`}>
                            {sel.includes(i) && <Check size={14} className="text-white" />}
                        </div>
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
};

// 10. Re-order Paragraphs
export const ReorderQ = ({ q, onAnswer }) => {
    const [items, setItems] = useState(q.paragraphs || []);
    const moveUp = (i) => { if (i > 0) { const n = [...items];[n[i - 1], n[i]] = [n[i], n[i - 1]]; setItems(n); onAnswer?.({ order: n }); } };
    const moveDown = (i) => { if (i < items.length - 1) { const n = [...items];[n[i], n[i + 1]] = [n[i + 1], n[i]]; setItems(n); onAnswer?.({ order: n }); } };
    return (
        <div className="space-y-6">
            <div className="text-sm text-violet-600 font-medium">Re-order Paragraphs</div>
            <p className="text-slate-600">Arrange the paragraphs in the correct order.</p>
            <div className="space-y-3">
                {items.map((p, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                            <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"><ChevronUp size={16} /></button>
                            <button onClick={() => moveDown(i)} disabled={i === items.length - 1} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"><ChevronDown size={16} /></button>
                        </div>
                        <span className="text-slate-400 font-mono text-sm">{i + 1}</span>
                        <p className="flex-1">{p}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 11. Fill in Blanks (Reading)
export const ReadingFIBQ = ({ q, onAnswer }) => {
    const [answers, setAnswers] = useState({});
    const handleChange = (idx, val) => {
        const newAns = { ...answers, [idx]: val };
        setAnswers(newAns);
        onAnswer?.(newAns);
    };
    const parts = q.content.split(/___+/);
    return (
        <div className="space-y-6">
            <div className="text-sm text-violet-600 font-medium">Reading: Fill in the Blanks</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 leading-relaxed">
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        <span>{part}</span>
                        {i < parts.length - 1 && (
                            <select value={answers[i] || ''} onChange={e => handleChange(i, e.target.value)} className="mx-1 px-3 py-1 border-2 border-slate-300 rounded-lg bg-white focus:border-violet-500">
                                <option value="">Select</option>
                                {(q.options?.[i] || q.options || []).map((o, j) => <option key={j} value={o}>{o}</option>)}
                            </select>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
