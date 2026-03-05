const Task = require('../models/Task');
const Board = require('../models/Board');

// @desc   Get all tasks for a board
// @route  GET /api/tasks/:boardId
// @access Private
const getTasksByBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) return res.status(404).json({ message: 'Board not found' });

        if (board.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const tasks = await Task.find({ boardId: req.params.boardId }).sort({ createdAt: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Create a task
// @route  POST /api/tasks
// @access Private
const createTask = async (req, res) => {
    const { title, description, status, dueDate, boardId } = req.body;
    try {
        if (!title || !boardId) {
            return res.status(400).json({ message: 'Title and boardId are required' });
        }

        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ message: 'Board not found' });

        if (board.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const task = await Task.create({ title, description, status: status || 'Todo', dueDate, boardId });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Update a task
// @route  PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const board = await Board.findById(task.boardId);
        if (board.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { title, description, status, dueDate } = req.body;
        task.title = title !== undefined ? title : task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status !== undefined ? status : task.status;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Delete a task
// @route  DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const board = await Board.findById(task.boardId);
        if (board.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasksByBoard, createTask, updateTask, deleteTask };
