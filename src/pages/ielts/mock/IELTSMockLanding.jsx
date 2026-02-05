import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, FileText, ChevronRight, CheckCircle, Lock } from 'lucide-react';
import { ieltsMocks } from './IELTSMockData';

const IELTSMockLanding = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button onClick={() => navigate('/ielts')} className="text-slate-400 hover:text-white transition-colors mb-2">
                            ← Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-white">Full Mock Tests</h1>
                        <p className="text-slate-400">Computer-delivered IELTS simulation</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="text-sm text-slate-400">Available Tests</div>
                        <div className="text-2xl font-bold text-white">{ieltsMocks.length}</div>
                    </div>
                </div>

                {/* Mock List */}
                <div className="grid gap-4">
                    {ieltsMocks.map((mock) => (
                        <div key={mock.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-teal-500 transition-all group relative overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mock.status === 'locked' ? 'bg-slate-700 text-slate-500' : 'bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors'
                                        }`}>
                                        {mock.status === 'locked' ? <Lock size={24} /> : <FileText size={24} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{mock.title}</h3>
                                            {mock.difficulty === 'Hard' && <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wide">Hard</span>}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1"><Clock size={14} /> ~2h 45m</span>
                                            <span>•</span>
                                            <span>4 Sections</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={() => mock.status !== 'locked' && navigate('/ielts/mock/exam', { state: { examId: mock.id } })}
                                        disabled={mock.status === 'locked'}
                                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${mock.status === 'locked'
                                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20'
                                            }`}
                                    >
                                        {mock.status === 'locked' ? 'Locked' : 'Start Test'}
                                        {mock.status !== 'locked' && <ChevronRight size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IELTSMockLanding;
