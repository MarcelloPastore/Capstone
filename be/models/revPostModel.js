const mongoose = require('mongoose');

// modello dei post da processare
const RevPostSchema = new mongoose.Schema({
    // titolo
    title: {
        type: String,
        required: true
    },
    // immagine 1 (top)
    img1: {
        type: String,
        required: false
    },
    // immagine 2 (bottom)
    img2: {
        type: String,
        required: false
    },
    // Descrizione
    description: {
        type: String,
        required: true
    },
    //like
    likes: {
        type: Number,
        required: false
    },
    //view
    views: {
        type: Number,
        required: false
    },
    //Nikname autore
    nickname: {
        type: String,
        required: true
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model('revPost', RevPostSchema, 'revPosts');

