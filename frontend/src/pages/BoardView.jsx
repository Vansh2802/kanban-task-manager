import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar';
import TaskColumn from '../components/TaskColumn';
import CreateTaskModal from '../components/CreateTaskModal';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { getBoards } from '../services/boardService';

const STATUSES = ['Todo', 'Doing', 'Done'];

const BoardView = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [boardTitle, setBoardTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState('Todo');
    const [editTask, setEditTask] = useState(null);

    // Fetch board title and tasks
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [tasksRes, boardsRes] = await Promise.all([
                getTasks(boardId),
                getBoards(),
            ]);
            setTasks(tasksRes.data);
            const board = boardsRes.data.find((b) => b._id === boardId);
            setBoardTitle(board?.title || 'Board');
        } catch {
            setError('Failed to load board data.');
        } finally {
            setLoading(false);
        }
    }, [boardId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Group tasks by status
    const getColumnTasks = (status) => tasks.filter((t) => t.status === status);

    // Handle drag end
    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newStatus = destination.droppableId;

        // Optimistically update UI
        setTasks((prev) =>
            prev.map((t) => (t._id === draggableId ? { ...t, status: newStatus } : t))
        );

        try {
            await updateTask(draggableId, { status: newStatus });
        } catch {
            // Revert on failure
            setTasks((prev) =>
                prev.map((t) => (t._id === draggableId ? { ...t, status: source.droppableId } : t))
            );
            setError('Failed to update task status.');
        }
    };

    // Open modal for new task
    const handleAddTask = (status) => {
        setEditTask(null);
        setDefaultStatus(status);
        setModalOpen(true);
    };

    // Open modal for editing
    const handleEditTask = (task) => {
        setEditTask(task);
        setDefaultStatus(task.status);
        setModalOpen(true);
    };

    // Create or update task
    const handleModalSubmit = async (formData) => {
        setModalLoading(true);
        try {
            if (editTask) {
                const { data } = await updateTask(editTask._id, formData);
                setTasks((prev) => prev.map((t) => (t._id === editTask._id ? data : t)));
            } else {
                const { data } = await createTask({ ...formData, boardId });
                setTasks((prev) => [...prev, data]);
            }
            setModalOpen(false);
            setEditTask(null);
        } catch {
            setError('Failed to save task.');
        } finally {
            setModalLoading(false);
        }
    };

    // Delete task
    const handleDeleteTask = async (id) => {
        if (!confirm('Delete this task?')) return;
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch {
            setError('Failed to delete task.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        id="back-to-dashboard"
                        onClick={() => navigate('/dashboard')}
                        className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors duration-200 group"
                    >
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-100">{boardTitle}</h1>
                        <p className="text-slate-500 text-sm mt-0.5">
                            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
                        </p>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 flex items-center justify-between">
                        {error}
                        <button onClick={() => setError('')} className="text-red-400 hover:text-red-300 ml-3">✕</button>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-slate-700 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    /* Kanban columns */
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="flex gap-5 overflow-x-auto pb-6">
                            {STATUSES.map((status) => (
                                <TaskColumn
                                    key={status}
                                    status={status}
                                    tasks={getColumnTasks(status)}
                                    onAddTask={handleAddTask}
                                    onEditTask={handleEditTask}
                                    onDeleteTask={handleDeleteTask}
                                />
                            ))}
                        </div>
                    </DragDropContext>
                )}
            </main>

            {/* Task modal */}
            <CreateTaskModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditTask(null); }}
                onSubmit={handleModalSubmit}
                defaultStatus={defaultStatus}
                editTask={editTask}
                loading={modalLoading}
            />
        </div>
    );
};

export default BoardView;
