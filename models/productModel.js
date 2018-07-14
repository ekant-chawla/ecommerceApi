const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productModel = new Schema({
    name: { type: String, required: true },
    id: { type: String, unique: true, required: true },
    category: { type: String, enum: ['Any', 'Electronics', 'Cosmetics', 'Grocery'], default: 'Any' },
    price: { type: Number, default: 0, min: 0 },
    description: { type: String, default: '' },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    sellerName: { type: String, required: true },
    features: { type: [String], default: [] },
    avgRating: { type: Number, default: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
})


mongoose.model('product', productModel)