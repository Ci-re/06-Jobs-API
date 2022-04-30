const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name :{
        type:String,
        required: [true, 'Product name must be required']
    },
    price :{
        type:Number,
        required: [true, 'Product price must be required']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values : ['ikea', 'liddy', 'caressa','marcos'],
            message: `{VALUE} is not supported`
        }
        //enum: ['ikea', 'liddy', 'caressa','marcos'],
    },
})
module.exports = mongoose.model(
    "Product", productSchema
)