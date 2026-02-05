import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, X, ChevronLeft, ChevronRight, Volume2, HelpCircle } from 'lucide-react';
import { mocks } from './MockExamData';

// Import all question types
import { ReadAloudQ, RepeatSentenceQ, DescribeImageQ, RetellLectureQ, AnswerShortQ, SummarizeWrittenQ, EssayQ, MCQSingleQ, MCQMultipleQ, ReorderQ, ReadingFIBQ } from './QuestionTypes';
import { SummarizeSpokenQ, ListeningMCQMultipleQ, ListeningFIBQ, HighlightSummaryQ, ListeningMCQSingleQ, SelectMissingWordQ, HighlightIncorrectQ, WriteDictationQ, RWFillBlanksQ } from './ListeningQuestions';

// Timer Component (15 min demo)
const ExamTimer = ({ totalSeconds }) => {
    const [seconds, setSeconds] = useState(totalSeconds);
    useEffect(() => {
        const timer = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
        return () => clearInterval(timer);
    }, []);
    const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60;
    const isLow = seconds < 300;
    return (
        <div className={`flex items-center gap-2 font-mono text-lg ${isLow ? 'text-red-400' : 'text-white'}`}>
            <Clock size={18} />
            {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </div>
    );
};

const MockExam = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get exam ID from state or default to mock-1
    const examId = location.state?.examId || 'mock-1';
    const mockExamData = mocks.find(m => m.id === examId) || mocks[0];

    const [secIdx, setSecIdx] = useState(0);
    const [qIdx, setQIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [exitModal, setExitModal] = useState(false);

    const sections = mockExamData.sections;
    const sec = sections[secIdx];
    const q = sec?.questions[qIdx];
    const total = sections.reduce((a, s) => a + s.questions.length, 0);
    const current = sections.slice(0, secIdx).reduce((a, s) => a + s.questions.length, 0) + qIdx + 1;

    const handleAnswer = (ans) => setAnswers(p => ({ ...p, [q.id]: ans }));

    const next = () => {
        if (qIdx < sec.questions.length - 1) setQIdx(i => i + 1);
        else if (secIdx < sections.length - 1) { setSecIdx(i => i + 1); setQIdx(0); }
        else navigate('/pte/mock/results', { state: { answers, examId } });
    };

    const prev = () => {
        if (qIdx > 0) setQIdx(i => i - 1);
        else if (secIdx > 0) { setSecIdx(i => i - 1); setQIdx(sections[secIdx - 1].questions.length - 1); }
    };

    const renderQuestion = () => {
        if (!q) return null;
        const props = { q, onAnswer: handleAnswer, key: q.id };

        switch (q.type) {
            case 'read-aloud': return <ReadAloudQ {...props} />;
            case 'repeat-sentence': return <RepeatSentenceQ {...props} />;
            case 'describe-image': return <DescribeImageQ {...props} />;
            case 'retell-lecture': return <RetellLectureQ {...props} />;
            case 'answer-short': return <AnswerShortQ {...props} />;
            case 'summarize-written': return <SummarizeWrittenQ {...props} />;
            case 'essay': return <EssayQ {...props} />;
            case 'mcq-single': return <MCQSingleQ {...props} />;
            case 'mcq-multiple': return <MCQMultipleQ {...props} />;
            case 'reorder': return <ReorderQ {...props} />;
            case 'reading-fib': return <ReadingFIBQ {...props} />;
            case 'rw-fib': return <RWFillBlanksQ {...props} />;
            case 'summarize-spoken': return <SummarizeSpokenQ {...props} />;
            case 'listening-mcq-multiple': return <ListeningMCQMultipleQ {...props} />;
            case 'listening-fib': return <ListeningFIBQ {...props} />;
            case 'highlight-summary': return <HighlightSummaryQ {...props} />;
            case 'listening-mcq-single': return <ListeningMCQSingleQ {...props} />;
            case 'select-missing': return <SelectMissingWordQ {...props} />;
            case 'highlight-incorrect': return <HighlightIncorrectQ {...props} />;
            case 'write-dictation': return <WriteDictationQ {...props} />;
            default: return <div className="bg-white rounded-xl p-6 border">Unknown: {q.type}</div>;
        }
    };

    const sectionColors = { 'Speaking & Writing': 'text-blue-400', 'Reading': 'text-violet-400', 'Listening': 'text-amber-400' };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 text-white sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">PTE Academic</span>
                        <span className="text-slate-400">|</span>
                        <span className={sectionColors[sec?.name] || 'text-white'}>{sec?.name}</span>
                        <span className="text-slate-500 text-sm ml-2 hidden sm:inline">{mockExamData.title}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <ExamTimer totalSeconds={900} /> {/* 15 min demo */}
                        <button className="p-2 hover:bg-slate-800 rounded-lg"><Volume2 size={18} /></button>
                        <button className="p-2 hover:bg-slate-800 rounded-lg"><HelpCircle size={18} /></button>
                        <button onClick={() => setExitModal(true)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"><X size={18} /></button>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="bg-slate-800">
                    <div className="max-w-5xl mx-auto px-6 py-2 flex items-center gap-4">
                        <span className="text-sm text-slate-400 min-w-[60px]">Q {current}/{total}</span>
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300" style={{ width: `${(current / total) * 100}%` }} />
                        </div>
                        <span className="text-sm text-slate-400">{Math.round((current / total) * 100)}%</span>
                    </div>
                </div>
            </header>

            {/* Question Content */}
            <main className="flex-1 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    {renderQuestion()}
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="bg-white border-t border-slate-200 sticky bottom-0">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button onClick={prev} disabled={secIdx === 0 && qIdx === 0} className="px-6 py-3 border border-slate-200 rounded-xl font-medium disabled:opacity-40 hover:bg-slate-50 flex items-center gap-2">
                        <ChevronLeft size={18} /> Previous
                    </button>
                    <div className="text-sm text-slate-500">
                        {sec?.name} • Question {qIdx + 1} of {sec?.questions.length}
                    </div>
                    <button onClick={next} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                        {current === total ? 'Finish Exam' : 'Next'} <ChevronRight size={18} />
                    </button>
                </div>
            </footer>

            {/* Exit Modal */}
            {exitModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Exit Exam?</h3>
                        <p className="text-slate-600 mb-6">Your progress will be saved but you'll need to restart this section.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setExitModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">Continue Exam</button>
                            <button onClick={() => navigate('/pte')} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700">Exit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockExam;
