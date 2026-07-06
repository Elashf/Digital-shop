import { dbConnect } from "@/lib/dbConnect";
import cartModel from "@/models/Cart";
import { authUser } from "@/utils/authUser";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        await dbConnect()
        const user = await authUser()
         if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
        const {quantity , productID} = await request.json()
      if(!productID || quantity <1){
         return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
      }
          const existInCart = await cartModel.findOne({user:user._id , product:productID})
          if(existInCart){
            existInCart.quantity += quantity
            await existInCart.save()
             return NextResponse.json(
        {
          message: "Cart updated",
          data: existInCart,
        },
        { status: 200 }
      );
          }

          const cart = await cartModel.create({
             user: user._id,
      product: productID,
      quantity,
          })
 return NextResponse.json(
      {
        message: "Product added to cart",
        data: cart,
      },
      { status: 201 })
    } catch (error) {
        console.log(error);
        
         return NextResponse.json(
        { message: error },
        { status: 500 }
      );
    }
}