export const ieltsMocks = [
    {
        id: 'ielts-mock-1',
        title: 'IELTS Academic Mock Test 1',
        difficulty: 'Standard',
        status: 'new',
        sections: [
            {
                name: 'Listening',
                duration: 30,
                parts: [
                    {
                        name: 'Part 1',
                        instruction: 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
                        questions: [
                            { id: 1, type: 'form', text: 'Customer Name', prefix: 'Mr.', correctAnswer: 'Thompson' },
                            { id: 2, type: 'form', text: 'Flight Number', prefix: '', correctAnswer: 'AC936' },
                            { id: 3, type: 'form', text: 'Destination', prefix: '', correctAnswer: 'London' },
                            { id: 4, type: 'form', text: 'Departure Date', prefix: '', correctAnswer: '25th May' },
                            { id: 5, type: 'mcq', text: 'Type of meal requested:', options: ['Vegetarian', 'Gluten-free', 'Low-salt'], correctAnswer: 'Vegetarian' },
                            { id: 6, type: 'form', text: 'Seat Preference', prefix: '', correctAnswer: 'Aisle' },
                            { id: 7, type: 'form', text: 'Car Rental Duration (days)', prefix: '', correctAnswer: '7' },
                            { id: 8, type: 'mcq', text: 'Car Type:', options: ['Compact', 'SUV', 'Luxury'], correctAnswer: 'Compact' },
                            { id: 9, type: 'form', text: 'Total Cost Estimate (£)', prefix: '£', correctAnswer: '450' },
                            { id: 10, type: 'form', text: 'Contact Number', prefix: '+44', correctAnswer: '7700900123' }
                        ]
                    },
                    {
                        name: 'Part 2',
                        instruction: 'Choose the correct letter, A, B, or C.',
                        questions: [
                            { id: 11, type: 'mcq', text: 'According to the speaker, the company was founded in:', options: ['A. 1985', 'B. 1990', 'C. 1995'], correctAnswer: 'B' },
                            { id: 12, type: 'mcq', text: 'What is the main challenge mentioned?', options: ['A. Lack of funding', 'B. Staff retention', 'C. Global competition'], correctAnswer: 'C' },
                            { id: 13, type: 'mcq', text: 'The new office will be located in:', options: ['A. The city center', 'B. The business park', 'C. Near the airport'], correctAnswer: 'B' },
                            { id: 14, type: 'mcq', text: 'Employees are encouraged to:', options: ['A. Work from home', 'B. Use public transport', 'C. Cycle to work'], correctAnswer: 'C' }
                        ]
                    },
                    {
                        name: 'Part 3',
                        instruction: 'Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer.',
                        questions: [
                            { id: 21, type: 'form', text: 'The student seeks advice on her assignment about ____.', correctAnswer: 'Urban Design' },
                            { id: 22, type: 'form', text: 'The professor suggests focusing on the ____ aspect.', correctAnswer: 'Historical' },
                            { id: 23, type: 'form', text: 'She needs to submit the draft by ____.', correctAnswer: 'Wednesday' },
                            { id: 24, type: 'form', text: 'The main resource recommended is the university ____.', correctAnswer: 'Archives' },
                            { id: 25, type: 'form', text: 'Data analysis should be done using ____ software.', correctAnswer: 'Statistical' }
                        ]
                    },
                    {
                        name: 'Part 4',
                        instruction: 'Complete the summary below. Write ONE WORD ONLY for each answer.',
                        questions: [
                            { id: 31, type: 'form', text: 'The lecture discusses the migration patterns of ____ whales.', correctAnswer: 'Blue' },
                            { id: 32, type: 'form', text: 'They migrate to warmer waters for ____ purposes.', correctAnswer: 'Breeding' },
                            { id: 33, type: 'form', text: 'One potential threat to their journey is noise ____.', correctAnswer: 'Pollution' },
                            { id: 34, type: 'form', text: 'Conservationists are using ____ tracking to monitor them.', correctAnswer: 'Satellite' }
                        ]
                    }
                ]
            },
            {
                name: 'Reading',
                duration: 60,
                passages: [
                    {
                        title: 'The History of Tea',
                        content: `The story of tea begins in ancient China. According to legend, in 2737 BC, the Chinese emperor Shen Nung was sitting beneath a tree while his servant boiled drinking water, when some leaves from the tree blew into the water. Shen Nung, a renowned herbalist, decided to try the infusion and his servant had inadvertently created what we now call tea.
                        
Tea containers have been found in tombs dating from the Han dynasty (206 BC - 220 AD) but it was under the Tang dynasty (618-906 AD), that tea became firmly established as the national drink of China. It became such a favorite that during the late eighth century a writer called Lu Yu wrote the first book entirely about tea, the Ch'a Ching, or Tea Classic. It was shortly after this that tea was first introduced to Japan, by Japanese Buddhist monks who had traveled to China to study.
                        
Tea drinking has become an integral part of Japanese culture, as seen in the development of the Tea Ceremony. However, Europe had to wait for the drink. It was the Portuguese who first established trade links with China and started to import tea to Europe in the 16th century. It became fashionable in the Dutch capital, The Hague, and spread to Germany, France, and across the Atlantic to New Amsterdam (later New York).`,
                        questions: [
                            {
                                instruction: 'Do the following statements agree with the information given in the Reading Passage? In boxes 1-5, select TRUE, FALSE or NOT GIVEN.',
                                items: [
                                    { id: 1, type: 'tfng', text: 'Tea was discovered by an emperor in the 28th century BC.' },
                                    { id: 2, type: 'tfng', text: 'Tea was the national drink of China during the Han dynasty.' },
                                    { id: 3, type: 'tfng', text: 'Lu Yu wrote the Tea Classic in the 7th century.' },
                                    { id: 4, type: 'tfng', text: 'Japanese monks brought tea seeds from India.' },
                                    { id: 5, type: 'tfng', text: 'The Portuguese were the first Europeans to trade tea.' }
                                ]
                            },
                            {
                                instruction: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
                                items: [
                                    { id: 6, type: 'text', text: 'The first book entirely about tea was written by ____.' },
                                    { id: 7, type: 'text', text: 'Tea was introduced to Japan by ____.' },
                                    { id: 8, type: 'text', text: 'Tea became fashionable in the Dutch capital, ____.' }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'The Psychology of Color',
                        content: `Color psychology is the study of hues as a determinant of human behavior. Color influences perceptions that are not obvious, such as the taste of food. Colors have qualities that can cause certain emotions in people. Colors can also enhance the effectiveness of placebos. For example, red or orange pills are generally used as stimulants.
                        
How color influences individuals may differ depending on age, gender, and culture. For instance, heterosexual men tend to report that red outfits on female attractiveness, while heterosexual females deny any color impact on men. Black is the color of mourning in many Western cultures, whereas in some East Asian cultures white is worn.
                        
Marketing factors such as composition, layout, and color controversy can fundamentally change the consumer's purchasing habit. Color is a powerful tool in marketing since it grabs attention and stimulates the brain.`,
                        questions: [
                            {
                                instruction: 'Choose the correct heading for each paragraph from the list of headings below.',
                                items: [
                                    { id: 14, type: 'dropdown', text: 'Paragraph 1', options: ['i. Cultural differences', 'ii. Marketing strategies', 'iii. Emotional impact of color', 'iv. Gender perspectives'] },
                                    { id: 15, type: 'dropdown', text: 'Paragraph 2', options: ['i. Cultural differences', 'ii. Marketing strategies', 'iii. Emotional impact of color', 'iv. Gender perspectives'] },
                                    { id: 16, type: 'dropdown', text: 'Paragraph 3', options: ['i. Cultural differences', 'ii. Marketing strategies', 'iii. Emotional impact of color', 'iv. Gender perspectives'] }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Vertical Farming',
                        content: `As the year 2050 approaches, we are expected to have a global population of around 10 billion people. To feed them, we need more land for farming. But we have already used most of the arable land available. The solution? Vertical farming.
                        
                        Vertical farming is the practice of growing crops in vertically stacked layers. It often incorporates controlled-environment agriculture, which aims to optimize plant growth, and soilless farming techniques such as hydroponics, aquaponics, and aeroponics. Some common choices of structures to house vertical farming systems include buildings, shipping containers, tunnels, and abandoned mine shafts.`,
                        questions: [
                            {
                                instruction: 'Choose the correct letter, A, B, C or D.',
                                items: [
                                    { id: 27, type: 'dropdown', text: 'What is the main problem addressed by vertical farming?', options: ['A. Lack of water', 'B. Lack of arable land', 'C. Climate change', 'D. Pesticide use'] },
                                    { id: 28, type: 'dropdown', text: 'Which technique is NOT mentioned?', options: ['A. Hydroponics', 'B. Aquaponics', 'C. Geoponics', 'D. Aeroponics'] }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Writing',
                duration: 60,
                tasks: [
                    {
                        type: 'Task 1',
                        title: 'Report Writing',
                        prompt: `The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.
                        
Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
Write at least 150 words.`
                    },
                    {
                        type: 'Task 2',
                        title: 'Essay Writing',
                        prompt: `Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this.
                        
Discuss both these views and give your own opinion.
Write at least 250 words.`
                    }
                ]
            },
            {
                name: 'Speaking',
                duration: 15,
                parts: [
                    {
                        name: 'Part 1',
                        topic: 'Introduction & Interview',
                        questions: [
                            'What is your full name?',
                            'Can I see your ID?',
                            'Do you work or are you a student?',
                            'What do you like about your studies?',
                            'Let’s talk about your hometown. Where is your hometown?'
                        ]
                    },
                    {
                        name: 'Part 2',
                        topic: 'Long Turn',
                        prompt: `Describe a time when you helped someone. You should say:
- who you helped
- how you helped them
- where it happened
and explain how you felt about it.`
                    },
                    {
                        name: 'Part 3',
                        topic: 'Discussion',
                        questions: [
                            'Why do people help others?',
                            'Do you think people are less helpful now than in the past?',
                            'How can we encourage children to help others?',
                            'Is it the government\'s responsibility to help people in need?'
                        ]
                    }
                ]
            }
        ]
    },
    // Placeholders for other mocks (kept minimal for now to save space, but scalable)
    { id: 'ielts-mock-2', title: 'IELTS Academic Mock Test 2', difficulty: 'Standard', status: 'new', sections: [{ name: 'Listening', duration: 30, parts: [] }, { name: 'Reading', duration: 60, passages: [] }, { name: 'Writing', duration: 60, tasks: [] }, { name: 'Speaking', duration: 15, parts: [] }] },
    { id: 'ielts-mock-3', title: 'IELTS Academic Mock Test 3', difficulty: 'Hard', status: 'locked', sections: [{ name: 'Listening', duration: 30, parts: [] }, { name: 'Reading', duration: 60, passages: [] }, { name: 'Writing', duration: 60, tasks: [] }, { name: 'Speaking', duration: 15, parts: [] }] },
    { id: 'ielts-mock-4', title: 'IELTS Academic Mock Test 4', difficulty: 'Standard', status: 'locked', sections: [{ name: 'Listening', duration: 30, parts: [] }, { name: 'Reading', duration: 60, passages: [] }, { name: 'Writing', duration: 60, tasks: [] }, { name: 'Speaking', duration: 15, parts: [] }] },
    { id: 'ielts-mock-5', title: 'IELTS Academic Mock Test 5', difficulty: 'Hard', status: 'locked', sections: [{ name: 'Listening', duration: 30, parts: [] }, { name: 'Reading', duration: 60, passages: [] }, { name: 'Writing', duration: 60, tasks: [] }, { name: 'Speaking', duration: 15, parts: [] }] }
];
