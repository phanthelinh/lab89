const { Schema, model} = require('mongoose'); 
const uuid = require('uuid');
const Product = require('./product');

const OrderSchema = Schema({
    _id: { type: String, default: uuid.v4 },
    amount: { type: Number }, 
    cart_items: [{
        product_id: { type: String, ref: Product.collection.collectionName }, 
        price: { type: Number },
        qty: { type: Number }
    }] 
});
module.exports = model('orders', OrderSchema);