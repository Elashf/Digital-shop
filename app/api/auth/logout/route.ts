import { dbConnect } from "@/lib/dbConnect";

import { NextResponse } from "next/server";

export async function POST() {
    await dbConnect()
    const response = NextResponse.json({message:"Logout successfully"},{status:200})

    response.cookies.set("token" ,"" ,{
        httpOnly:true,
        path:"/",
        maxAge:0
    })
    return response

}