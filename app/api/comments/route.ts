import { dbConnect } from "@/lib/dbConnect";
import commentModel from "@/models/Comments";
import productModel from "@/models/Products";
import { authUser } from "@/utils/authUser";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
try {
    await dbConnect()
    const user = await authUser()
    const { body , score , productID } = await request.json()
    if(!body.trim() || !score){
        return NextResponse.json({message:"Empty fields"},{status:400})
    }
if (!user) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}
    const comment =await commentModel.create({ body , score , productID , user:user._id})

    await productModel.findByIdAndUpdate(productID,{
        $push:{
            comments:comment._id
        }
    })

 return NextResponse.json({message:"Comment created successfully",data:comment},{status:201})
} catch (error) {
    console.log(error);
    
     return NextResponse.json({message:error},{status:500})
}    
}