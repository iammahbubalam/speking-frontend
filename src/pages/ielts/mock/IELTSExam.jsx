import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft, Save, X, Menu, Flag } from 'lucide-react';
import { ieltsMocks } from './IELTSMockData';

// Import Sections
import { ListeningSection } from '../sections/ListeningSection';
import { ReadingSection } from '../sections/ReadingSection';
import { WritingSection } from '../sections/WritingSection';
import { SpeakingSection } from '../sections/SpeakingSection';

const IELTSExam = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const examId = location.state?.examId || 'ielts-mock-1';

    const mockData = ieltsMocks.find(m => m.id === examId) || ieltsMocks[0];
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(mockData.sections[0].duration * 60);

    // UI States
    const [isTimerVisible, setIsTimerVisible] = useState(true);
    const [isReviewMode, setIsReviewMode] = useState(false); // Visual toggle for "Review" button

    const sections = ['Listening', 'Reading', 'Writing', 'Speaking'];
    const currentSectionName = sections[currentSectionIdx];
    const currentSectionData = mockData.sections[currentSectionIdx];

    // Helper to get total questions for palette
    const getTotalQuestions = () => {
        if (currentSectionName === 'Listening') {
            return currentSectionData.parts?.reduce((acc, part) => acc + part.questions.length, 0) || 40;
        }
        if (currentSectionName === 'Reading') {
            return currentSectionData.passages?.reduce((acc, p) => acc + (p.questions?.reduce((qAcc, q) => qAcc + q.items.length, 0) || 0), 0) || 40;
        }
        return 0; // Writing/Speaking don't have standard palette
    };

    const totalQuestions = getTotalQuestions();

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [currentSectionIdx]);

    useEffect(() => {
        setTimeLeft(mockData.sections[currentSectionIdx]?.duration * 60 || 1800);
    }, [currentSectionIdx, mockData]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const handleNext = () => {
        if (currentSectionIdx < sections.length - 1) {
            setCurrentSectionIdx(prev => prev + 1);
        } else {
            // Finish Exam
            navigate('/ielts');
        }
    };

    const renderSection = () => {
        switch (currentSectionName) {
            case 'Listening': return <ListeningSection data={currentSectionData} />;
            case 'Reading': return <ReadingSection data={currentSectionData} />;
            case 'Writing': return <WritingSection data={currentSectionData} />;
            case 'Speaking': return <SpeakingSection data={currentSectionData} />;
            default: return <div>Unknown Section</div>;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-100 overflow-hidden font-sans text-slate-900">
            {/* Authentic CBT Header */}
            <header className="bg-white border-b-4 border-slate-800 px-6 py-2 flex items-center justify-between shrink-0 h-16 shadow-sm z-30">
                <div className="flex items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/IELTS_logo.svg/1200px-IELTS_logo.svg.png" alt="IELTS" className="h-8 grayscale opacity-80" />
                    <div className="h-8 w-px bg-slate-300"></div>
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Candidate Name</div>
                        <div className="font-bold text-slate-900">John Doe</div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    {/* Timer */}
                    {isTimerVisible && (
                        <div className="flex flex-col items-end">
                            <div className="text-xs font-bold text-slate-500 uppercase">Time Remaining</div>
                            <div className={`font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setIsTimerVisible(!isTimerVisible)}
                        className="bg-slate-900 text-white px-4 py-2 rounded font-bold text-sm hover:bg-slate-700 transition-colors"
                    >
                        {isTimerVisible ? 'Hide' : 'Show'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden relative bg-slate-200">
                <div className="h-full w-full max-w-[1920px] mx-auto bg-white shadow-lg border-x border-slate-300">
                    {renderSection()}
                </div>
            </div>

            {/* Authentic Footer Navigation */}
            <footer className="bg-[#2D2D2D] text-white px-2 py-2 flex items-center justify-between shrink-0 h-16 z-30 select-none">
                <div className="flex items-center gap-2 w-1/4">
                    <button
                        onClick={() => setIsReviewMode(!isReviewMode)}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-colors text-sm font-medium ${isReviewMode ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-slate-300'}`}
                    >
                        <Flag size={16} fill={isReviewMode ? "white" : "none"} /> Review
                    </button>
                </div>

                {/* Question Palette */}
                {totalQuestions > 0 && (
                    <div className="flex-1 flex justify-center gap-1 overflow-x-auto px-4 no-scrollbar">
                        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(num => (
                            <button
                                key={num}
                                className="w-8 h-8 flex items-center justify-center text-xs font-bold bg-black border border-slate-600 hover:bg-white hover:text-black rounded transition-colors"
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-end gap-2 w-1/4">
                    <button className="w-12 h-10 bg-black border border-slate-600 text-white hover:bg-white hover:text-black transition-colors rounded flex items-center justify-center">
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="h-10 px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                        {currentSectionIdx === sections.length - 1 ? 'Finish' : currentSectionName === 'Speaking' ? 'Next' : 'Next Section'} <ChevronRight size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default IELTSExam;
