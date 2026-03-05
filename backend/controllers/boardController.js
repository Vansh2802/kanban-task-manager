const Board = require('../models/Board');
const Task = require('../models/Task');

// @desc   Get all boards for logged-in user
// @route  GET /api/boards
// @access Private
const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Create a board
// @route  POST /api/boards
// @access Private
const createBoard = async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return res.status(400).json({ message: 'Board title is required' });
        }
        const board = await Board.create({ title, userId: req.user._id });
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Delete a board and its tasks
// @route  DELETE /api/boards/:id
// @access Private
const deleteBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        if (board.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Delete all tasks associated with the board
        await Task.deleteMany({ boardId: req.params.id });
        await board.deleteOne();

        res.json({ message: 'Board deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBoards, createBoard, deleteBoard };
