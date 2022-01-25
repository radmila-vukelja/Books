const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: [{ type: mongoose.Schema.Types.String, ref: 'Genre', required: true }]
});

module.exports = mongoose.model('Book', bookSchema);