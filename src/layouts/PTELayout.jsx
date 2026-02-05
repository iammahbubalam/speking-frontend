import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import useExamStore from '../stores/useExamStore';

const PTELayout = () => {
    const nextQuestion = useExamStore((state) => state.nextQuestion);

    // Enforce fullscreen-ish look
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col bg-white border-t-8 border-blue-900 select-none">
            {/* PTE Header */}
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200">
                <div className="font-serif text-2xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>Pearson</div>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                    <span>Time Remaining: 22:15</span>
                    <button
                        onClick={() => useAuthStore.getState().logout()}
                        className="bg-blue-900 text-white px-4 py-1 uppercase text-xs tracking-widest hover:bg-blue-800 transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>

            {/* PTE Footer */}
            <footer className="h-16 bg-gray-100 border-t border-gray-300 flex items-center justify-between px-8">
                <div className="text-gray-500 text-xs">© 2024 Pearson Education Inc.</div>
                <div className="flex gap-2">
                    <button
                        onClick={nextQuestion}
                        className="px-6 py-2 bg-blue-900 text-white font-bold rounded shadow-sm hover:bg-blue-800"
                    >
                        Next
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default PTELayout;
