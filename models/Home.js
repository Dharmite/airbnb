const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const HomeSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
    main_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

module.exports = Home = mongoose.model('homes', HomeSchema);