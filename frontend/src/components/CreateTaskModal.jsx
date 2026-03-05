import React, { useState, useEffect } from 'react';

const STATUSES = ['Todo', 'Doing', 'Done'];

const CreateTaskModal = ({ isOpen, onClose, onSubmit, defaultStatus, editTask, loading }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: defaultStatus || 'Todo',
        dueDate: '',
    });

    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title || '',
                description: editTask.description || '',
                status: editTask.status || 'Todo',
                dueDate: editTask.dueDate ? new Date(editTask.dueDate).toISOString().split('T')[0] : '',
            });
        } else {
            setForm({
                title: '',
                description: '',
                status: defaultStatus || 'Todo',
                dueDate: '',
            });
        }
    }, [editTask, defaultStatus, isOpen]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        onSubmit({
            ...form,
            dueDate: form.dueDate || null,
        });
    };

    if (!isOpen) return null;

    return (
        <div
            id="task-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="glass-card w-full max-w-md animate-scale-in p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-100">
                        {editTask ? 'Edit Task' : 'Create Task'}
                    </h2>
                    <button
                        id="close-modal-btn"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Title *
                        </label>
                        <input
                            id="task-title-input"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter task title..."
                            autoFocus
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Description
                        </label>
                        <textarea
                            id="task-description-input"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="input-field resize-none"
                            placeholder="Add a description..."
                            rows={3}
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Status
                        </label>
                        <select
                            id="task-status-select"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Due Date
                        </label>
                        <input
                            id="task-duedate-input"
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            id="cancel-task-btn"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id="submit-task-btn"
                            disabled={loading || !form.title.trim()}
                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                editTask ? 'Update Task' : 'Create Task'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
