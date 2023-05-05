const mongoose = require('mongoose');

const soundSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    sounds: [{
        sound: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Sound', soundSchema);