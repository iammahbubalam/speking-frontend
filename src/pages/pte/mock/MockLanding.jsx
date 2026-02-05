import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Play, Mic, Volume2, CheckCircle, AlertCircle,
    Clock, ChevronRight, Settings, HelpCircle, FileText
} from 'lucide-react';
import { mocks } from './MockExamData';

const MockLanding = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if exam was pre-selected via navigation state
    const [selectedExam, setSelectedExam] = useState(location.state?.examId ? mocks.find(m => m.id === location.state.examId) : null);
    const [step, setStep] = useState(selectedExam ? 1 : 0); // 0: Select, 1: Info, 2: Mic, 3: Audio, 4: Ready

    const [micStatus, setMicStatus] = useState('pending');
    const [audioStatus, setAudioStatus] = useState('pending');
    const [isRecording, setIsRecording] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);

    const handleSelectExam = (exam) => {
        setSelectedExam(exam);
        setStep(1);
    };

    // Mic check logic
    const checkMicrophone = async () => {
        setMicStatus('checking');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            setIsRecording(true);
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            const checkLevel = () => {
                if (!isRecording) return;
                analyserRef.current.getByteFrequencyData(dataArray);
                const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
                setAudioLevel(Math.min(100, avg * 2));
                requestAnimationFrame(checkLevel);
            };
            checkLevel();
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
                setMicStatus('success');
            }, 3000);
        } catch (err) {
            setMicStatus('error');
        }
    };

    // Audio check logic
    const checkAudio = () => {
        setAudioStatus('checking');
        const audio = new Audio('/test-audio.mp3');
        setTimeout(() => {
            setAudioStatus('success');
        }, 2000);
    };

    const examInfo = {
        parts: [
            { name: 'Speaking & Writing', duration: '54-67 min', questions: '~35 items' },
            { name: 'Reading', duration: '29-30 min', questions: '~16 items' },
            { name: 'Listening', duration: '30-43 min', questions: '~18 items' },
        ],
        totalDuration: '~3 hours',
        totalQuestions: '~70 questions',
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Clock size={16} />
                        Full Mock Test
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">PTE Academic Simulation</h1>
                    <p className="text-slate-400">Complete exam experience with AI scoring</p>
                </div>

                {/* Step 0: Exam Selection */}
                {step === 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white text-center mb-6">Select a Mock Test</h2>
                        <div className="grid md:grid-cols-1 gap-4">
                            {mocks.map((exam) => (
                                <button
                                    key={exam.id}
                                    onClick={() => handleSelectExam(exam)}
                                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-2xl p-6 text-left transition-all group relative overflow-hidden"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{exam.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">{exam.difficulty}</span>
                                                    <span className="text-sm text-slate-400">• {exam.sections.reduce((a, s) => a + s.questions.length, 0)} Questions</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight className="text-blue-400" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => navigate('/pte')}
                            className="w-full py-4 text-slate-400 hover:text-white transition-colors mt-4"
                        >
                            ← Return to Dashboard
                        </button>
                    </div>
                )}

                {/* Progress Steps (Only visible after selection) */}
                {step > 0 && (
                    <>
                        <div className="text-center mb-6">
                            <div className="inline-block px-3 py-1 rounded bg-slate-800 border border-slate-700 text-sm text-blue-300 mb-4 font-medium">
                                Selected: {selectedExam?.title}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                {[1, 2, 3, 4].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                            {step > s ? <CheckCircle size={16} /> : s}
                                        </div>
                                        {s < 4 && <div className={`w-12 h-1 ${step > s ? 'bg-blue-600' : 'bg-slate-700'}`} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Cards */}
                        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
                            {step === 1 && (
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">Exam Overview</h2>
                                    <div className="space-y-3 mb-6">
                                        {selectedExam?.sections.map((sec, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                                                <div>
                                                    <div className="font-semibold text-white">{sec.name}</div>
                                                    <div className="text-sm text-slate-400">{sec.questions.length} Questions</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-blue-400 font-medium">~{sec.questions.length * 3} min</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                                            <div className="text-sm text-amber-200">
                                                <strong>Important:</strong> Once started, you cannot pause the exam.
                                                Ensure you have uninterrupted time.
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                        Continue to Equipment Check <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">Microphone Check</h2>
                                    <p className="text-slate-400 mb-6">Click the button below and speak for 3 seconds to test your microphone.</p>
                                    <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${micStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400' : micStatus === 'error' ? 'bg-red-500/20 text-red-400' : isRecording ? 'bg-blue-500/20 text-blue-400 animate-pulse' : 'bg-slate-600 text-slate-400'}`}>
                                                <Mic size={40} />
                                            </div>
                                        </div>
                                        {isRecording && <div className="mb-4"><div className="h-2 bg-slate-600 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${audioLevel}%` }} /></div><div className="text-center text-sm text-blue-400 mt-2">Speaking...</div></div>}
                                        {micStatus === 'success' && <div className="text-center text-emerald-400 flex items-center justify-center gap-2"><CheckCircle size={20} /> Microphone working correctly</div>}
                                        {micStatus === 'error' && <div className="text-center text-red-400 flex items-center justify-center gap-2"><AlertCircle size={20} /> Microphone not detected</div>}
                                        {micStatus === 'pending' && <button onClick={checkMicrophone} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">Test Microphone</button>}
                                    </div>
                                    <button onClick={() => setStep(3)} disabled={micStatus !== 'success'} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">Continue to Audio Check <ChevronRight size={20} /></button>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">Audio Check</h2>
                                    <p className="text-slate-400 mb-6">Click to play a test audio and confirm you can hear it clearly.</p>
                                    <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${audioStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400' : audioStatus === 'checking' ? 'bg-blue-500/20 text-blue-400 animate-pulse' : 'bg-slate-600 text-slate-400'}`}>
                                                <Volume2 size={40} />
                                            </div>
                                        </div>
                                        {audioStatus === 'success' && <div className="text-center text-emerald-400 flex items-center justify-center gap-2"><CheckCircle size={20} /> Audio working correctly</div>}
                                        {audioStatus === 'checking' && <div className="text-center text-blue-400">Playing audio...</div>}
                                        {audioStatus === 'pending' && <button onClick={checkAudio} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">Play Test Audio</button>}
                                    </div>
                                    <button onClick={() => setStep(4)} disabled={audioStatus !== 'success'} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">Continue <ChevronRight size={20} /></button>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} className="text-emerald-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-2">You're Ready!</h2>
                                    <p className="text-slate-400 mb-6">All equipment checks passed. Click below to start your exam.</p>
                                    <button onClick={() => navigate('/pte/mock/exam', { state: { examId: selectedExam.id } })} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                                        <Play size={20} fill="white" /> Start Exam Now
                                    </button>
                                </div>
                            )}
                        </div>

                        <button onClick={() => step > 1 ? setStep(step - 1) : setStep(0)} className="w-full py-3 text-slate-400 hover:text-white transition-colors">
                            ← Go Back
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MockLanding;
