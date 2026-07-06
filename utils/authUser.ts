import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/models/Users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function authUser() {
    await dbConnect()

    const token = (await cookies()).get("token")?.value
    if(!token){
        return null
    }
    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET!) as{email:string}
        const user = await userModel.findOne({email :payload.email})
        return user
    } catch (error) {
        return null
    }
}