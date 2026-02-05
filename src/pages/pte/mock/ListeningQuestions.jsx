import React, { useState } from 'react';
import { Play, Check, ChevronUp, ChevronDown } from 'lucide-react';

// ===== LISTENING QUESTIONS =====

// 12. Summarize Spoken Text
export const SummarizeSpokenQ = ({ q, onAnswer }) => {
    const [text, setText] = useState('');
    const [played, setPlayed] = useState(false);
    const wordCount = text.trim().split(/\s+/).filter(w => w).length;
    const play = () => {
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(q.audioText);
            u.rate = 0.85;
            window.speechSynthesis.speak(u);
            setPlayed(true);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Summarize Spoken Text (50-70 words)</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl font-medium ${played ? 'bg-slate-100 text-slate-400' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
                <textarea value={text} onChange={e => { setText(e.target.value); onAnswer?.({ text: e.target.value }); }} placeholder="Write your summary..." className="w-full h-32 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500" />
                <div className={`text-right text-sm mt-2 ${wordCount < 50 || wordCount > 70 ? 'text-red-500' : 'text-emerald-600'}`}>Words: {wordCount} / 50-70</div>
            </div>
        </div>
    );
};

// 13. Listening MCQ Multiple
export const ListeningMCQMultipleQ = ({ q, onAnswer }) => {
    const [sel, setSel] = useState([]);
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
        }
    };
    const toggle = (i) => {
        const newSel = sel.includes(i) ? sel.filter(x => x !== i) : [...sel, i];
        setSel(newSel);
        onAnswer?.({ selected: newSel });
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Listening: Multiple Choice (Multiple)</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <p className="font-medium text-slate-900">{q.question}</p>
            <div className="space-y-3">
                {q.options.map((o, i) => (
                    <button key={i} onClick={() => toggle(i)} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 ${sel.includes(i) ? 'bg-amber-50 border-2 border-amber-500' : 'bg-white border-2 border-slate-200'}`}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${sel.includes(i) ? 'bg-amber-500 border-amber-500' : 'border-slate-300'}`}>
                            {sel.includes(i) && <Check size={14} className="text-white" />}
                        </div>
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
};

// 14. Listening Fill in Blanks
export const ListeningFIBQ = ({ q, onAnswer }) => {
    const [answers, setAnswers] = useState({});
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(q.fullText);
            u.rate = 0.8;
            window.speechSynthesis.speak(u);
            setPlayed(true);
        }
    };
    const handleChange = (idx, val) => {
        const newAns = { ...answers, [idx]: val };
        setAnswers(newAns);
        onAnswer?.(newAns);
    };
    const parts = q.content.split(/___+/);
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Listening: Fill in the Blanks</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center mb-4">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 leading-relaxed">
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        <span>{part}</span>
                        {i < parts.length - 1 && (
                            <input type="text" value={answers[i] || ''} onChange={e => handleChange(i, e.target.value)} className="mx-1 px-3 py-1 w-32 border-2 border-slate-300 rounded-lg focus:border-amber-500 focus:outline-none" placeholder="..." />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// 15. Highlight Correct Summary
export const HighlightSummaryQ = ({ q, onAnswer }) => {
    const [sel, setSel] = useState(null);
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Highlight Correct Summary</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <div className="space-y-3">
                {q.options.map((o, i) => (
                    <button key={i} onClick={() => { setSel(i); onAnswer?.({ selected: i }); }} className={`w-full p-4 rounded-xl text-left ${sel === i ? 'bg-amber-50 border-2 border-amber-500' : 'bg-white border-2 border-slate-200'}`}>
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
};

// 16. Listening MCQ Single
export const ListeningMCQSingleQ = ({ q, onAnswer }) => {
    const [sel, setSel] = useState(null);
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Listening: Multiple Choice (Single)</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <p className="font-medium text-slate-900">{q.question}</p>
            <div className="space-y-3">
                {q.options.map((o, i) => (
                    <button key={i} onClick={() => { setSel(i); onAnswer?.({ selected: i }); }} className={`w-full p-4 rounded-xl text-left ${sel === i ? 'bg-amber-50 border-2 border-amber-500' : 'bg-white border-2 border-slate-200'}`}>
                        <span className={`inline-block w-6 h-6 rounded-full border-2 mr-3 text-center text-sm leading-5 ${sel === i ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'}`}>{String.fromCharCode(65 + i)}</span>
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
};

// 17. Select Missing Word
export const SelectMissingWordQ = ({ q, onAnswer }) => {
    const [sel, setSel] = useState(null);
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Select Missing Word</div>
            <p className="text-slate-600">The audio will end with a beep. Select the word that completes the sentence.</p>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <div className="flex flex-wrap gap-3">
                {q.options.map((o, i) => (
                    <button key={i} onClick={() => { setSel(i); onAnswer?.({ selected: i }); }} className={`px-6 py-3 rounded-xl ${sel === i ? 'bg-amber-500 text-white' : 'bg-white border-2 border-slate-200'}`}>{o}</button>
                ))}
            </div>
        </div>
    );
};

// 18. Highlight Incorrect Words
export const HighlightIncorrectQ = ({ q, onAnswer }) => {
    const [selected, setSelected] = useState([]);
    const [played, setPlayed] = useState(false);
    const words = q.content.split(' ');
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
        }
    };
    const toggle = (i) => {
        const newSel = selected.includes(i) ? selected.filter(x => x !== i) : [...selected, i];
        setSelected(newSel);
        onAnswer?.({ selected: newSel.map(idx => words[idx]) });
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Highlight Incorrect Words</div>
            <p className="text-slate-600">Click words that differ from what you hear.</p>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center mb-4">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl ${played ? 'bg-slate-100' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 leading-loose">
                {words.map((w, i) => (
                    <button key={i} onClick={() => toggle(i)} className={`px-1 py-0.5 mx-0.5 rounded ${selected.includes(i) ? 'bg-red-100 text-red-700 line-through' : 'hover:bg-slate-100'}`}>{w}</button>
                ))}
            </div>
        </div>
    );
};

// 19. Write from Dictation
export const WriteDictationQ = ({ q, onAnswer }) => {
    const [text, setText] = useState('');
    const [played, setPlayed] = useState(false);
    const play = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.audioText));
            setPlayed(true);
        }
    };
    return (
        <div className="space-y-6">
            <div className="text-sm text-amber-600 font-medium">Write from Dictation</div>
            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <button onClick={play} disabled={played} className={`px-8 py-4 rounded-xl font-medium ${played ? 'bg-slate-100 text-slate-400' : 'bg-amber-500 text-white'}`}>
                    <Play size={20} className="inline mr-2" />{played ? 'Audio Played' : 'Play Audio'}
                </button>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
                <textarea value={text} onChange={e => { setText(e.target.value); onAnswer?.({ text: e.target.value }); }} placeholder="Type the sentence you heard..." className="w-full h-24 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
        </div>
    );
};

// 20. Reading & Writing Fill in Blanks (Dropdown)
export const RWFillBlanksQ = ({ q, onAnswer }) => {
    const [answers, setAnswers] = useState({});
    const handleChange = (idx, val) => {
        const newAns = { ...answers, [idx]: val };
        setAnswers(newAns);
        onAnswer?.(newAns);
    };
    const parts = q.content.split(/___+/);
    return (
        <div className="space-y-6">
            <div className="text-sm text-violet-600 font-medium">Reading & Writing: Fill in the Blanks</div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 leading-relaxed">
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        <span>{part}</span>
                        {i < parts.length - 1 && (
                            <select value={answers[i] || ''} onChange={e => handleChange(i, e.target.value)} className="mx-1 px-3 py-1 border-2 border-violet-300 rounded-lg bg-white focus:border-violet-500">
                                <option value="">Select</option>
                                {(q.options?.[i] || []).map((o, j) => <option key={j} value={o}>{o}</option>)}
                            </select>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
