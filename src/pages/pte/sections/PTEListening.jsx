import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const questionTypes = [
    { id: 'summarize-spoken', name: 'Summarize Spoken Text', count: 10, completed: 2, time: '10 min', description: 'Write 50-70 word summary' },
    { id: 'mcq-multiple', name: 'Multiple Choice (Multiple)', count: 12, completed: 4, time: '2 min', description: 'Listen, select all correct' },
    { id: 'listening-fib', name: 'Fill in the Blanks', count: 15, completed: 6, time: '30-60s', description: 'Type missing words while listening' },
    { id: 'highlight-summary', name: 'Highlight Correct Summary', count: 10, completed: 3, time: '2 min', description: 'Choose best summary' },
    { id: 'mcq-single', name: 'Multiple Choice (Single)', count: 12, completed: 5, time: '1-2 min', description: 'Listen, select one' },
    { id: 'select-missing', name: 'Select Missing Word', count: 10, completed: 2, time: '30s', description: 'Audio ends early, select final word' },
    { id: 'highlight-incorrect', name: 'Highlight Incorrect Words', count: 12, completed: 4, time: '45s', description: 'Click words different from audio' },
    { id: 'write-dictation', name: 'Write from Dictation', count: 20, completed: 10, time: '15s', description: 'Type exactly what you hear' },
];

const PTEListening = () => {
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
                                <Headphones size={24} className="text-amber-500" /> Listening
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
                        <span className="text-sm font-bold text-amber-600">{Math.round((totalCompleted / totalQuestions) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
                    </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-4">Question Types</h2>
                <div className="space-y-3">
                    {questionTypes.map((type) => (
                        <button key={type.id} onClick={() => navigate(`/pte/listening/${type.id}`)} className="w-full bg-white rounded-xl border border-slate-200 p-4 text-left hover:shadow-md hover:border-amber-300 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.completed === type.count ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                        {type.completed === type.count ? <CheckCircle size={24} /> : <Headphones size={24} />}
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
                                    <ChevronRight size={20} className="text-slate-400 group-hover:text-amber-500 transition-all" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PTEListening;
