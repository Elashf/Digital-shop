import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


export async function POST(request:Request) {
   try {
     await dbConnect()
    const {email , password} = await request.json()
    if (!email.trim() || !password.trim()) {
        return NextResponse.json({ message: "Empty fields" },{status:400});
      }
      const user = await userModel.findOne({email})
      if(!user){
         return NextResponse.json(
    { message: "user not found" },
    { status: 404 }
      )}
      const isValidPassword = await bcrypt.compare(password ,user.password)
      if(!isValidPassword){
         return NextResponse.json({ message: "invalid password" },{status:401});
      }
       const response = NextResponse.json({ message: "login successfully" },{status:200});
       
       const token = jwt.sign({email :user.email ,id:user._id , role:user.role} , process.env.JWT_SECRET! ,{expiresIn:"7d"})

       response.cookies.set("token" , token ,{
        httpOnly:true,
        path:"/",
        maxAge:60*60*24*7
       })
return response
      }
    catch (error) {
        console.log(error);
        
     return NextResponse.json({ message: "internal server error" },{status:500});
      }
   
    }

