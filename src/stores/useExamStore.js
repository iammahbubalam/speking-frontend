import { create } from 'zustand';

const useExamStore = create((set, get) => ({
    currentSection: 'speaking',
    currentQuestionIndex: 0,
    questions: [
        { id: 1, type: 'read_aloud', title: 'Read Aloud', content: 'The extensive use of the internet has changed the way we communicate.' }, // Placeholder
        { id: 2, type: 'describe_image', title: 'Describe Image', content: 'graph_placeholder' },
        { id: 3, type: 'essay', title: 'Write Essay', content: 'Do you think AI will replace teachers?' }
    ],
    isFinished: false,

    nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
            set({ currentQuestionIndex: currentQuestionIndex + 1 });
        } else {
            set({ isFinished: true });
        }
    },

    resetExam: () => set({ currentQuestionIndex: 0, isFinished: false })
}));

export default useExamStore;
