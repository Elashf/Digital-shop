import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required: true,
        min:0
        
    },
    discount:{
        type:Number,
        required: false,
        
        
    },
    stock:{
        type:Number,
        required: true,
       
        
    },
    description:{
        type:String,
        required: true
    },
    img:{
        type:String,
        
    },
    score:{
        type:Number,
        default:5,
        min:0,
        max:5
        
    },
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
       ref:"Comment"
       } 
    ]
    ,
},
{timestamps:true})

const productModel = mongoose.models.Product || mongoose.model("Product" , schema)

export default productModel