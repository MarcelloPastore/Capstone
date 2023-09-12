const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    // Name
    name: {
        type: String,
        required: true,
    },
    // Surname
    surname: {
        type: String,
        required: true,
    },
    // age
    age: {
        type: Number,
        required: true,
    },
    // emailAddress
    email:{
        type: String,
        required: true,
    },
    // nickname
    nickname: {
        type: String,
        required: true,
    },
    // password
    password: {
        type: String,
        required: true,
    },
    // comments given
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('User', UserModelSchema, 'Users');