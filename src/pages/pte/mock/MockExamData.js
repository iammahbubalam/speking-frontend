// Complete PTE Mock Exam Data
const mock1 = {
    id: 'mock-1',
    title: 'PTE Academic Mock Test 1',
    difficulty: 'Standard',
    sections: [
        {
            name: 'Speaking & Writing',
            questions: [
                { id: 1, type: 'read-aloud', content: 'Climate change represents one of the most significant challenges facing our planet today. Scientists worldwide have documented rising temperatures, melting ice caps, and increasingly extreme weather events that threaten ecosystems and human communities alike.' },
                { id: 2, type: 'repeat-sentence', audioText: 'The university library will be closed for renovations during the summer break.' },
                { id: 3, type: 'describe-image', imageDesc: 'Bar chart showing quarterly sales growth from 2022 to 2024' },
                { id: 4, type: 'retell-lecture', audioText: 'Today we will discuss the impact of social media on modern communication. Studies show that while social platforms have connected billions of people, they have also changed how we process information and maintain relationships.' },
                { id: 5, type: 'answer-short', audioText: 'What is the capital city of Australia?' },
                { id: 6, type: 'summarize-written', content: 'The development of artificial intelligence has transformed numerous industries, from healthcare to transportation. Machine learning algorithms can now diagnose diseases with remarkable accuracy, while self-driving vehicles promise to revolutionize how we travel. However, these advances also raise important ethical questions about privacy, job displacement, and the need for regulatory frameworks to ensure AI is developed responsibly.' },
                { id: 7, type: 'essay', prompt: 'Some people believe that technology has made our lives more complicated rather than simpler. To what extent do you agree or disagree with this statement? Support your argument with reasons and examples.' },
            ]
        },
        {
            name: 'Reading',
            questions: [
                { id: 8, type: 'mcq-single', content: 'The Industrial Revolution, which began in Britain in the late 18th century, marked a major turning point in human history. It transformed predominantly agrarian societies into industrial powerhouses, fundamentally changing how people lived and worked.', question: 'According to the passage, when did the Industrial Revolution begin?', options: ['Early 17th century', 'Late 18th century', 'Mid 19th century', 'Early 20th century'] },
                { id: 9, type: 'mcq-multiple', content: 'Renewable energy sources such as solar, wind, and hydroelectric power offer significant environmental benefits. They produce little to no greenhouse gas emissions, reduce dependence on fossil fuels, and can be replenished naturally. However, challenges remain including intermittency issues and initial installation costs.', question: 'Which of the following are mentioned as benefits of renewable energy?', options: ['Reduces greenhouse emissions', 'Lower initial costs', 'Reduces fossil fuel dependence', 'Can be naturally replenished', 'Provides constant power'] },
                { id: 10, type: 'reorder', paragraphs: ['First, researchers identified the problem through extensive surveys.', 'The study began with a comprehensive literature review.', 'Finally, the team published their findings in a peer-reviewed journal.', 'Next, they developed a methodology to address the research questions.', 'Data was then collected over a period of six months.'] },
                { id: 11, type: 'reading-fib', content: 'The human brain is a remarkably ___ organ that processes millions of signals every second. It contains approximately 86 ___ neurons, each connected to thousands of others. This intricate ___ of connections enables everything from basic motor functions to complex abstract ___.', options: [['complex', 'simple', 'small'], ['billion', 'million', 'thousand'], ['network', 'group', 'type'], ['thinking', 'movement', 'breathing']] },
                { id: 12, type: 'rw-fib', content: 'Climate scientists have ___ that global temperatures will continue to rise unless significant action is taken. The ___ of carbon dioxide in the atmosphere has reached unprecedented levels, primarily due to the burning of ___ fuels.', options: [['predicted', 'denied', 'forgotten'], ['concentration', 'absence', 'removal'], ['fossil', 'natural', 'organic']] },
            ]
        },
        {
            name: 'Listening',
            questions: [
                { id: 13, type: 'summarize-spoken', audioText: 'Urban planning in the 21st century faces unique challenges. Cities must balance population growth with sustainability, ensuring adequate housing, transportation, and green spaces while minimizing environmental impact.' },
                { id: 14, type: 'listening-mcq-multiple', audioText: 'The benefits of regular exercise extend beyond physical health. Studies show that physical activity improves mental health, enhances cognitive function, and can even boost creativity.', question: 'According to the recording, what are the benefits of exercise?', options: ['Improves mental health', 'Increases wealth', 'Enhances cognitive function', 'Boosts creativity'] },
                { id: 15, type: 'listening-fib', content: 'The research team discovered that the ___ sleep patterns significantly affected participants\' ___ performance. Those who maintained consistent sleep schedules showed ___ improvement in memory tasks.', fullText: 'The research team discovered that the irregular sleep patterns significantly affected participants\' cognitive performance. Those who maintained consistent sleep schedules showed notable improvement in memory tasks.' },
                { id: 16, type: 'highlight-summary', audioText: 'Biodiversity is essential for ecosystem health. Diverse ecosystems are more resilient to environmental changes and provide numerous services that humans depend on, from food production to air purification.', options: ['Biodiversity reduces ecosystem stability', 'Diverse ecosystems are less adaptable to change', 'Biodiversity is crucial for maintaining healthy ecosystems that benefit humans', 'Ecosystems with fewer species are more productive'] },
                { id: 17, type: 'listening-mcq-single', audioText: 'The company announced a new initiative to reduce plastic waste by implementing reusable packaging for all products by 2025.', question: 'What is the company\'s goal?', options: ['Increase plastic production', 'Eliminate all packaging', 'Implement reusable packaging by 2025', 'Reduce prices'] },
                { id: 18, type: 'select-missing', audioText: 'The new policy will affect all employees starting next...', options: ['month', 'year', 'week', 'day'] },
                { id: 19, type: 'highlight-incorrect', content: 'The committee decided to postpone the meeting until next Thursday because several members were travelling overseas.', audioText: 'The committee decided to cancel the meeting until next Friday because several members were working overseas.' },
                { id: 20, type: 'write-dictation', audioText: 'Students should submit their assignments before the deadline to avoid penalties.' },
            ]
        }
    ]
};

const mock2 = {
    id: 'mock-2',
    title: 'PTE Academic Mock Test 2',
    difficulty: 'Intermediate',
    sections: [
        {
            name: 'Speaking & Writing',
            questions: [
                { id: 1, type: 'read-aloud', content: 'The history of architecture reflects the changing values and technologies of different societies. From ancient temples constructed to honor deities to modern skyscrapers designed for efficiency, buildings tell the story of human civilization.' },
                { id: 2, type: 'repeat-sentence', audioText: 'All students are required to attend the orientation session tomorrow morning.' },
                { id: 3, type: 'describe-image', imageDesc: 'Line graph showing population growth in three different cities over 50 years.' },
                { id: 4, type: 'retell-lecture', audioText: 'In this lecture, we will explore the concept of sustainable agriculture and its importance for future food security.' },
                { id: 5, type: 'answer-short', audioText: 'What do we call a period of ten years?' },
                { id: 6, type: 'summarize-written', content: 'Globalization has interconnected economies worldwide, leading to increased trade and cultural exchange. While it has lifted millions out of poverty, it has also contributed to income inequality and environmental degradation. Finding a balance that maximizes benefits while mitigating negative impacts is a key challenge for policymakers.' },
                { id: 7, type: 'essay', prompt: 'Education is the most powerful weapon which you can use to change the world. Discuss this statement with reference to your own experience.' },
            ]
        },
        {
            name: 'Reading',
            questions: [
                { id: 8, type: 'mcq-single', content: 'Marine biology is the scientific study of marine life, organisms in the sea. Given that in biology many phyla, families and genera have some species that live in the sea and others that live on land, marine biology classifies species based on the environment rather than on taxonomy.', question: 'What is the primary basis for classification in marine biology?', options: ['Taxonomy', 'Environment', 'Size', 'Color'] },
                { id: 9, type: 'mcq-multiple', content: 'Effective communication skills are essential in the modern workplace. They help build strong relationships, resolve conflicts, and ensure that projects are completed successfully.', question: 'Why are communication skills important?', options: ['Build relationships', 'Resolve conflicts', 'Ensure project success', 'Increase salary', 'Reduce work hours'] },
                { id: 10, type: 'reorder', paragraphs: ['The experiment began at 9:00 AM.', 'Data was recorded every hour.', 'An anomaly was detected at noon.', 'The team investigated the cause immediately.', 'Results were finalized by evening.'] },
                { id: 11, type: 'reading-fib', content: 'Music has a profound effect on the human ___. It can evoke strong ___ and memories. Many cultures use music for ___ and celebration.', options: [['mind', 'body', 'spirit'], ['emotions', 'thoughts', 'ideas'], ['healing', 'fighting', 'sleeping']] },
                { id: 12, type: 'rw-fib', content: 'The internet has ___ the way we access information. It provides instant ___ to a vast amount of data. However, we must be ___ of misinformation.', options: [['revolutionized', 'destroyed', 'ignored'], ['access', 'denial', 'entry'], ['aware', 'afraid', 'ignorant']] },
            ]
        },
        {
            name: 'Listening',
            questions: [
                { id: 13, type: 'summarize-spoken', audioText: 'The lecture discussed the impact of automation on the workforce. While some jobs may be lost, new opportunities will arise in technology and creative fields.' },
                { id: 14, type: 'listening-mcq-multiple', audioText: 'Volunteering offers numerous benefits, including skill development, networking, and a sense of community.', question: 'What are the benefits of volunteering?', options: ['Skill development', 'Networking', 'Community sense', 'High salary'] },
                { id: 15, type: 'listening-fib', content: 'The professor emphasized the importance of ___ thinking in academic writing. Students should analyze ___ from multiple perspectives.', fullText: 'The professor emphasized the importance of critical thinking in academic writing. Students should analyze arguments from multiple perspectives.' },
                { id: 16, type: 'highlight-summary', audioText: 'Space exploration inspires innovation and pushes the boundaries of human knowledge.', options: ['Space exploration is a waste of resources', 'It inspires innovation and expands knowledge', 'It is too dangerous', 'It has no practical benefits'] },
                { id: 17, type: 'listening-mcq-single', audioText: 'The deadline for the project has been extended by one week due to technical difficulties.', question: 'Why was the deadline extended?', options: ['Technical difficulties', 'Student request', 'Holiday', 'Teacher illness'] },
                { id: 18, type: 'select-missing', audioText: 'Please ensure your phone is switched off during the...', options: ['exam', 'break', 'lunch', 'party'] },
                { id: 19, type: 'highlight-incorrect', content: 'The sky is green and the grass is blue.', audioText: 'The sky is blue and the grass is green.' },
                { id: 20, type: 'write-dictation', audioText: 'The library is located on the north side of the campus.' },
            ]
        }
    ]
};

const mock3 = {
    id: 'mock-3',
    title: 'PTE Academic Mock Test 3',
    difficulty: 'Advanced',
    sections: [
        {
            name: 'Speaking & Writing',
            questions: [
                { id: 1, type: 'read-aloud', content: 'Neuroplasticity refers to the brain\'s ability to reorganize itself by forming new neural connections throughout life. This capability allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment.' },
                { id: 2, type: 'repeat-sentence', audioText: 'Please make sure to cite all your sources in the bibliography.' },
                { id: 3, type: 'describe-image', imageDesc: 'Complex flowchart illustrating the water cycle process.' },
                { id: 4, type: 'retell-lecture', audioText: 'This lecture examines the economic theories of Keynes and Friedman and their relevance in today\'s global market.' },
                { id: 5, type: 'answer-short', audioText: 'What instrument is used to measure temperature?' },
                { id: 6, type: 'summarize-written', content: 'The exploration of Mars has been a goal of space agencies for decades. Recent missions have revealed evidence of past water activity, suggesting the planet may have once supported microbial life. Future missions aim to return samples to Earth for detailed analysis, potentially answering the age-old question of whether we are alone in the universe.' },
                { id: 7, type: 'essay', prompt: 'Some argue that space exploration is a waste of money that could be better spent on solving problems on Earth. Discuss.' },
            ]
        },
        {
            name: 'Reading',
            questions: [
                { id: 8, type: 'mcq-single', content: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.', question: 'What scale does quantum mechanics describe?', options: ['Planetary', 'Atomic', 'Galactic', 'Macroscopic'] },
                { id: 9, type: 'mcq-multiple', content: 'Forests play a crucial role in the carbon cycle. They absorb carbon dioxide from the atmosphere and store it in their biomass. Deforestation releases this carbon back into the atmosphere, contributing to global warming.', question: 'How do forests affect the carbon cycle?', options: ['Absorb CO2', 'Store carbon', 'Release carbon when cut', 'Create ozone', 'Cool the sun'] },
                { id: 10, type: 'reorder', paragraphs: ['The artist mixed the colors on the palette.', 'She then sketched the outline on the canvas.', 'Layers of paint were applied gradually.', 'Details were added with a fine brush.', 'The masterpiece was unveiled to the public.'] },
                { id: 11, type: 'reading-fib', content: 'Economics is the social ___ that studies the production, distribution, and consumption of goods and ___.', options: [['science', 'art', 'history'], ['services', 'ideas', 'people']] },
                { id: 12, type: 'rw-fib', content: 'The ___ system protects the body from disease. It is composed of various cells and ___ that work together.', options: [['immune', 'nervous', 'digestive'], ['proteins', 'bones', 'muscles']] },
            ]
        },
        {
            name: 'Listening',
            questions: [
                { id: 13, type: 'summarize-spoken', audioText: 'The speaker argued that renewable energy is not only an environmental necessity but also an economic opportunity, creating millions of green jobs.' },
                { id: 14, type: 'listening-mcq-multiple', audioText: 'Effective leadership involves vision, empathy, and integrity. Leaders must inspire their teams and make difficult decisions.', question: 'Qualities of effective leadership?', options: ['Vision', 'Empathy', 'Integrity', 'Fear'] },
                { id: 15, type: 'listening-fib', content: 'The study found a strong ___ between diet and ___ health.', fullText: 'The study found a strong correlation between diet and cardiovascular health.' },
                { id: 16, type: 'highlight-summary', audioText: 'Artificial intelligence is transforming healthcare by improving diagnostics and personalizing treatment plans.', options: ['AI is replacing doctors', 'AI improves diagnostics and treatment', 'AI is dangerous', 'AI is expensive'] },
                { id: 17, type: 'listening-mcq-single', audioText: 'The concert was cancelled due to heavy rain.', question: 'Why was the concert cancelled?', options: ['Rain', 'Snow', 'Wind', 'Fire'] },
                { id: 18, type: 'select-missing', audioText: 'The train to London departs from platform...', options: ['nine', 'one', 'five', 'ten'] },
                { id: 19, type: 'highlight-incorrect', content: 'The sun rises in the west.', audioText: 'The sun rises in the east.' },
                { id: 20, type: 'write-dictation', audioText: 'Success is the result of preparation, hard work, and learning from failure.' },
            ]
        }
    ]
};

export const mocks = [mock1, mock2, mock3];
