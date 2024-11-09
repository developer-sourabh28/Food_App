const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options: [{
        half: {
            type: String,
            // Make this field optional
            required: false
        },
        full: {
            type: String,
            required: false
        },
        regular: {
            type: String,
            required: false
        },
        medium: {
            type: String,
            required: false
        },
        large: {
            type: String,
            required: false
        }
    }],
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);

