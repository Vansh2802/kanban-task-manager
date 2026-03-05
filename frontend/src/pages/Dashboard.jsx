import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BoardCard from '../components/BoardCard';
import { getBoards, createBoard, deleteBoard } from '../services/boardService';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [error, setError] = useState('');

    const fetchBoards = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await getBoards();
            setBoards(data);
        } catch {
            setError('Failed to load boards.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoards();
    }, [fetchBoards]);

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        if (!newBoardTitle.trim()) return;
        setCreating(true);
        try {
            const { data } = await createBoard({ title: newBoardTitle.trim() });
            setBoards((prev) => [data, ...prev]);
            setNewBoardTitle('');
            setShowInput(false);
        } catch {
            setError('Failed to create board.');
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteBoard = async (id) => {
        if (!confirm('Delete this board and all its tasks?')) return;
        try {
            await deleteBoard(id);
            setBoards((prev) => prev.filter((b) => b._id !== id));
        } catch {
            setError('Failed to delete board.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-100">
                            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
                        </h1>
                        <p className="text-slate-400 mt-1">
                            {boards.length === 0 ? 'Create your first board to get started.' : `You have ${boards.length} board${boards.length === 1 ? '' : 's'}.`}
                        </p>
                    </div>

                    {/* Create board trigger */}
                    {!showInput && (
                        <button
                            id="new-board-btn"
                            onClick={() => setShowInput(true)}
                            className="btn-primary flex items-center gap-2 px-5 py-2.5 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Board
                        </button>
                    )}
                </div>

                {/* Inline create board form */}
                {showInput && (
                    <form
                        onSubmit={handleCreateBoard}
                        className="mb-8 flex items-center gap-3 animate-slide-up"
                    >
                        <input
                            id="board-title-input"
                            type="text"
                            value={newBoardTitle}
                            onChange={(e) => setNewBoardTitle(e.target.value)}
                            className="input-field max-w-xs"
                            placeholder="Enter board title..."
                            autoFocus
                            required
                        />
                        <button
                            id="create-board-submit"
                            type="submit"
                            disabled={creating || !newBoardTitle.trim()}
                            className="btn-primary disabled:opacity-50 flex items-center gap-2"
                        >
                            {creating ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Create'
                            )}
                        </button>
                        <button
                            type="button"
                            id="cancel-board-btn"
                            onClick={() => { setShowInput(false); setNewBoardTitle(''); }}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-slate-700 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                ) : boards.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-5 shadow-xl">
                            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">No boards yet</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Boards help you organize your tasks into projects. Create your first one!
                        </p>
                        <button
                            id="empty-new-board-btn"
                            onClick={() => setShowInput(true)}
                            className="btn-primary mt-6 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Your First Board
                        </button>
                    </div>
                ) : (
                    /* Boards grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {boards.map((board, idx) => (
                            <BoardCard
                                key={board._id}
                                board={board}
                                onDelete={handleDeleteBoard}
                                colorIndex={idx}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
