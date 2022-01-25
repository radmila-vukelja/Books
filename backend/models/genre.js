const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    name: { type: String, required: true}
});

module.exports = mongoose.model("Genre", GenreSchema);