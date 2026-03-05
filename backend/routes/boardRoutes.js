const express = require('express');
const router = express.Router();
const { getBoards, createBoard, deleteBoard } = require('../controllers/boardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBoards).post(protect, createBoard);
router.route('/:id').delete(protect, deleteBoard);

module.exports = router;
