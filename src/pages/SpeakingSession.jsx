import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowLeft, Mic, Square, Volume2, ArrowRight,
    CheckCircle, AlertTriangle, RotateCcw, Loader2, Trophy,
    XCircle, Target, Clock, ChevronDown, ChevronUp, Star,
    TrendingUp, BookOpen, MessageCircle, Lightbulb, AlertCircle
} from 'lucide-react';

// Mock questions by track
const questionsByTrack = {
    conversation: {
        1: [
            "Introduce yourself and tell me about your background.",
            "What do you usually do on a typical weekend?",
            "Describe your hometown. What makes it special?",
            "Tell me about a hobby you enjoy.",
            "What kind of food do you prefer and why?",
        ],
        2: [
            "Describe your favorite restaurant and why you like it.",
            "How would you order a meal at a new restaurant?",
            "Tell me about a memorable dining experience.",
            "What do you say when the food isn't what you expected?",
            "Explain how to make your favorite dish.",
        ],
        4: [
            "How do you usually get around in your city?",
            "Describe a time you got lost while traveling.",
            "What's the best way to ask for directions?",
            "Compare public transport in different cities.",
            "Tell me about your most memorable journey.",
        ],
    },
    academic: {
        1: [
            "Describe an object you use every day.",
            "Explain the importance of education in society.",
            "What are the benefits of learning a second language?",
            "Describe a process you are familiar with.",
            "Compare traditional education with online learning.",
        ],
    },
    corporate: {
        1: [
            "Introduce yourself as if you're in a job interview.",
            "Describe your current role and responsibilities.",
            "What are your key strengths and weaknesses?",
            "Where do you see yourself in five years?",
            "Why should we hire you for this position?",
        ],
    },
};

// Get questions for a level
const getQuestions = (track, levelId) => {
    const trackQuestions = questionsByTrack[track] || questionsByTrack.conversation;
    return trackQuestions[levelId] || trackQuestions[1] || [
        "Tell me about yourself.",
        "What are your goals?",
        "Describe a challenge you've faced.",
    ];
};

// Generate VERY detailed feedback
const generateDetailedFeedback = (questions) => {
    const scores = {
        pronunciation: Math.floor(Math.random() * 25) + 50,
        fluency: Math.floor(Math.random() * 25) + 45,
        grammar: Math.floor(Math.random() * 25) + 50,
        vocabulary: Math.floor(Math.random() * 25) + 45,
        coherence: Math.floor(Math.random() * 25) + 50,
    };
    const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);

    // Per-question detailed feedback
    const questionFeedback = questions.map((q, i) => ({
        question: q,
        questionNumber: i + 1,
        score: Math.floor(Math.random() * 30) + 50,
        duration: `${Math.floor(Math.random() * 60) + 30}s`,
        wordsSpoken: Math.floor(Math.random() * 80) + 40,
        fillerWords: Math.floor(Math.random() * 5),
        pauseCount: Math.floor(Math.random() * 4) + 1,

        pronunciation: {
            score: Math.floor(Math.random() * 30) + 50,
            mispronounced: [
                { word: "particularly", said: "par-ti-coo-lar-ly", correct: "par-TIK-yuh-luh-lee", severity: "high" },
                { word: "environment", said: "en-vi-ron-ment", correct: "en-VY-run-muhnt", severity: "medium" },
            ].slice(0, Math.floor(Math.random() * 2) + 1),
        },

        fluency: {
            score: Math.floor(Math.random() * 30) + 45,
            issues: [
                "Long pause after 'I think...' (3.2 seconds)",
                "Repetition: 'I... I... I think'",
                "Filler word overuse: 'um' used 4 times",
            ].slice(0, Math.floor(Math.random() * 2) + 1),
        },

        grammar: {
            score: Math.floor(Math.random() * 30) + 50,
            errors: [
                { original: "She don't like", correction: "She doesn't like", rule: "Subject-verb agreement" },
                { original: "I am agree", correction: "I agree", rule: "Verb form error" },
                { original: "more better", correction: "much better / better", rule: "Double comparative" },
            ].slice(0, Math.floor(Math.random() * 2) + 1),
        },

        vocabulary: {
            score: Math.floor(Math.random() * 30) + 45,
            level: ["Basic", "Intermediate", "Good"][Math.floor(Math.random() * 3)],
            suggestions: [
                { used: "good", better: "excellent, outstanding, remarkable" },
                { used: "big", better: "substantial, significant, considerable" },
                { used: "very", better: "extremely, remarkably, exceptionally" },
            ].slice(0, Math.floor(Math.random() * 2) + 1),
        },

        content: {
            relevance: Math.floor(Math.random() * 30) + 60,
            completeness: Math.floor(Math.random() * 30) + 50,
            notes: ["Answer was somewhat off-topic", "Good use of examples", "Could expand on the main point"][Math.floor(Math.random() * 3)],
        },
    }));

    return {
        overall,
        scores,
        grade: overall >= 80 ? 'A' : overall >= 70 ? 'B' : overall >= 60 ? 'C' : overall >= 50 ? 'D' : 'F',
        passed: overall >= 60,
        bandScore: (overall / 10).toFixed(1),
        totalDuration: `${Math.floor(Math.random() * 3) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        totalWords: Math.floor(Math.random() * 200) + 200,
        avgWPM: Math.floor(Math.random() * 40) + 100,
        questionFeedback,

        overallStrengths: [
            "Good attempt at using complex sentence structures",
            "Showed understanding of the topic",
            "Maintained relevance to the questions asked",
        ],

        overallWeaknesses: [
            "Pronunciation of 'th' sounds needs significant work - you're substituting with 'd' or 't' sounds",
            "Fluency is interrupted by frequent pauses exceeding 2 seconds - practice continuous speech",
            "Grammar errors in subject-verb agreement appear consistently across all responses",
            "Vocabulary range is limited - using basic words like 'good', 'nice', 'very' too often",
            "Filler words ('um', 'uh', 'like') used excessively - 18 times across 5 questions",
        ],

        actionPlan: [
            {
                priority: "Critical",
                area: "Pronunciation",
                action: "Practice 'th' sounds daily for 10 minutes using minimal pair exercises (think/sink, this/dis)",
                timeline: "2 weeks",
            },
            {
                priority: "High",
                area: "Fluency",
                action: "Record yourself speaking for 2 minutes without stopping. Review and reduce pauses.",
                timeline: "1 week",
            },
            {
                priority: "High",
                area: "Grammar",
                action: "Review subject-verb agreement rules. Complete 20 practice exercises.",
                timeline: "1 week",
            },
            {
                priority: "Medium",
                area: "Vocabulary",
                action: "Learn 5 new advanced synonyms daily. Use them in sentences.",
                timeline: "Ongoing",
            },
        ],

        nextSteps: overall >= 60
            ? "You've passed this level. Move to Level " + (parseInt(questions.length) + 1) + " for more challenging content."
            : "Retry this level after practicing the areas identified above. Focus on the Critical priority items first.",
    };
};

// Session States
const SESSION_STATE = {
    INTRO: 'intro',
    PRACTICING: 'practicing',
    SUBMITTING: 'submitting',
    RESULTS: 'results',
};

// Collapsible Section Component
const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} className="text-slate-600" />
                    <span className="font-bold text-slate-900">{title}</span>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>
            {isOpen && <div className="px-5 pb-5 border-t border-slate-100">{children}</div>}
        </div>
    );
};

// Question Feedback Card
const QuestionFeedbackCard = ({ qf }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${qf.score >= 70 ? 'bg-emerald-100 text-emerald-700' :
                        qf.score >= 60 ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                    }`}>
                    {qf.score}%
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm">Question {qf.questionNumber}</div>
                    <div className="text-xs text-slate-500 truncate">{qf.question}</div>
                </div>
                <div className="text-xs text-slate-400">{qf.duration} • {qf.wordsSpoken} words</div>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expanded && (
                <div className="p-4 border-t border-slate-100 space-y-4 bg-slate-50">
                    {/* Pronunciation Issues */}
                    {qf.pronunciation.mispronounced.length > 0 && (
                        <div>
                            <div className="text-xs font-bold text-red-600 uppercase mb-2">Mispronounced Words</div>
                            <div className="space-y-2">
                                {qf.pronunciation.mispronounced.map((m, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-red-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900">"{m.word}"</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${m.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                                }`}>{m.severity}</span>
                                        </div>
                                        <div className="text-xs">
                                            <span className="text-red-600">You said: {m.said}</span>
                                            <span className="text-slate-400 mx-2">→</span>
                                            <span className="text-emerald-600">Correct: {m.correct}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grammar Errors */}
                    {qf.grammar.errors.length > 0 && (
                        <div>
                            <div className="text-xs font-bold text-amber-600 uppercase mb-2">Grammar Errors</div>
                            <div className="space-y-2">
                                {qf.grammar.errors.map((e, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-amber-100">
                                        <div className="flex items-start gap-2">
                                            <XCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                                            <div>
                                                <div className="text-sm">
                                                    <span className="line-through text-red-600">{e.original}</span>
                                                    <span className="mx-2 text-slate-400">→</span>
                                                    <span className="text-emerald-600 font-medium">{e.correction}</span>
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1">Rule: {e.rule}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Vocabulary Suggestions */}
                    {qf.vocabulary.suggestions.length > 0 && (
                        <div>
                            <div className="text-xs font-bold text-blue-600 uppercase mb-2">Vocabulary Upgrade</div>
                            <div className="space-y-2">
                                {qf.vocabulary.suggestions.map((s, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-blue-100 flex items-center gap-3">
                                        <TrendingUp size={14} className="text-blue-500 shrink-0" />
                                        <div className="text-sm">
                                            <span className="text-slate-500">Instead of "</span>
                                            <span className="font-medium text-slate-700">{s.used}</span>
                                            <span className="text-slate-500">" try: </span>
                                            <span className="font-medium text-blue-600">{s.better}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fluency Notes */}
                    {qf.fluency.issues.length > 0 && (
                        <div>
                            <div className="text-xs font-bold text-violet-600 uppercase mb-2">Fluency Issues</div>
                            <ul className="space-y-1">
                                {qf.fluency.issues.map((issue, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                        <AlertCircle size={14} className="text-violet-500 mt-0.5 shrink-0" />
                                        {issue}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const SpeakingSession = () => {
    const { levelId } = useParams();
    const [searchParams] = useSearchParams();
    const trackId = searchParams.get('track') || 'conversation';
    const navigate = useNavigate();

    const questions = getQuestions(trackId, parseInt(levelId));
    const [sessionState, setSessionState] = useState(SESSION_STATE.INTRO);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [recordings, setRecordings] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [feedback, setFeedback] = useState(null);

    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null);
    const chunksRef = useRef([]);

    const currentQuestion = questions[currentIndex];
    const hasRecording = recordings[currentIndex] ? true : false;

    // TTS
    const speakQuestion = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(currentQuestion);
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Recording functions
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
                setRecordings(prev => {
                    const newRecordings = [...prev];
                    newRecordings[currentIndex] = blob;
                    return newRecordings;
                });
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
        } catch (err) {
            console.error('Mic error:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    };

    const reRecord = () => {
        setRecordings(prev => {
            const newRecs = [...prev];
            newRecs[currentIndex] = null;
            return newRecs;
        });
    };

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setRecordingTime(0);
        }
    };

    const submitAll = () => {
        setSessionState(SESSION_STATE.SUBMITTING);
        setTimeout(() => {
            setFeedback(generateDetailedFeedback(questions));
            setSessionState(SESSION_STATE.RESULTS);
        }, 3500);
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // INTRO Screen
    if (sessionState === SESSION_STATE.INTRO) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Mic size={32} className="text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Level {levelId} Test</h1>
                    <p className="text-slate-500 mb-6">
                        You will answer <strong>{questions.length} questions</strong> one by one.
                        Record your response for each. Detailed feedback will be given after completing all questions.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Target size={16} className="text-blue-500" /> Answer all questions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock size={16} className="text-blue-500" /> No time limit per question
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <BookOpen size={16} className="text-blue-500" /> Detailed analysis report at the end
                        </div>
                    </div>

                    <button
                        onClick={() => setSessionState(SESSION_STATE.PRACTICING)}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Start Test
                    </button>
                </div>
            </div>
        );
    }

    // SUBMITTING Screen
    if (sessionState === SESSION_STATE.SUBMITTING) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <Loader2 size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Your Responses</h2>
                    <p className="text-slate-500 mb-4">Generating detailed feedback...</p>
                    <div className="space-y-1 text-xs text-slate-400">
                        <p>• Analyzing pronunciation patterns...</p>
                        <p>• Checking grammar structures...</p>
                        <p>• Evaluating vocabulary usage...</p>
                        <p>• Measuring fluency metrics...</p>
                    </div>
                </div>
            </div>
        );
    }

    // RESULTS Screen - VERY DETAILED
    if (sessionState === SESSION_STATE.RESULTS && feedback) {
        return (
            <div className="min-h-screen bg-slate-100 py-8 px-4">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Header Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                        <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-black ${feedback.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                            }`}>
                            {feedback.grade}
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1">
                            {feedback.passed ? 'Test Passed' : 'Test Failed'}
                        </h1>
                        <p className="text-slate-500 mb-4">Level {levelId} • {questions.length} Questions • Band Score: {feedback.bandScore}</p>

                        <div className="flex justify-center gap-6 text-sm">
                            <div className="text-center">
                                <div className="font-bold text-slate-900">{feedback.totalDuration}</div>
                                <div className="text-xs text-slate-500">Total Time</div>
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-slate-900">{feedback.totalWords}</div>
                                <div className="text-xs text-slate-500">Words Spoken</div>
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-slate-900">{feedback.avgWPM} WPM</div>
                                <div className="text-xs text-slate-500">Avg Speed</div>
                            </div>
                        </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h2 className="font-bold text-slate-900 mb-4">Overall Performance</h2>
                        <div className="grid grid-cols-5 gap-3 mb-6">
                            {Object.entries(feedback.scores).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-lg font-bold mb-2 ${value >= 70 ? 'bg-emerald-100 text-emerald-700' :
                                            value >= 60 ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {value}
                                    </div>
                                    <div className="text-xs text-slate-500 capitalize">{key}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 text-center">
                            <div className="text-sm text-slate-400 mb-1">Overall Score</div>
                            <div className="text-5xl font-black">{feedback.overall}%</div>
                            <div className="text-sm text-slate-400 mt-1">IELTS Band Equivalent: {feedback.bandScore}</div>
                        </div>
                    </div>

                    {/* Per-Question Detailed Feedback */}
                    <CollapsibleSection title="Question-by-Question Analysis" icon={MessageCircle} defaultOpen={true}>
                        <div className="space-y-3 mt-4">
                            {feedback.questionFeedback.map((qf) => (
                                <QuestionFeedbackCard key={qf.questionNumber} qf={qf} />
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Strengths */}
                    <CollapsibleSection title="What You Did Well" icon={Star}>
                        <div className="space-y-2 mt-4">
                            {feedback.overallStrengths.map((strength, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-700">{strength}</p>
                                </div>
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Weaknesses - Detailed */}
                    <CollapsibleSection title="Areas Requiring Improvement" icon={AlertTriangle} defaultOpen={true}>
                        <div className="space-y-2 mt-4">
                            {feedback.overallWeaknesses.map((weakness, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                                    <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-700">{weakness}</p>
                                </div>
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Action Plan */}
                    <CollapsibleSection title="Your Improvement Action Plan" icon={Lightbulb} defaultOpen={true}>
                        <div className="space-y-3 mt-4">
                            {feedback.actionPlan.map((item, i) => (
                                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.priority === 'Critical' ? 'bg-red-100 text-red-600' :
                                                item.priority === 'High' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-blue-100 text-blue-600'
                                            }`}>{item.priority}</span>
                                        <span className="font-bold text-slate-900">{item.area}</span>
                                        <span className="text-xs text-slate-400 ml-auto">{item.timeline}</span>
                                    </div>
                                    <p className="text-sm text-slate-600">{item.action}</p>
                                </div>
                            ))}
                        </div>
                    </CollapsibleSection>

                    {/* Next Steps */}
                    <div className={`rounded-2xl p-6 ${feedback.passed ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
                        }`}>
                        <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${feedback.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                {feedback.passed ? <Trophy size={20} /> : <Target size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Next Steps</h3>
                                <p className={`text-sm ${feedback.passed ? 'text-emerald-800' : 'text-amber-800'}`}>
                                    {feedback.nextSteps}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(`/speaking/track/${trackId}`)}
                            className="flex-1 py-4 border border-slate-200 bg-white rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Back to Levels
                        </button>
                        <button
                            onClick={() => {
                                setRecordings([]);
                                setCurrentIndex(0);
                                setFeedback(null);
                                setSessionState(SESSION_STATE.INTRO);
                            }}
                            className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} /> Retry Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isLastQuestion = currentIndex === questions.length - 1;

    // PRACTICING Screen
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(`/speaking/track/${trackId}`)} className="p-2 hover:bg-slate-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="text-center">
                        <div className="font-bold text-slate-900">Question {currentIndex + 1} of {questions.length}</div>
                        <div className="text-xs text-slate-500">Level {levelId}</div>
                    </div>
                    <div className="w-10" />
                </div>
                <div className="max-w-2xl mx-auto mt-3">
                    <div className="flex gap-1">
                        {questions.map((_, i) => (
                            <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${recordings[i] ? 'bg-emerald-500' : i === currentIndex ? 'bg-blue-500' : 'bg-slate-200'
                                }`} />
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-blue-600 uppercase">Question {currentIndex + 1}</span>
                        <button onClick={speakQuestion} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm flex items-center gap-1 font-medium">
                            <Volume2 size={16} /> Listen
                        </button>
                    </div>
                    <p className="text-lg text-slate-800 font-medium leading-relaxed">{currentQuestion}</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <div className="h-24 bg-slate-50 rounded-xl mb-4 flex items-center justify-center relative">
                        {isRecording ? (
                            <div className="flex items-center gap-1">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className="w-1 bg-red-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 50 + 20}%`, animationDelay: `${i * 50}ms` }} />
                                ))}
                            </div>
                        ) : hasRecording ? (
                            <div className="text-center text-emerald-600">
                                <CheckCircle size={32} className="mx-auto mb-1" />
                                <div className="text-sm font-medium">Recorded</div>
                            </div>
                        ) : (
                            <div className="text-center text-slate-400">
                                <Mic size={28} className="mx-auto mb-1 opacity-50" />
                                <div className="text-sm">Tap to record</div>
                            </div>
                        )}
                        {isRecording && (
                            <div className="absolute top-3 right-3 text-red-500 font-mono text-sm flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                {formatTime(recordingTime)}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center gap-3">
                        {!isRecording && !hasRecording && (
                            <button onClick={startRecording} className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg">
                                <Mic size={24} />
                            </button>
                        )}
                        {isRecording && (
                            <button onClick={stopRecording} className="w-14 h-14 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-900 shadow-lg">
                                <Square size={20} fill="white" />
                            </button>
                        )}
                        {hasRecording && !isRecording && (
                            <button onClick={reRecord} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg flex items-center gap-2 hover:bg-slate-200">
                                <RotateCcw size={16} /> Re-record
                            </button>
                        )}
                    </div>
                </div>

                {hasRecording && !isRecording && (
                    <div>
                        {isLastQuestion ? (
                            <button
                                onClick={submitAll}
                                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-lg"
                            >
                                <Trophy size={20} /> Submit All Answers
                            </button>
                        ) : (
                            <button
                                onClick={goToNext}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
                            >
                                Next Question <ArrowRight size={20} />
                            </button>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SpeakingSession;
