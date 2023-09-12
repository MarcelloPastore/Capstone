const mongoose = require('mongoose');

// Modello dei commenti:
const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    content: {
        type: String,
        required: true,
    }, 

    rating: {
        type: Number,
        required: false,
        default: 0,
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model('Comment', CommentSchema, 'Comments');