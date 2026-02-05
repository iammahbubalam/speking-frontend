import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Volume2, Mic, CheckCircle, RotateCcw, Play, Pause,
    AlertCircle, Star, Lock, ChevronRight, Award, Target,
    TrendingUp, Headphones, X, Square, Info
} from 'lucide-react';

// Comprehensive sound data
const soundModules = {
    consonants: {
        title: 'Consonant Mastery',
        description: 'Master the consonant sounds that Bangladeshi speakers find challenging',
        icon: '🔤',
        color: 'blue',
        sounds: [
            {
                id: 'th_voiceless',
                symbol: 'θ',
                name: 'TH (voiceless)',
                example: 'think, three, bath',
                difficulty: 'hard',
                completed: false,
                tip: 'Place your tongue between your teeth and blow air. Don\'t say "t" or "s".',
                commonMistake: 'Saying "tink" instead of "think"',
                minimalPairs: ['think - sink', 'thick - sick', 'three - tree'],
                practiceWords: ['think', 'thought', 'through', 'birthday', 'healthy', 'nothing'],
            },
            {
                id: 'th_voiced',
                symbol: 'ð',
                name: 'TH (voiced)',
                example: 'this, that, brother',
                difficulty: 'hard',
                completed: false,
                tip: 'Like θ but with voice vibration. Feel your throat vibrate.',
                commonMistake: 'Saying "dis" instead of "this"',
                minimalPairs: ['this - dis', 'that - dat', 'they - day'],
                practiceWords: ['this', 'that', 'mother', 'father', 'brother', 'together'],
            },
            {
                id: 'v_sound',
                symbol: 'v',
                name: 'V Sound',
                example: 'very, video, love',
                difficulty: 'medium',
                completed: true,
                tip: 'Bite your lower lip gently with upper teeth and voice.',
                commonMistake: 'Saying "berry" instead of "very"',
                minimalPairs: ['very - berry', 'vest - best', 'vine - wine'],
                practiceWords: ['very', 'video', 'never', 'have', 'love', 'believe'],
            },
            {
                id: 'w_sound',
                symbol: 'w',
                name: 'W Sound',
                example: 'water, window, away',
                difficulty: 'medium',
                completed: false,
                tip: 'Round your lips like kissing, then open them while voicing.',
                commonMistake: 'Saying "vater" instead of "water"',
                minimalPairs: ['wine - vine', 'west - vest', 'wet - vet'],
                practiceWords: ['water', 'window', 'want', 'weather', 'always', 'anywhere'],
            },
            {
                id: 'r_sound',
                symbol: 'r',
                name: 'R Sound',
                example: 'red, right, very',
                difficulty: 'hard',
                completed: false,
                tip: 'Curl your tongue back without touching the roof of your mouth.',
                commonMistake: 'Mixing up "right" and "light"',
                minimalPairs: ['right - light', 'red - led', 'rice - lice'],
                practiceWords: ['red', 'right', 'run', 'during', 'every', 'remember'],
            },
            {
                id: 'z_sound',
                symbol: 'z',
                name: 'Z Sound',
                example: 'zero, zone, amazing',
                difficulty: 'easy',
                completed: true,
                tip: 'Like "s" but with voice vibration. Your throat should vibrate.',
                commonMistake: 'Saying "jero" instead of "zero"',
                minimalPairs: ['zero - jero', 'zoo - shoe', 'zone - Joan'],
                practiceWords: ['zero', 'zone', 'amazing', 'busy', 'because', 'organize'],
            },
        ]
    },
    vowels: {
        title: 'Vowel Precision',
        description: 'Distinguish between similar vowel sounds accurately',
        icon: '🗣️',
        color: 'violet',
        sounds: [
            {
                id: 'short_a',
                symbol: 'æ',
                name: 'Short A',
                example: 'cat, hat, man',
                difficulty: 'medium',
                completed: false,
                tip: 'Open your mouth wide and push your tongue forward and down.',
                commonMistake: 'Saying "ket" instead of "cat"',
                minimalPairs: ['cat - cut', 'hat - hut', 'bat - but'],
                practiceWords: ['cat', 'hat', 'man', 'apple', 'happy', 'family'],
            },
            {
                id: 'schwa',
                symbol: 'ə',
                name: 'Schwa',
                example: 'about, taken, pencil',
                difficulty: 'hard',
                completed: false,
                tip: 'The most common English sound! Very short et neutral - "uh".',
                commonMistake: 'Stressing every syllable equally',
                minimalPairs: ['oppose - "o-POSE"', 'about - "a-BOUT"'],
                practiceWords: ['about', 'taken', 'pencil', 'problem', 'different', 'important'],
            },
            {
                id: 'short_i',
                symbol: 'ɪ',
                name: 'Short I',
                example: 'sit, bit, ship',
                difficulty: 'medium',
                completed: true,
                tip: 'Relax your tongue and make a short sound.',
                commonMistake: 'Confusing with long "ee" sound',
                minimalPairs: ['ship - sheep', 'sit - seat', 'bit - beat'],
                practiceWords: ['sit', 'bit', 'ship', 'women', 'busy', 'build'],
            },
            {
                id: 'long_ee',
                symbol: 'iː',
                name: 'Long EE',
                example: 'seat, sheep, beach',
                difficulty: 'easy',
                completed: true,
                tip: 'Spread your lips like smiling and hold the sound.',
                commonMistake: 'Making it too short',
                minimalPairs: ['sheep - ship', 'seat - sit', 'beat - bit'],
                practiceWords: ['seat', 'sheep', 'beach', 'people', 'already', 'believe'],
            },
        ]
    },
    stress: {
        title: 'Word Stress Patterns',
        description: 'Learn where to emphasize syllables in words',
        icon: '📢',
        color: 'amber',
        sounds: [
            {
                id: 'stress_noun_verb',
                symbol: '●○',
                name: 'Noun vs Verb Stress',
                example: 'PREsent vs preSENT',
                difficulty: 'medium',
                completed: false,
                tip: 'Many words change meaning based on stress. Nouns stress the first syllable.',
                commonMistake: 'Using the same stress for both',
                minimalPairs: ['PREsent (gift) - preSENT (give)', 'REcord (album) - reCORD (save)'],
                practiceWords: ['present', 'record', 'protest', 'project', 'object', 'conduct'],
            },
            {
                id: 'stress_suffixes',
                symbol: '○●',
                name: 'Suffix Stress Rules',
                example: '-tion, -sion, -ic, -ity',
                difficulty: 'medium',
                completed: false,
                tip: 'Stress falls on the syllable BEFORE these suffixes.',
                commonMistake: 'Stressing the suffix itself',
                minimalPairs: ['eduCAtion', 'commuNIcation', 'techNOlogy'],
                practiceWords: ['education', 'communication', 'technology', 'scientific', 'electricity'],
            },
            {
                id: 'compound_stress',
                symbol: '●○○',
                name: 'Compound Words',
                example: 'BLACKboard, AIRport',
                difficulty: 'easy',
                completed: true,
                tip: 'Usually stress the FIRST word in compound nouns.',
                commonMistake: 'Equal stress on both parts',
                minimalPairs: ['BLACKboard vs black BOARD'],
                practiceWords: ['blackboard', 'airport', 'notebook', 'football', 'sunshine', 'birthday'],
            },
        ]
    },
    intonation: {
        title: 'Sentence Intonation',
        description: 'Master the melody and rhythm of English speech',
        icon: '🎵',
        color: 'emerald',
        sounds: [
            {
                id: 'falling_statements',
                symbol: '↘',
                name: 'Falling (Statements)',
                example: 'This is my book.',
                difficulty: 'easy',
                completed: true,
                tip: 'Your voice goes down at the end of statements and WH-questions.',
                commonMistake: 'Making statements sound like questions',
                minimalPairs: ['This is correct. ↘', 'I like coffee. ↘'],
                practiceWords: ['I work in Dhaka.', 'She is my friend.', 'What is your name?', 'Where do you live?'],
            },
            {
                id: 'rising_questions',
                symbol: '↗',
                name: 'Rising (Yes/No Questions)',
                example: 'Is this correct?',
                difficulty: 'medium',
                completed: false,
                tip: 'Raise your voice at the end for yes/no questions.',
                commonMistake: 'Using falling tone for questions',
                minimalPairs: ['Is this correct? ↗', 'Can you help me? ↗'],
                practiceWords: ['Is this correct?', 'Do you understand?', 'Are you coming?', 'Can I help you?'],
            },
            {
                id: 'choice_intonation',
                symbol: '↗↘',
                name: 'Choice Questions',
                example: 'Coffee ↗ or tea ↘?',
                difficulty: 'hard',
                completed: false,
                tip: 'Rise on the first option, fall on the last option.',
                commonMistake: 'Rising on both or falling on both',
                minimalPairs: ['Coffee ↗ or tea ↘?', 'Red ↗, blue ↗, or green ↘?'],
                practiceWords: ['Coffee or tea?', 'Today or tomorrow?', 'Here or there?', 'Now or later?'],
            },
        ]
    },
};

// Difficulty Badge
const DifficultyBadge = ({ level }) => {
    const styles = {
        easy: 'bg-emerald-100 text-emerald-700',
        medium: 'bg-amber-100 text-amber-700',
        hard: 'bg-red-100 text-red-700',
    };
    return (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${styles[level]}`}>
            {level}
        </span>
    );
};

// Sound Item Card
const SoundItem = ({ sound, onSelect, isActive }) => (
    <button
        onClick={() => onSelect(sound)}
        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${isActive
                ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
    >
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-mono font-bold shrink-0 ${sound.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
            }`}>
            {sound.symbol}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-slate-900">{sound.name}</span>
                <DifficultyBadge level={sound.difficulty} />
                {sound.completed && <CheckCircle size={14} className="text-emerald-500" />}
            </div>
            <div className="text-sm text-slate-500 truncate">{sound.example}</div>
        </div>
        <ChevronRight size={18} className="text-slate-300" />
    </button>
);

// Practice Panel
const PracticePanel = ({ sound, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [practiceResults, setPracticeResults] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const timerRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const steps = ['Learn', 'Listen', 'Practice', 'Complete'];

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const playWord = (word) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.rate = 0.7;
            utterance.onstart = () => setIsPlaying(true);
            utterance.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const playAllWords = () => {
        sound.practiceWords.forEach((word, i) => {
            setTimeout(() => playWord(word), i * 1500);
        });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);

            mediaRecorderRef.current.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
                // Simulate result
                const result = Math.random() > 0.3 ? 'good' : 'retry';
                setPracticeResults(prev => [...prev, { word: sound.practiceWords[currentWordIndex], result }]);

                if (currentWordIndex < sound.practiceWords.length - 1) {
                    setCurrentWordIndex(prev => prev + 1);
                } else {
                    setCurrentStep(3);
                }
            };
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

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-mono text-xl font-bold">
                            {sound.symbol}
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900">{sound.name}</h2>
                            <p className="text-sm text-slate-500">{sound.example}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                    {steps.map((step, i) => (
                        <div key={step} className="flex-1 flex items-center gap-2">
                            <div className={`w-full h-1.5 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-slate-200'
                                }`} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-1">
                    {steps.map((step, i) => (
                        <span key={step} className={`text-[10px] font-medium ${i <= currentStep ? 'text-blue-600' : 'text-slate-400'
                            }`}>{step}</span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                {currentStep === 0 && (
                    <div className="space-y-6">
                        {/* Tip */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-blue-800 mb-1">How to pronounce</div>
                                    <p className="text-sm text-blue-700">{sound.tip}</p>
                                </div>
                            </div>
                        </div>

                        {/* Common Mistake */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-amber-800 mb-1">Common Mistake</div>
                                    <p className="text-sm text-amber-700">{sound.commonMistake}</p>
                                </div>
                            </div>
                        </div>

                        {/* Minimal Pairs */}
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-3">Minimal Pairs (Spot the Difference)</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {sound.minimalPairs.map((pair, i) => (
                                    <button
                                        key={i}
                                        onClick={() => playWord(pair.split(' - ')[0])}
                                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                                    >
                                        <span className="font-medium text-slate-700">{pair}</span>
                                        <Volume2 size={16} className="text-slate-400" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setCurrentStep(1)}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                            Continue to Listen →
                        </button>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div className="text-center py-8">
                            <Headphones size={48} className="mx-auto text-blue-500 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Listen Carefully</h3>
                            <p className="text-slate-500 mb-6">Hear each word pronounced correctly</p>

                            <button
                                onClick={playAllWords}
                                disabled={isPlaying}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                {isPlaying ? 'Playing...' : 'Play All Words'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {sound.practiceWords.map((word, i) => (
                                <button
                                    key={i}
                                    onClick={() => playWord(word)}
                                    className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
                                >
                                    <Volume2 size={16} className="text-blue-500" />
                                    <span className="font-medium text-slate-700">{word}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentStep(2)}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                            Start Practice →
                        </button>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="text-sm text-slate-500 mb-2">Word {currentWordIndex + 1} of {sound.practiceWords.length}</div>
                            <div className="text-4xl font-bold text-slate-900 mb-4">
                                {sound.practiceWords[currentWordIndex]}
                            </div>
                            <button
                                onClick={() => playWord(sound.practiceWords[currentWordIndex])}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors mb-6"
                            >
                                <Volume2 size={16} /> Listen First
                            </button>
                        </div>

                        {/* Recording Visualizer */}
                        <div className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center min-h-[120px]">
                            {isRecording ? (
                                <div className="flex items-center gap-1">
                                    {[...Array(20)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-red-500 rounded-full animate-pulse"
                                            style={{
                                                height: `${Math.random() * 60 + 20}px`,
                                                animationDelay: `${i * 50}ms`
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-slate-400">
                                    <Mic size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Tap to record your pronunciation</p>
                                </div>
                            )}
                        </div>

                        {isRecording && (
                            <div className="text-center text-red-500 font-mono">
                                Recording: {formatTime(recordingTime)}
                            </div>
                        )}

                        <div className="flex justify-center">
                            {!isRecording ? (
                                <button
                                    onClick={startRecording}
                                    className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transition-all hover:scale-105"
                                >
                                    <Mic size={32} />
                                </button>
                            ) : (
                                <button
                                    onClick={stopRecording}
                                    className="w-20 h-20 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-900 shadow-lg transition-all"
                                >
                                    <Square size={28} fill="white" />
                                </button>
                            )}
                        </div>

                        {/* Progress */}
                        {practiceResults.length > 0 && (
                            <div className="flex gap-1 justify-center">
                                {practiceResults.map((r, i) => (
                                    <div key={i} className={`w-8 h-2 rounded-full ${r.result === 'good' ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`} />
                                ))}
                                {[...Array(sound.practiceWords.length - practiceResults.length)].map((_, i) => (
                                    <div key={`empty-${i}`} className="w-8 h-2 rounded-full bg-slate-200" />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="text-center py-8 space-y-6">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full mx-auto flex items-center justify-center">
                            <Award size={48} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Practice Complete!</h3>
                            <p className="text-slate-500">You practiced all {sound.practiceWords.length} words</p>
                        </div>

                        {/* Results Summary */}
                        <div className="bg-slate-50 rounded-xl p-4">
                            <div className="flex justify-around">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-emerald-600">
                                        {practiceResults.filter(r => r.result === 'good').length}
                                    </div>
                                    <div className="text-xs text-slate-500">Good</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-amber-600">
                                        {practiceResults.filter(r => r.result === 'retry').length}
                                    </div>
                                    <div className="text-xs text-slate-500">Need Practice</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setCurrentWordIndex(0);
                                    setPracticeResults([]);
                                }}
                                className="flex-1 py-3 border border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} /> Practice Again
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const PronunciationLab = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('consonants');
    const [selectedSound, setSelectedSound] = useState(null);

    const currentModule = soundModules[activeTab];
    const tabs = Object.entries(soundModules).map(([key, mod]) => ({
        id: key,
        title: mod.title.split(' ')[0],
        icon: mod.icon,
        color: mod.color,
    }));

    // Stats
    const allSounds = Object.values(soundModules).flatMap(m => m.sounds);
    const completedCount = allSounds.filter(s => s.completed).length;
    const totalCount = allSounds.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/speaking')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">Pronunciation Lab</h1>
                                <p className="text-sm text-slate-500">Master challenging English sounds</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                            <TrendingUp size={16} className="text-blue-500" />
                            <span className="text-sm font-medium text-slate-700">{progressPercent}% Complete</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto p-6">
                <div className="flex gap-6">
                    {/* Sound List */}
                    <div className={`${selectedSound ? 'hidden md:block md:w-1/2' : 'w-full'} space-y-3`}>
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{currentModule.icon}</span>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">{currentModule.title}</h2>
                                    <p className="text-sm text-slate-500">{currentModule.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all"
                                        style={{ width: `${(currentModule.sounds.filter(s => s.completed).length / currentModule.sounds.length) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-slate-500">
                                    {currentModule.sounds.filter(s => s.completed).length}/{currentModule.sounds.length}
                                </span>
                            </div>
                        </div>

                        {currentModule.sounds.map((sound) => (
                            <SoundItem
                                key={sound.id}
                                sound={sound}
                                isActive={selectedSound?.id === sound.id}
                                onSelect={setSelectedSound}
                            />
                        ))}
                    </div>

                    {/* Practice Panel */}
                    {selectedSound && (
                        <div className="w-full md:w-1/2">
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-[160px]" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                <PracticePanel
                                    sound={selectedSound}
                                    onClose={() => setSelectedSound(null)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PronunciationLab;
