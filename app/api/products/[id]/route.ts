import { dbConnect } from "@/lib/dbConnect";
import productModel from "@/models/Products";
import { NextResponse } from "next/server";


// GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const product = await productModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}



// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const { name, price, stock, description } = await request.json();

    await productModel.findByIdAndUpdate(id, {
      name,
      price,
      stock,
      description,
    });

    return NextResponse.json(
      { message: "Product edited successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}



// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    await productModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Product removed successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}