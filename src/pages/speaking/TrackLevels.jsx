import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, Star, CheckCircle, Play, Mic, BookOpen, Briefcase } from 'lucide-react';

// Track configuration
const trackData = {
    conversation: {
        title: 'Daily Conversation',
        description: 'Master real-life English conversations',
        icon: Mic,
        color: 'blue',
        levels: [
            { id: 1, title: 'First Impressions', subtitle: 'Greetings, introductions, small talk', questions: 5, status: 'completed', stars: 3 },
            { id: 2, title: 'At the Restaurant', subtitle: 'Ordering, asking questions, paying', questions: 5, status: 'completed', stars: 2 },
            { id: 3, title: 'Shopping & Bargaining', subtitle: 'Prices, sizes, complaints', questions: 6, status: 'completed', stars: 3 },
            { id: 4, title: 'Getting Around', subtitle: 'Directions, transport, asking for help', questions: 5, status: 'unlocked', stars: 0 },
            { id: 5, title: 'Phone & Video Calls', subtitle: 'Answering, holding, ending calls', questions: 6, status: 'locked', stars: 0 },
            { id: 6, title: 'Social Gatherings', subtitle: 'Parties, events, meeting people', questions: 5, status: 'locked', stars: 0 },
            { id: 7, title: 'Telling Stories', subtitle: 'Past events, sequences, emotions', questions: 6, status: 'locked', stars: 0 },
            { id: 8, title: 'Expressing Opinions', subtitle: 'Agree, disagree, persuading', questions: 5, status: 'locked', stars: 0 },
            { id: 9, title: 'Problem Solving', subtitle: 'Complaints, conflicts, solutions', questions: 6, status: 'locked', stars: 0 },
            { id: 10, title: 'Debates & Arguments', subtitle: 'Taking sides, defending points', questions: 6, status: 'locked', stars: 0 },
            { id: 11, title: 'Humor & Sarcasm', subtitle: 'Jokes, idioms, cultural references', questions: 5, status: 'locked', stars: 0 },
            { id: 12, title: 'Master Conversations', subtitle: 'Complex multi-turn dialogues', questions: 8, status: 'locked', stars: 0 },
        ]
    },
    academic: {
        title: 'Academic English',
        description: 'Structured responses for exams and presentations',
        icon: BookOpen,
        color: 'violet',
        levels: [
            { id: 1, title: 'Speaking Basics', subtitle: 'Clear articulation, basic structures', questions: 5, status: 'unlocked', stars: 0 },
            { id: 2, title: 'Describing Objects', subtitle: 'Physical descriptions, features', questions: 5, status: 'locked', stars: 0 },
            { id: 3, title: 'Describing Processes', subtitle: 'Steps, sequences, how things work', questions: 6, status: 'locked', stars: 0 },
            { id: 4, title: 'Expressing Opinions', subtitle: 'I think, I believe, In my view', questions: 5, status: 'locked', stars: 0 },
            { id: 5, title: 'Compare & Contrast', subtitle: 'Similarities, differences, preferences', questions: 6, status: 'locked', stars: 0 },
            { id: 6, title: 'Cause & Effect', subtitle: 'Because, therefore, as a result', questions: 5, status: 'locked', stars: 0 },
            { id: 7, title: 'Hypotheticals', subtitle: 'If I were, Would have, Could be', questions: 6, status: 'locked', stars: 0 },
            { id: 8, title: 'Data & Trends', subtitle: 'Charts, graphs, statistics verbally', questions: 5, status: 'locked', stars: 0 },
            { id: 9, title: 'Abstract Topics', subtitle: 'Freedom, technology, culture', questions: 6, status: 'locked', stars: 0 },
            { id: 10, title: 'Full Response Practice', subtitle: '2-minute extended answers', questions: 8, status: 'locked', stars: 0 },
        ]
    },
    corporate: {
        title: 'Corporate English',
        description: 'Professional communication for the workplace',
        icon: Briefcase,
        color: 'emerald',
        levels: [
            { id: 1, title: 'Professional Introductions', subtitle: 'Who you are, what you do', questions: 5, status: 'unlocked', stars: 0 },
            { id: 2, title: 'Talking About Work', subtitle: 'Projects, responsibilities', questions: 5, status: 'locked', stars: 0 },
            { id: 3, title: 'Meeting Participation', subtitle: 'Contributing, asking questions', questions: 6, status: 'locked', stars: 0 },
            { id: 4, title: 'Giving Updates', subtitle: 'Status reports, progress', questions: 5, status: 'locked', stars: 0 },
            { id: 5, title: 'Handling Conflicts', subtitle: 'Polite disagreement, resolution', questions: 6, status: 'locked', stars: 0 },
            { id: 6, title: 'Presentations', subtitle: 'Structuring, delivering key points', questions: 5, status: 'locked', stars: 0 },
            { id: 7, title: 'Client Interactions', subtitle: 'Professionalism, persuasion', questions: 6, status: 'locked', stars: 0 },
            { id: 8, title: 'Leadership Communication', subtitle: 'Delegation, motivation, feedback', questions: 8, status: 'locked', stars: 0 },
        ]
    }
};

const colorStyles = {
    blue: {
        headerBg: 'from-blue-500 to-blue-700',
        iconBg: 'bg-blue-400/30',
        levelBg: 'bg-blue-50 border-blue-200 hover:border-blue-400',
        activeBg: 'bg-blue-100 border-blue-400 ring-2 ring-blue-200',
        starActive: 'fill-amber-400 text-amber-400',
        starInactive: 'text-slate-300',
    },
    violet: {
        headerBg: 'from-violet-500 to-violet-700',
        iconBg: 'bg-violet-400/30',
        levelBg: 'bg-violet-50 border-violet-200 hover:border-violet-400',
        activeBg: 'bg-violet-100 border-violet-400 ring-2 ring-violet-200',
        starActive: 'fill-amber-400 text-amber-400',
        starInactive: 'text-slate-300',
    },
    emerald: {
        headerBg: 'from-emerald-500 to-emerald-700',
        iconBg: 'bg-emerald-400/30',
        levelBg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
        activeBg: 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-200',
        starActive: 'fill-amber-400 text-amber-400',
        starInactive: 'text-slate-300',
    },
};

// Level Card Component
const LevelCard = ({ level, colorStyle, onSelect }) => {
    const isLocked = level.status === 'locked';
    const isCompleted = level.status === 'completed';
    const isUnlocked = level.status === 'unlocked';

    return (
        <button
            onClick={() => !isLocked && onSelect(level.id)}
            disabled={isLocked}
            className={`
                p-4 rounded-xl border-2 text-left transition-all duration-200 w-full
                ${isLocked ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed' :
                    isUnlocked ? colorStyle.activeBg :
                        `bg-white border-slate-200 hover:border-slate-300 hover:shadow-md`}
            `}
        >
            <div className="flex items-center gap-4">
                {/* Level Number */}
                <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0
                    ${isLocked ? 'bg-slate-200 text-slate-400' :
                        isCompleted ? 'bg-emerald-500 text-white' :
                            'bg-blue-600 text-white animate-pulse'}
                `}>
                    {isLocked ? <Lock size={18} /> :
                        isCompleted ? <CheckCircle size={20} /> :
                            level.id}
                </div>

                {/* Level Info */}
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                        {level.title}
                    </h3>
                    <p className={`text-sm ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                        {level.subtitle}
                    </p>
                    {isCompleted && (
                        <div className="flex gap-0.5 mt-1">
                            {[...Array(3)].map((_, i) => (
                                <Star key={i} size={12} className={i < level.stars ? colorStyle.starActive : colorStyle.starInactive} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side */}
                <div className="shrink-0 text-right">
                    <div className="text-xs text-slate-400">{level.questions} questions</div>
                    {isUnlocked && (
                        <div className="mt-1 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <Play size={10} fill="white" /> Start
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};

const TrackLevels = () => {
    const { trackId } = useParams();
    const navigate = useNavigate();

    const track = trackData[trackId];
    if (!track) {
        return <div className="text-center py-12">Track not found</div>;
    }

    const Icon = track.icon;
    const styles = colorStyles[track.color];
    const completedCount = track.levels.filter(l => l.status === 'completed').length;
    const totalStars = track.levels.reduce((acc, l) => acc + l.stars, 0);
    const maxStars = track.levels.length * 3;

    const handleSelectLevel = (levelId) => {
        navigate(`/speaking/level/${levelId}?track=${trackId}`);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className={`bg-gradient-to-r ${styles.headerBg} rounded-2xl p-6 text-white mb-8`}>
                <button
                    onClick={() => navigate('/speaking')}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors mb-4 inline-flex"
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${styles.iconBg} rounded-xl flex items-center justify-center`}>
                        <Icon size={28} />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{track.title}</h1>
                        <p className="text-white/80 text-sm">{track.description}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-6">
                    <div>
                        <div className="text-2xl font-bold">{completedCount}/{track.levels.length}</div>
                        <div className="text-sm text-white/60">Levels Done</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold flex items-center gap-1">
                            <Star size={18} className="fill-amber-300 text-amber-300" />
                            {totalStars}/{maxStars}
                        </div>
                        <div className="text-sm text-white/60">Stars Earned</div>
                    </div>
                </div>
            </div>

            {/* Levels List */}
            <div className="space-y-3">
                {track.levels.map((level) => (
                    <LevelCard
                        key={level.id}
                        level={level}
                        colorStyle={styles}
                        onSelect={handleSelectLevel}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrackLevels;
