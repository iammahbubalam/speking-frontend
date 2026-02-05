import React, { useState } from 'react';

const IELTSMock = () => {
    const [activeTab, setActiveTab] = useState('reading');

    return (
        <div className="flex h-full gap-4">
            {/* Left Pane: Reading Passage */}
            <div className="w-1/2 bg-white border border-gray-300 h-full overflow-y-auto p-8 shadow-inner select-text">
                <h2 className="text-xl font-bold mb-4 font-serif">The History of Tea</h2>
                <div className="prose prose-sm max-w-none text-justify text-gray-800 leading-relaxed font-serif">
                    <p className="mb-4">
                        The story of tea begins in China. According to legend, in 2737 BC, the Chinese emperor Shen Nung was sitting beneath a tree while his servant boiled drinking water, when some leaves from the tree blew into the water. Shen Nung, a renowned herbalist, decided to try the infusion that his servant had accidentally created. The tree was a Camellia sinensis, and the resulting drink was what we now call tea.
                    </p>
                    <p className="mb-4">
                        <span className="bg-yellow-200 cursor-pointer" title="Right click to highlight">Tea containers</span> dating from the Han Dynasty (206 BC–220 AD) have been found, but it was under the Tang Dynasty (618–906 AD) that tea became firmly established as the national drink of China. It became such a favorite that during the late eighth century a writer called Lu Yu wrote the first book entirely about tea, the Ch'a Ching, or Tea Classic.
                    </p>
                    <p className="mb-4">
                        It was shortly after this that tea was first introduced to Japan, by Japanese Buddhist monks who had travelled to China to study. Tea ritual and ceremony have become an integral part of Japanese culture. Complex tea ceremonies were created, and the drink became a central part of Japanese life.
                    </p>
                    <p className="mb-4">
                        This rapid expansion of tea consumption continued throughout the centuries. By the turn of the millennium, tea was a global commodity.
                    </p>
                </div>
            </div>

            {/* Right Pane: Questions */}
            <div className="w-1/2 bg-gray-50 border border-gray-300 h-full overflow-y-auto p-8">
                <h3 className="font-bold text-gray-700 mb-6 uppercase text-sm tracking-wide">Questions 1-5</h3>
                <p className="mb-4 text-sm font-semibold">Do the following statements agree with the information given in the Reading Passage?</p>
                <div className="bg-white border border-gray-200 p-4 mb-4 text-xs italic text-gray-500">
                    <div className="grid grid-cols-[80px_1fr] gap-2">
                        <span className="font-bold">TRUE</span> <span>if the statement agrees with the information</span>
                        <span className="font-bold">FALSE</span> <span>if the statement contradicts the information</span>
                        <span className="font-bold">NOT GIVEN</span> <span>if there is no information on this</span>
                    </div>
                </div>

                <div className="space-y-6">
                    {[
                        { id: 1, text: "The Emperor Shen Nung was the first person to intentionally boil tea leaves." },
                        { id: 2, text: "Tea drinking was common in China before the Han Dynasty." },
                        { id: 3, text: "Japanese monks brought tea seeds from China to Japan." }
                    ].map((q) => (
                        <div key={q.id} className="flex gap-4 items-start">
                            <span className="font-bold text-gray-700 w-6 pt-1">{q.id}.</span>
                            <div className="flex-1">
                                <p className="mb-2 text-sm text-gray-800">{q.text}</p>
                                <select className="w-40 border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:border-black focus:ring-0">
                                    <option>Select Answer</option>
                                    <option>TRUE</option>
                                    <option>FALSE</option>
                                    <option>NOT GIVEN</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IELTSMock;
