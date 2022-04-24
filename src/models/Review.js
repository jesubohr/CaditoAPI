const mongoose = require('mongoose');

const Review = new mongoose.Schema({
    rating: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Review', Review);
