import { dbConnect } from "@/lib/dbConnect";
import productModel from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
try {
    await dbConnect()
    const {searchParams} = new URL(request.url)
    const q = searchParams.get("q") || ""

    const products = await productModel.find({
        name:{
            $regex:q,
            $options:"i"
        }
})

return NextResponse.json(products)

} catch (error) {
    console.log(error);
    return NextResponse.json({message:"server error"},{status:500})
    
}    
}