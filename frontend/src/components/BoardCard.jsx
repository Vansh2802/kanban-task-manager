import React from 'react';
import { useNavigate } from 'react-router-dom';

// Color palette for boards
const BOARD_COLORS = [
    'from-violet-600 to-indigo-600',
    'from-blue-600 to-cyan-600',
    'from-emerald-600 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-600 to-rose-600',
    'from-amber-500 to-orange-600',
];

const BoardCard = ({ board, onDelete, colorIndex }) => {
    const navigate = useNavigate();
    const gradient = BOARD_COLORS[colorIndex % BOARD_COLORS.length];

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(board._id);
    };

    return (
        <div
            id={`board-card-${board._id}`}
            onClick={() => navigate(`/board/${board._id}`)}
            className="group relative card cursor-pointer overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-1 animate-fade-in"
        >
            {/* Gradient header */}
            <div className={`h-24 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-3 left-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" />
                        </svg>
                    </div>
                </div>
                {/* Delete button */}
                <button
                    id={`delete-board-${board._id}`}
                    onClick={handleDelete}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-7 h-7 bg-black/30 hover:bg-red-500/80 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                    title="Delete board"
                >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-slate-100 text-base truncate group-hover:text-violet-300 transition-colors duration-200">
                    {board.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    {new Date(board.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="mt-3 flex items-center text-xs text-slate-400 group-hover:text-violet-400 transition-colors duration-200 font-medium">
                    Open board
                    <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BoardCard;
