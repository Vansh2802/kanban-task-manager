import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const COLUMN_CONFIG = {
    Todo: {
        icon: '○',
        gradient: 'from-slate-600/30',
        headerColor: 'text-slate-300',
        dotColor: 'bg-slate-400',
        borderColor: 'border-slate-700/30',
        countBg: 'bg-slate-700',
    },
    Doing: {
        icon: '◑',
        gradient: 'from-blue-600/20',
        headerColor: 'text-blue-300',
        dotColor: 'bg-blue-400',
        borderColor: 'border-blue-700/30',
        countBg: 'bg-blue-800/80',
    },
    Done: {
        icon: '●',
        gradient: 'from-emerald-600/20',
        headerColor: 'text-emerald-300',
        dotColor: 'bg-emerald-400',
        borderColor: 'border-emerald-700/30',
        countBg: 'bg-emerald-800/80',
    },
};

const TaskColumn = ({ status, tasks, onAddTask, onEditTask, onDeleteTask }) => {
    const config = COLUMN_CONFIG[status];

    return (
        <div className={`flex flex-col bg-slate-900/60 border ${config.borderColor} rounded-2xl min-h-[500px] flex-1 min-w-[280px]`}>
            {/* Column Header */}
            <div className={`flex items-center justify-between px-4 py-3.5 border-b ${config.borderColor} bg-gradient-to-b ${config.gradient} to-transparent rounded-t-2xl`}>
                <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                    <h2 className={`font-semibold text-sm uppercase tracking-wider ${config.headerColor}`}>
                        {status}
                    </h2>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.countBg} text-slate-200`}>
                        {tasks.length}
                    </span>
                </div>
                <button
                    id={`add-task-${status}`}
                    onClick={() => onAddTask(status)}
                    className="w-7 h-7 rounded-lg bg-slate-700/80 hover:bg-violet-600 flex items-center justify-center transition-all duration-200 group"
                    title={`Add task to ${status}`}
                >
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Droppable task list */}
            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 transition-colors duration-200 rounded-b-2xl ${snapshot.isDraggingOver ? 'bg-violet-900/10' : ''
                            }`}
                    >
                        {tasks.length === 0 && !snapshot.isDraggingOver && (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <p className="text-slate-600 text-sm">No tasks here</p>
                                <p className="text-slate-700 text-xs mt-1">Click + to add one</p>
                            </div>
                        )}
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                index={index}
                                onEdit={onEditTask}
                                onDelete={onDeleteTask}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskColumn;
