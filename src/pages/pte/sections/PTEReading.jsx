import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const questionTypes = [
    { id: 'reading-fib-rw', name: 'Reading & Writing FIB', count: 20, completed: 5, time: '2-3 min', description: 'Fill blanks with dropdown options' },
    { id: 'mcq-multiple', name: 'Multiple Choice (Multiple)', count: 15, completed: 3, time: '2 min', description: 'Select all correct answers' },
    { id: 'reorder', name: 'Re-order Paragraphs', count: 12, completed: 2, time: '2-3 min', description: 'Drag and drop to correct order' },
    { id: 'reading-fib', name: 'Reading FIB (Drag & Drop)', count: 18, completed: 6, time: '2 min', description: 'Drag words to fill blanks' },
    { id: 'mcq-single', name: 'Multiple Choice (Single)', count: 15, completed: 8, time: '1-2 min', description: 'Select one correct answer' },
];

const PTEReading = () => {
    const navigate = useNavigate();
    const totalCompleted = questionTypes.reduce((a, q) => a + q.completed, 0);
    const totalQuestions = questionTypes.reduce((a, q) => a + q.count, 0);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/pte')} className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft size={20} /></button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <BookOpen size={24} className="text-violet-500" /> Reading
                            </h1>
                            <p className="text-sm text-slate-500">{totalCompleted} of {totalQuestions} completed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-6">
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                        <span className="text-sm font-bold text-violet-600">{Math.round((totalCompleted / totalQuestions) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
                    </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-4">Question Types</h2>
                <div className="space-y-3">
                    {questionTypes.map((type) => (
                        <button key={type.id} onClick={() => navigate(`/pte/reading/${type.id}`)} className="w-full bg-white rounded-xl border border-slate-200 p-4 text-left hover:shadow-md hover:border-violet-300 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.completed === type.count ? 'bg-emerald-100 text-emerald-600' : 'bg-violet-50 text-violet-600'}`}>
                                        {type.completed === type.count ? <CheckCircle size={24} /> : <BookOpen size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{type.name}</h3>
                                        <p className="text-sm text-slate-500">{type.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-slate-900">{type.completed}/{type.count}</div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500"><Clock size={12} /> {type.time}</div>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-400 group-hover:text-violet-500 transition-all" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PTEReading;
