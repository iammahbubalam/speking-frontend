import React from 'react';
import { Outlet } from 'react-router-dom';

const IELTSLayout = () => {
    return (
        <div className="h-screen w-screen flex flex-col bg-black text-white font-sans">
            {/* Top Bar */}
            <div className="bg-black border-b border-gray-800 p-2 flex justify-between items-center text-yellow-400 font-bold px-4">
                <span>IELTS Academic</span>
                <span className="text-red-500 border border-red-500 px-2 py-1 rounded">28:45</span>
            </div>

            <main className="flex-1 bg-white text-black p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-yellow-100 text-black text-xs font-bold">Candidate: Alex Doe</div>
                <Outlet />
            </main>

            {/* Bottom Palette */}
            <div className="h-20 bg-gray-900 border-t border-gray-700 flex items-center px-4 gap-2 overflow-x-auto">
                {[...Array(40)].map((_, i) => (
                    <div key={i} className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-gray-600 text-xs hover:bg-yellow-500 hover:text-black cursor-pointer transition-colors rounded-sm">
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IELTSLayout;
