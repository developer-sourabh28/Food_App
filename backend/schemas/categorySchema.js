const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ItemCategory', categorySchema);
