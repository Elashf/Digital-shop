import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
try {
      await dbConnect();
    
  const { name, email, password } = await request.json();

  if (!name.trim() || !email.trim() || !password.trim()) {
    return NextResponse.json({ message: "Empty fields" },{status:400});
  }
  
  const user = await userModel.findOne({ email });
  if (user) {
    return NextResponse.json(
      { message: "User already exist" },
      { status: 409 },
    );
  }

  const hashedPassword =await bcrypt.hash(password, 10);

  const newUser=await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  const response = NextResponse.json({ message: "User created successfully" }, { status: 201 });

  const token = jwt.sign({
    id:newUser._id ,
    email:newUser.email,
    role:newUser.role
  },process.env.JWT_SECRET! ,{
    expiresIn:"30d"
  })
 response.cookies.set("token" , token ,{
  httpOnly:true ,
  path:"/" ,
  maxAge:60*60*24*7
 })
 return response
} catch (error) {
  console.log(error);
  
    return NextResponse.json({ message: error }, { status: 500 });
}
}
