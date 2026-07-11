import { dbConnect } from "@/lib/dbConnect"
import orderModel from "@/models/Order"
import { authUser } from "@/utils/authUser"
import { NextResponse } from "next/server"


type Props={
    params:Promise<{
        id:string
    }>
}

export async function PUT(request:Request , {params}:Props) {
    try {
        await dbConnect()
        const {id}=await params
        const {status}= await request.json()
        const user = await authUser()
        if(!user || user.role !== "admin"){
            return NextResponse.json({message:"User unauthorized"},{status:401})
        }
        const order = await orderModel.findByIdAndUpdate(id ,{
            status
        })
 return NextResponse.json({message:"Order changed"},{status:200})
    } catch (error) {
        console.log(error);
        
         return NextResponse.json({message:"Unknown error", error},{status:500})
    }
}