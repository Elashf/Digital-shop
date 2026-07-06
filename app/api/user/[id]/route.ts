import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/models/Users";
import { NextResponse } from "next/server";

type Props = {
  params: any;
};

export async function PUT(request: Request, { params }: Props) {
  try {
    await dbConnect();
    const { id } = await params;
    const { name, email, role } = await request.json();

    const updatedUser = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      role,
    });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}





export async function DELETE(request: Request,{params}:Props) {
try {
     await dbConnect();
    const { id } = await params;
   const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 })
} catch (error) {
     console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
}    
}