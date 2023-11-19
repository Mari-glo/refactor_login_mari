const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'products'

const ProductsSchema = new Schema({

    title: { type: String, max: 100, required: true},
    description: { type: String, max: 250, required: true},
    img: {type: String},
    price: {type: Number, required: true},
    stock: {type: Number},
    category: {type: String},
    status: {type: Boolean, default: true}
    
});

ProductsSchema.plugin(mongoosePaginate);

const productModel = model(collection, ProductsSchema);

module.exports = { productModel }