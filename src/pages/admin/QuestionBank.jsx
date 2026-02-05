import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, X, Check } from 'lucide-react';

const AddEditQuestionModal = ({ isOpen, onClose, question, onSave }) => {
    const [formData, setFormData] = useState(
        question || { id: '', type: 'Read Aloud', text: '', diff: 'Medium', status: 'Active' }
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl shadow-2xl p-6 transform transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">
                        {question ? 'Edit Question' : 'Add New Question'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Question ID</label>
                            <input
                                type="text"
                                value={formData.id}
                                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                placeholder="e.g. PTE-RA-102"
                                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none"
                            >
                                <option>Read Aloud</option>
                                <option>Describe Image</option>
                                <option>Listening</option>
                                <option>Essay</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Content / Text</label>
                        <textarea
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            rows="4"
                            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none font-mono text-sm"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Difficulty</label>
                            <select
                                value={formData.diff}
                                onChange={(e) => setFormData({ ...formData, diff: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none"
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none"
                            >
                                <option>Active</option>
                                <option>Draft</option>
                                <option>Archived</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button onClick={onClose} className="px-4 py-2 text-slate-300 hover:text-white font-medium">Cancel</button>
                    <button onClick={() => onSave(formData)} className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-500 flex items-center gap-2">
                        <Check size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm shadow-2xl p-6 text-center">
                <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Delete Question?</h3>
                <p className="text-slate-400 text-sm mb-6">This action cannot be undone. Are you sure you want to permanently delete this item?</p>

                <div className="flex gap-3 justify-center">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded font-medium">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-500">Delete</button>
                </div>
            </div>
        </div>
    );
}

const QuestionBank = () => {
    const [questions, setQuestions] = useState([
        { id: 'PTE-2024-001', type: 'Describe Image', text: 'Bar Chart: Population Growth...', diff: 'Hard', status: 'Active' },
        { id: 'IELTS-L-102', type: 'Listening', text: 'Section 4: Monologue about Bees', diff: 'Medium', status: 'Active' },
        { id: 'PTE-RA-559', type: 'Read Aloud', text: 'The scientific method is a...', diff: 'Easy', status: 'Draft' },
    ]);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const handleEdit = (q) => {
        setCurrentQuestion(q);
        setIsEditOpen(true);
    };

    const handleDelete = (q) => {
        setCurrentQuestion(q);
        setIsDeleteOpen(true);
    }

    const saveQuestion = (updatedQ) => {
        if (currentQuestion) {
            setQuestions(questions.map(q => q.id === updatedQ.id ? updatedQ : q));
        } else {
            setQuestions([...questions, { ...updatedQ, id: updatedQ.id || `NEW-${Date.now()}` }]);
        }
        setIsEditOpen(false);
        setCurrentQuestion(null);
    };

    const confirmDelete = () => {
        setQuestions(questions.filter(q => q.id !== currentQuestion.id));
        setIsDeleteOpen(false);
        setCurrentQuestion(null);
    };

    return (
        <div>
            <AddEditQuestionModal
                isOpen={isEditOpen}
                onClose={() => { setIsEditOpen(false); setCurrentQuestion(null); }}
                question={currentQuestion}
                onSave={saveQuestion}
            />

            <DeleteConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
            />

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white">Question Bank</h2>
                    <p className="text-slate-500">Manage {questions.length} questions across PTE & IELTS.</p>
                </div>
                <button
                    onClick={() => { setCurrentQuestion(null); setIsEditOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Plus size={18} />
                    Add New Question
                </button>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-800 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                        <input type="text" placeholder="Search by ID, text, or tag..." className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500" />
                    </div>
                    <button className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-700 transition">
                        <Filter size={16} /> Filters
                    </button>
                </div>

                {/* Table */}
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">ID</th>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium">Preview</th>
                            <th className="px-6 py-4 font-medium">Difficulty</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {questions.map((q, i) => (
                            <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-slate-500">{q.id}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs border border-blue-900">{q.type}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{q.text}</td>
                                <td className="px-6 py-4">
                                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${q.diff === 'Hard' ? 'bg-red-500' : q.diff === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                    {q.diff}
                                </td>
                                <td className="px-6 py-4">
                                    {q.status === 'Active' ? <span className="text-green-500">● Published</span> : <span className="text-slate-500">○ Draft</span>}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(q)} className="p-1 hover:bg-slate-700 rounded transition-colors"><Edit size={16} className="text-slate-400 hover:text-white" /></button>
                                        <button onClick={() => handleDelete(q)} className="p-1 hover:bg-slate-700 rounded transition-colors"><Trash2 size={16} className="text-red-500 hover:text-red-400" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {questions.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No questions found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionBank;
