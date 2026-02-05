import React from 'react';
import { useNavigate } from 'react-router-dom';
import DescribeImage from '../components/pte/DescribeImage';
import useExamStore from '../stores/useExamStore';

const PTEMock = () => {
    const { questions, currentQuestionIndex, isFinished, resetExam } = useExamStore();
    const currentQuestion = questions[currentQuestionIndex];
    const navigate = useNavigate();

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
                <h1 className="text-4xl font-bold text-slate-800">Exam Completed</h1>
                <div className="text-lg text-slate-600">Your answers have been submitted.</div>
                <button
                    onClick={() => { resetExam(); navigate('/dashboard'); }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="pt-8 bg-white h-full">
            <h1 className="text-2xl font-bold text-center mb-8 font-serif uppercase tracking-wide border-b border-gray-200 pb-4 mx-8">
                {currentQuestion.title}
            </h1>

            {currentQuestion.type === 'describe_image' && <DescribeImage />}

            {currentQuestion.type === 'read_aloud' && (
                <div className="max-w-4xl mx-auto p-8 border border-gray-200 rounded shadow-sm">
                    <p className="text-lg leading-relaxed mb-8">{currentQuestion.content}</p>
                    <div className="h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold">
                        [Recorder Placeholder for Read Aloud]
                    </div>
                </div>
            )}

            {currentQuestion.type === 'essay' && (
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-blue-50 p-4 border border-blue-200 rounded mb-6 text-sm text-blue-900">
                        <strong>Prompt:</strong> {currentQuestion.content}
                    </div>
                    <textarea
                        className="w-full h-64 p-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Type your essay here..."
                    ></textarea>
                </div>
            )}
        </div>
    );
};

export default PTEMock;
