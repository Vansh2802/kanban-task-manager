import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const STATUS_COLORS = {
    Todo: 'bg-slate-600/30 text-slate-300 border-slate-600/50',
    Doing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Done: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const isPastDue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
};

const TaskCard = ({ task, index, onEdit, onDelete }) => {
    const pastDue = isPastDue(task.dueDate);

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    id={`task-card-${task._id}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`group bg-slate-800/80 border rounded-xl p-3.5 mb-2.5 cursor-grab active:cursor-grabbing transition-all duration-200
            ${snapshot.isDragging
                            ? 'border-violet-500/50 shadow-lg shadow-violet-900/30 rotate-1 scale-105 bg-slate-800'
                            : 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                        }`}
                >
                    {/* Title */}
                    <p className="text-sm font-medium text-slate-100 leading-snug mb-2 pr-12 break-words">
                        {task.title}
                    </p>

                    {/* Description */}
                    {task.description && (
                        <p className="text-xs text-slate-400 mb-2 line-clamp-2 leading-relaxed">
                            {task.description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-2">
                        {/* Due date */}
                        {task.dueDate ? (
                            <span className={`text-xs flex items-center gap-1 font-medium ${pastDue ? 'text-red-400' : 'text-slate-400'}`}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                {pastDue && ' · overdue'}
                            </span>
                        ) : (
                            <span />
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                id={`edit-task-${task._id}`}
                                onClick={() => onEdit(task)}
                                className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-violet-600 flex items-center justify-center transition-colors duration-200"
                                title="Edit task"
                            >
                                <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                id={`delete-task-${task._id}`}
                                onClick={() => onDelete(task._id)}
                                className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-red-600 flex items-center justify-center transition-colors duration-200"
                                title="Delete task"
                            >
                                <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
