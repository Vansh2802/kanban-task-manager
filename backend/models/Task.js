const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        status: {
            type: String,
            enum: ['Todo', 'Doing', 'Done'],
            default: 'Todo',
        },
        dueDate: {
            type: Date,
            default: null,
        },
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
