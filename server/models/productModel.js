const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    },
    title: {
    type: String,
    trim: true,
    required: true,
    },
    description: {
    type: String,
    trim: true,
    },
    price: {
    type: Number,
    required: true,
    },
    content: {
    type: String,
    required: true
    },
    images: {
    type: Object,
    required: true,
    },
    category: {
    type: String,
    required: true,
    },
    checked: {
    type: Boolean,
    default: false
    },
    sold: {
    type: Number,
    default: 0
    },
    review: {
    type: Array,
    default: []
    },
    shop: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);