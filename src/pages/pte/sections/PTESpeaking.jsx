import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Play, ChevronRight, Lock, CheckCircle, Clock, Star } from 'lucide-react';

// Question types for Speaking & Writing section
const questionTypes = [
    { id: 'read-aloud', name: 'Read Aloud', count: 25, completed: 8, time: '30-40s', difficulty: 'Medium', description: 'Read text aloud with clear pronunciation' },
    { id: 'repeat-sentence', name: 'Repeat Sentence', count: 20, completed: 12, time: '15s', difficulty: 'Easy', description: 'Listen and repeat the sentence exactly' },
    { id: 'describe-image', name: 'Describe Image', count: 15, completed: 3, time: '40s', difficulty: 'Hard', description: 'Describe charts, graphs, or images' },
    { id: 'retell-lecture', name: 'Re-tell Lecture', count: 12, completed: 2, time: '40s', difficulty: 'Hard', description: 'Summarize a lecture you just heard' },
    { id: 'answer-short', name: 'Answer Short Question', count: 20, completed: 15, time: '10s', difficulty: 'Easy', description: 'Give a one or two word answer' },
    { id: 'summarize-written', name: 'Summarize Written Text', count: 10, completed: 4, time: '10 min', difficulty: 'Medium', description: 'Summarize passage in one sentence' },
    { id: 'essay', name: 'Essay', count: 8, completed: 2, time: '20 min', difficulty: 'Hard', description: 'Write 200-300 word essay on a topic' },
];

const PTESpeaking = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState(null);

    const totalCompleted = questionTypes.reduce((a, q) => a + q.completed, 0);
    const totalQuestions = questionTypes.reduce((a, q) => a + q.count, 0);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/pte')} className="p-2 hover:bg-slate-100 rounded-lg">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Mic size={24} className="text-blue-500" /> Speaking & Writing
                            </h1>
                            <p className="text-sm text-slate-500">{totalCompleted} of {totalQuestions} completed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-6">
                {/* Progress */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                        <span className="text-sm font-bold text-blue-600">{Math.round((totalCompleted / totalQuestions) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
                    </div>
                </div>

                {/* Question Types */}
                <h2 className="text-lg font-bold text-slate-900 mb-4">Question Types</h2>
                <div className="space-y-3">
                    {questionTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => navigate(`/pte/speaking/${type.id}`)}
                            className="w-full bg-white rounded-xl border border-slate-200 p-4 text-left hover:shadow-md hover:border-blue-300 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.completed === type.count
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {type.completed === type.count ? <CheckCircle size={24} /> : <Mic size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{type.name}</h3>
                                        <p className="text-sm text-slate-500">{type.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-slate-900">{type.completed}/{type.count}</div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock size={12} /> {type.time}
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Quick Practice */}
                <div className="mt-6">
                    <button
                        onClick={() => navigate('/pte/speaking/practice')}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-4 font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                        <Play size={20} fill="white" /> Start Random Practice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PTESpeaking;
