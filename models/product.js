const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '商品名は必須です']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['果物', '野菜', '乳製品']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;