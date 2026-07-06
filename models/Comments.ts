import mongoose from "mongoose";



const schema = new mongoose.Schema({
   
    body:{
        type:String,
        required: true,
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required :true
    },
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required :true
    },
    
    score:{
        type:Number,
        default:5 ,
        min:0,
        max:5
    },
    isAccepted: {
  type: Boolean,
  default: false,
},
},
{timestamps:true})

const commentModel = mongoose.models.Comment || mongoose.model("Comment" , schema)

export default commentModel