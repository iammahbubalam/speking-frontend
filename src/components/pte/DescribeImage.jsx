import React from 'react';
import Recorder from './Recorder';

const DescribeImage = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Instruction Header */}
            <div className="bg-blue-50 border border-blue-100 p-4 mb-6 rounded">
                <h2 className="text-lg font-bold text-slate-800 mb-1">Describe Image</h2>
                <p className="text-sm text-slate-600">Look at the graph below. In 25 seconds, please speak into the microphone and describe in detail what the graph is showing. You will have 40 seconds to give your response.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* The Image */}
                <div className="bg-white p-4 border border-slate-200 shadow-sm rounded flex items-center justify-center min-h-[300px]">
                    {/* Placeholder Bar Chart */}
                    <div className="w-full max-w-md bg-slate-50 p-4">
                        <h4 className="text-center font-bold mb-4">Smartphone Sales 2020-2024</h4>
                        <div className="flex items-end justify-between h-48 gap-4 px-4 text-xs text-slate-500">
                            <div className="w-8 bg-blue-500 h-[40%] rounded-t relative group"><span className="absolute -top-4 w-full text-center">40</span></div>
                            <div className="w-8 bg-blue-500 h-[55%] rounded-t relative group"><span className="absolute -top-4 w-full text-center">55</span></div>
                            <div className="w-8 bg-blue-500 h-[70%] rounded-t relative group"><span className="absolute -top-4 w-full text-center">70</span></div>
                            <div className="w-8 bg-blue-500 h-[85%] rounded-t relative group"><span className="absolute -top-4 w-full text-center">85</span></div>
                            <div className="w-8 bg-blue-500 h-[92%] rounded-t relative group"><span className="absolute -top-4 w-full text-center">92</span></div>
                        </div>
                        <div className="flex justify-between px-4 mt-2 text-xs font-bold text-slate-700">
                            <span>2020</span>
                            <span>2021</span>
                            <span>2022</span>
                            <span>2023</span>
                            <span>2024</span>
                        </div>
                    </div>
                </div>

                {/* The Recorder Interface */}
                <div className="flex flex-col items-center">
                    <Recorder />
                </div>
            </div>
        </div>
    );
};

export default DescribeImage;
