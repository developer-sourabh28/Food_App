const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: true
    },
    postId: {
        type: String, // You can keep it as a String if that's how you uniquely identify items
        required: true
    }
}, { timestamps: true }); // This will add createdAt and updatedAt fields

module.exports = mongoose.model("Like", LikeSchema);
