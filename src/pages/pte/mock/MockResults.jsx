import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Target, TrendingUp, BarChart2, ChevronRight, Download, RotateCcw } from 'lucide-react';

// Score calculation (mock)
const calculateScores = () => ({
    overall: 65,
    communicative: { speaking: 62, writing: 68, reading: 70, listening: 60 },
    enabling: { grammar: 72, pronunciation: 58, spelling: 75, vocabulary: 68, fluency: 55 },
});

const MockResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scores = calculateScores();

    const ScoreCircle = ({ score, size = 'lg', label }) => {
        const radius = size === 'lg' ? 60 : 40;
        const strokeWidth = size === 'lg' ? 8 : 6;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (score / 90) * circumference;
        const color = score >= 79 ? '#10b981' : score >= 65 ? '#3b82f6' : score >= 50 ? '#f59e0b' : '#ef4444';

        return (
            <div className="flex flex-col items-center">
                <svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
                    <circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
                    <circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
                        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                        transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`} />
                    <text x="50%" y="50%" textAnchor="middle" dy="0.3em" className="fill-slate-900 font-bold" style={{ fontSize: size === 'lg' ? 32 : 20 }}>
                        {score}
                    </text>
                </svg>
                {label && <span className="text-sm text-slate-600 mt-2">{label}</span>}
            </div>
        );
    };

    const SkillBar = ({ name, score }) => {
        const color = score >= 79 ? 'bg-emerald-500' : score >= 65 ? 'bg-blue-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';
        return (
            <div className="flex items-center gap-4">
                <span className="w-28 text-sm text-slate-600">{name}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${(score / 90) * 100}%` }} />
                </div>
                <span className="w-10 text-right font-bold text-slate-900">{score}</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">Mock Test Complete!</h1>
                    <p className="text-blue-100">Your PTE Academic Simulation Results</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-8">
                {/* Overall Score Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <ScoreCircle score={scores.overall} size="lg" />
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Overall Score</h2>
                                <p className="text-slate-500">PTE Academic Scale: 10-90</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Target size={16} className="text-blue-500" />
                                    <span className="text-sm">Target: 79 • Gap: <span className="text-amber-600 font-bold">14 points</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50">
                                <Download size={16} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Communicative Skills */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BarChart2 size={20} className="text-blue-500" /> Communicative Skills
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(scores.communicative).map(([key, val]) => (
                                <div key={key} className="text-center">
                                    <ScoreCircle score={val} size="sm" label={key.charAt(0).toUpperCase() + key.slice(1)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <TrendingUp size={20} className="text-emerald-500" /> Enabling Skills
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(scores.enabling).map(([key, val]) => (
                                <SkillBar key={key} name={key.charAt(0).toUpperCase() + key.slice(1)} score={val} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h3 className="font-bold text-slate-900 mb-4">📌 Focus Areas</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                            <h4 className="font-semibold text-red-800 mb-1">Fluency (55)</h4>
                            <p className="text-sm text-red-600">Practice speaking continuously without pauses. Use shadowing technique.</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <h4 className="font-semibold text-amber-800 mb-1">Pronunciation (58)</h4>
                            <p className="text-sm text-amber-600">Focus on word stress and intonation. Use the Pronunciation Lab.</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button onClick={() => navigate('/pte')} className="flex-1 py-4 bg-white border border-slate-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-50">
                        <ChevronRight size={20} className="rotate-180" /> Back to PTE Hub
                    </button>
                    <button onClick={() => navigate('/pte/mock')} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700">
                        <RotateCcw size={20} /> Take Another Mock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockResults;
