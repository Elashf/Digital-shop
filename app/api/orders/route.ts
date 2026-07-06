import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { authUser } from "@/utils/authUser";
import cartModel from "@/models/Cart";
import orderModel from "@/models/Order";

export async function GET() {
  try {
    await dbConnect();

    const user = await authUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await orderModel
      .find({ user: user._id })
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


/********************************************************* */


export async function POST(request: Request) {
  try {
    await dbConnect();

    const user = await authUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {fullName, address, phone } = body;

    const cartItems = await cartModel.find({user:user._id}).populate("product")
if(cartItems.length === 0){
    return NextResponse.json({message:"Cart is empty"},{status:400})
}
const items = cartItems.map((item: any) => ({
  product: item.product._id,
  name: item.product.name,
  img: item.product.img,
  price: item.product.price,
  quantity: item.quantity,
}));
const totalPrice = cartItems.reduce(
  (sum: number, item: any) =>
    sum + item.product.price * item.quantity,
  0
);

const order = await orderModel.create({
    user:user._id,
    items,
    totalPrice,
     shippingAddress: {
    fullName,
    phone,
    address,}
})
await cartModel.deleteMany({
    user:user._id
})
return NextResponse.json(
  {
    message: "Order created successfully",
    order,
  },
  {
    status: 201,
  }
);


}catch(error){
  console.log(error);

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
}}