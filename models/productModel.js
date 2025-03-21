import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    stock: {
        type:Number,
        require:true
    },
    price : {
        type:Number,
        require:true
    },
    image: {
        type:String,
        require:true
    },
    sold: {
        type:Number,
        default:0,
    },
    category : {
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})


export const Product = mongoose.model("Product", schema);