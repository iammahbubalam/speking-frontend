import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, ChevronRight, CheckCircle, Clock, Lightbulb } from 'lucide-react';

const questionTypes = [
    { id: 'summarize-written', name: 'Summarize Written Text', count: 15, completed: 6, time: '10 min', description: 'Write one sentence summary (5-75 words)' },
    { id: 'essay', name: 'Essay Writing', count: 10, completed: 4, time: '20 min', description: 'Write 200-300 word argumentative essay' },
];

const templates = [
    { id: 1, name: 'Essay Introduction Template', type: 'essay', difficulty: 'Beginner' },
    { id: 2, name: 'Body Paragraph Structure', type: 'essay', difficulty: 'Beginner' },
    { id: 3, name: 'Conclusion Formula', type: 'essay', difficulty: 'Beginner' },
    { id: 4, name: 'Summarize Text Formula', type: 'summarize', difficulty: 'Intermediate' },
];

const PTEWriting = () => {
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
                                <FileText size={24} className="text-emerald-500" /> Writing Focus
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
                        <span className="text-sm font-bold text-emerald-600">{Math.round((totalCompleted / totalQuestions) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
                    </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-4">Question Types</h2>
                <div className="space-y-3 mb-8">
                    {questionTypes.map((type) => (
                        <button key={type.id} onClick={() => navigate(`/pte/writing/${type.id}`)} className="w-full bg-white rounded-xl border border-slate-200 p-4 text-left hover:shadow-md hover:border-emerald-300 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.completed === type.count ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {type.completed === type.count ? <CheckCircle size={24} /> : <FileText size={24} />}
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
                                    <ChevronRight size={20} className="text-slate-400 group-hover:text-emerald-500 transition-all" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Lightbulb size={20} className="text-amber-500" /> Templates & Tips
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                    {templates.map((t) => (
                        <button key={t.id} onClick={() => navigate(`/pte/writing/template/${t.id}`)} className="bg-white rounded-xl border border-slate-200 p-4 text-left hover:shadow-md hover:border-amber-300 transition-all">
                            <h3 className="font-medium text-slate-900">{t.name}</h3>
                            <p className="text-sm text-slate-500">{t.difficulty}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PTEWriting;
