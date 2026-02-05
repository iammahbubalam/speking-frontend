import { create } from 'zustand';

// Mock questions for demo - in production these would come from an API
const mockQuestions = {
    1: [
        { id: 1, text: "Describe your hometown and what makes it special.", type: "describe" },
        { id: 2, text: "What do you usually do on weekends?", type: "personal" },
        { id: 3, text: "Tell me about your favorite childhood memory.", type: "personal" },
    ],
    2: [
        { id: 4, text: "Some people prefer to work from home. What are the advantages and disadvantages?", type: "opinion" },
        { id: 5, text: "Describe a time when you helped someone.", type: "experience" },
        { id: 6, text: "What qualities make a good leader?", type: "opinion" },
    ],
    3: [
        { id: 7, text: "Do you think technology has improved our lives? Why or why not?", type: "opinion" },
        { id: 8, text: "Describe a place you would like to visit in the future.", type: "describe" },
        { id: 9, text: "How has your country changed in the last 20 years?", type: "describe" },
    ],
    4: [
        { id: 10, text: "What are the effects of social media on society?", type: "opinion" },
        { id: 11, text: "Describe a skill you would like to learn.", type: "personal" },
        { id: 12, text: "Talk about an important decision you made recently.", type: "experience" },
    ],
};

// Mock AI Feedback templates
const generateMockFeedback = () => ({
    overallScore: (Math.random() * 2 + 7).toFixed(1), // 7.0 - 9.0
    pronunciation: {
        score: Math.floor(Math.random() * 3) + 7,
        feedback: "Your pronunciation was clear with good vowel sounds. Minor issues with 'th' sounds detected."
    },
    fluency: {
        score: Math.floor(Math.random() * 3) + 6,
        feedback: "Good flow of speech with natural pauses. Consider reducing filler words like 'um' and 'uh'."
    },
    grammar: {
        score: Math.floor(Math.random() * 3) + 7,
        feedback: "Strong sentence structure overall. Watch out for subject-verb agreement in complex sentences."
    },
    vocabulary: {
        score: Math.floor(Math.random() * 3) + 7,
        feedback: "Good use of topic-specific vocabulary. Try incorporating more advanced linking phrases."
    },
    mistakes: [
        { word: "particularly", issue: "Stress on wrong syllable", suggestion: "par-TIC-u-lar-ly" },
        { word: "environment", issue: "Missing syllable", suggestion: "en-VI-ron-ment (4 syllables)" },
    ],
    tips: [
        "Practice linking words between sentences for smoother transitions.",
        "Record yourself and listen back to identify areas for improvement.",
        "Use the 'shadowing' technique with native speaker recordings.",
    ]
});

const useSpeakingStore = create((set, get) => ({
    // Level data
    levels: [
        { id: 1, title: "Introduction Basics", status: 'unlocked', stars: 0, questionsCount: 3 },
        { id: 2, title: "Personal Topics", status: 'locked', stars: 0, questionsCount: 3 },
        { id: 3, title: "Opinion Questions", status: 'locked', stars: 0, questionsCount: 3 },
        { id: 4, title: "Advanced Fluency", status: 'locked', stars: 0, questionsCount: 3 },
        { id: 5, title: "IELTS Part 2 Practice", status: 'locked', stars: 0, questionsCount: 4 },
        { id: 6, title: "Complex Arguments", status: 'locked', stars: 0, questionsCount: 4 },
        { id: 7, title: "Abstract Topics", status: 'locked', stars: 0, questionsCount: 4 },
        { id: 8, title: "Debate Skills", status: 'locked', stars: 0, questionsCount: 5 },
        { id: 9, title: "Professional Speaking", status: 'locked', stars: 0, questionsCount: 5 },
        { id: 10, title: "Final Challenge", status: 'locked', stars: 0, questionsCount: 6 },
    ],

    // Session state
    currentLevelId: null,
    questions: [],
    currentQuestionIndex: 0,

    // Recording state
    isRecording: false,
    audioBlob: null,
    recordingDuration: 0,

    // Analysis state
    isAnalyzing: false,
    feedback: null,
    showFeedback: false,

    // Session state
    sessionComplete: false,
    sessionScore: 0,

    // Actions
    startLevel: (levelId) => {
        const questions = mockQuestions[levelId] || mockQuestions[1];
        set({
            currentLevelId: levelId,
            questions,
            currentQuestionIndex: 0,
            audioBlob: null,
            feedback: null,
            showFeedback: false,
            sessionComplete: false,
            sessionScore: 0,
        });
    },

    nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
            set({
                currentQuestionIndex: currentQuestionIndex + 1,
                audioBlob: null,
                feedback: null,
                showFeedback: false,
            });
        } else {
            // Level complete
            const { sessionScore, currentLevelId, levels } = get();
            const avgScore = sessionScore / questions.length;
            const stars = avgScore >= 8 ? 3 : avgScore >= 7 ? 2 : 1;

            // Update level status
            const updatedLevels = levels.map((lvl, idx) => {
                if (lvl.id === currentLevelId) {
                    return { ...lvl, status: 'completed', stars };
                }
                // Unlock next level
                if (idx === currentLevelId && lvl.status === 'locked') {
                    return { ...lvl, status: 'unlocked' };
                }
                return lvl;
            });

            set({
                sessionComplete: true,
                levels: updatedLevels,
            });
        }
    },

    setRecording: (isRecording) => set({ isRecording }),
    setAudioBlob: (blob) => set({ audioBlob: blob }),
    setRecordingDuration: (duration) => set({ recordingDuration: duration }),

    submitAnswer: () => {
        set({ isAnalyzing: true });

        // Simulate AI analysis delay
        setTimeout(() => {
            const feedback = generateMockFeedback();
            const { sessionScore } = get();
            set({
                isAnalyzing: false,
                feedback,
                showFeedback: true,
                sessionScore: sessionScore + parseFloat(feedback.overallScore),
            });
        }, 2500);
    },

    resetSession: () => set({
        currentLevelId: null,
        questions: [],
        currentQuestionIndex: 0,
        audioBlob: null,
        feedback: null,
        showFeedback: false,
        sessionComplete: false,
        sessionScore: 0,
    }),

    // TTS function
    speakQuestion: (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.lang = 'en-US';

            // Try to get a natural voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
        }
    },
}));

export default useSpeakingStore;
