import { dbConnect } from "@/lib/dbConnect";
import cartModel from "@/models/Cart";

import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    const { id } = await params;
    const { type } = await request.json();

    const cart = await cartModel.findById(id);
    if (!cart) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    if (type === "increase") {
      cart.quantity += 1;
    }
    if (type === "decrease") {
      if (cart.quantity === 1) {
        await cart.deleteOne();

        return NextResponse.json(
          { message: "Product removed from cart" },
          { status: 200 },
        );
      }
      cart.quantity -= 1;
    }

    await cart.save();
    return NextResponse.json(
      {
        message: "Cart updated successfully",
        data: cart,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    await cartModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
