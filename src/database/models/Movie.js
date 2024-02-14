const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    fileId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

movieSchema.plugin(autoIncrement.plugin, {
    model: 'Movie',
    field: 'id',
    startAt: 1,  // Start counting at 1
    incrementBy: 1  // Increment by 1
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
