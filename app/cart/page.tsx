import { authUser } from "@/utils/authUser"
import { redirect } from "next/navigation"
import Table from "../components/template/cart/Table"
import cartModel from "@/models/Cart"
import { dbConnect } from "@/lib/dbConnect"
import "@/models/Products";

async function cart() {
await dbConnect()
  const user= await authUser()
if(!user){
  redirect("/auth/login")
}
const cart = await cartModel.find({ user: user._id }).populate("product")


  return (
   <Table cart={JSON.parse(JSON.stringify(cart))}/>
  )
}

export default cart