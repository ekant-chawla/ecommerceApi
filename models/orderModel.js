const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderModel = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    productShortId: { type: String, required: true },
    orderId: { type: String, unique: true, required: true },
    cartId: { type: String, required: true }, // combines multiple orders into one cart
    quantity: { type: Number, required: true, min: 1 },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
})


mongoose.model('order', orderModel);