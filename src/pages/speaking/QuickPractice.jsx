import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Mic, Square, Play, Send, Volume2,
    Loader2, CheckCircle, ArrowRight, Zap, RotateCcw
} from 'lucide-react';

// Random questions pool
const quickQuestions = [
    "Describe your favorite place to relax and why you like it.",
    "What would you do if you won a large sum of money?",
    "Tell me about a skill you would like to learn.",
    "Describe a memorable trip you have taken.",
    "What are the advantages of learning a second language?",
    "Tell me about your typical daily routine.",
    "What qualities do you think make a good friend?",
    "Describe a challenge you have overcome recently.",
];

const QuickPractice = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(quickQuestions[0]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null);
    const chunksRef = useRef([]);

    // Get random question
    const getRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * quickQuestions.length);
        return quickQuestions[randomIndex];
    };

    // TTS
    const speakQuestion = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(currentQuestion);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(t => t + 1);
            }, 1000);
        } catch (err) {
            console.error('Microphone access denied');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    };

    const submitAnswer = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowFeedback(true);
        }, 2000);
    };

    const nextQuestion = () => {
        setCurrentQuestion(getRandomQuestion());
        setQuestionNumber(q => q + 1);
        setAudioBlob(null);
        setShowFeedback(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/speaking')}
                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Zap className="text-amber-500 fill-amber-500" size={24} />
                        Quick Practice
                    </h1>
                    <p className="text-sm text-slate-500">5-minute random questions</p>
                </div>
                <div className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                    Question {questionNumber}
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Question</span>
                    <button
                        onClick={speakQuestion}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <Volume2 size={16} /> Listen
                    </button>
                </div>
                <p className="text-lg text-slate-800 leading-relaxed font-medium">{currentQuestion}</p>
            </div>

            {/* Recording Area */}
            {!showFeedback && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Your Response</div>

                    {/* Visualizer */}
                    <div className="h-24 bg-slate-50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                        {isRecording ? (
                            <div className="flex items-center gap-1">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-red-500 rounded-full animate-pulse"
                                        style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 50}ms` }}
                                    />
                                ))}
                            </div>
                        ) : audioBlob ? (
                            <div className="text-center">
                                <div className="text-2xl mb-1">🎙️</div>
                                <div className="text-sm text-slate-500">Recording saved ({formatTime(recordingTime)})</div>
                            </div>
                        ) : (
                            <div className="text-center text-slate-400">
                                <Mic size={28} className="mx-auto mb-2 opacity-50" />
                                <div className="text-sm">Tap record to start</div>
                            </div>
                        )}

                        {isRecording && (
                            <div className="absolute top-3 right-3 flex items-center gap-2 text-red-500 font-mono text-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                {formatTime(recordingTime)}
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                        {!isRecording && !audioBlob && (
                            <button
                                onClick={startRecording}
                                className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                            >
                                <Mic size={28} />
                            </button>
                        )}

                        {isRecording && (
                            <button
                                onClick={stopRecording}
                                className="w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg"
                            >
                                <Square size={24} fill="white" />
                            </button>
                        )}

                        {audioBlob && !isRecording && (
                            <>
                                <button
                                    onClick={() => { setAudioBlob(null); setRecordingTime(0); }}
                                    className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                                >
                                    <RotateCcw size={20} />
                                </button>
                                <button
                                    onClick={submitAnswer}
                                    disabled={isAnalyzing}
                                    className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition-colors disabled:opacity-70"
                                >
                                    {isAnalyzing ? (
                                        <><Loader2 size={18} className="animate-spin" /> Analyzing...</>
                                    ) : (
                                        <><Send size={18} /> Submit</>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Feedback */}
            {showFeedback && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-emerald-600" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Quick Feedback</h3>
                            <p className="text-sm text-slate-500">Nice effort! Here's a quick summary.</p>
                        </div>
                    </div>

                    {/* Quick Scores */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {[
                            { label: 'Fluency', score: 7 },
                            { label: 'Pronunciation', score: 7.5 },
                            { label: 'Grammar', score: 8 },
                            { label: 'Vocabulary', score: 7 },
                        ].map((item, i) => (
                            <div key={i} className="text-center p-3 bg-slate-50 rounded-lg">
                                <div className="text-xl font-bold text-slate-900">{item.score}</div>
                                <div className="text-xs text-slate-500">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tip */}
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mb-6">
                        <div className="text-xs font-bold text-amber-600 uppercase mb-1">Quick Tip</div>
                        <p className="text-sm text-slate-700">Try to speak at a steady pace and use linking words like "however" and "therefore" to connect your ideas.</p>
                    </div>

                    <button
                        onClick={nextQuestion}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        Next Question <ArrowRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuickPractice;
