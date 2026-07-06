import { dbConnect } from "@/lib/dbConnect";
import productModel from "@/models/Products";
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import path from "path";



export async function GET() {
  try {
    await dbConnect();

    const products = await productModel.find({}).sort({ _id: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const name = formData.get('name')
    const price = formData.get('price')
    const description = formData.get('description')
const img = formData.get('img') as File | null
if (!img) {
  return NextResponse.json(
    { message: "Image is required" },
    { status: 400 }
  );
}
const stock = formData.get('stock')
const discount = formData.get('discount')

const buffer = Buffer.from(await img.arrayBuffer())
const fileName =Date.now() + img.name
const pathFile =path.join( process.cwd() , "public/uploads/" + fileName)
await writeFile(pathFile , buffer)

  const product = await productModel.create({ name, price, description,
     img : `/uploads/${fileName}`,
  stock,
  discount})

  return NextResponse.json({message:"Product created successfully" ,product},{status:201})


  } catch (error) {
    console.log(error);
    
    return NextResponse.json({message:error},{status:500})
  }
}


export async function PUT(request: Request) {
 try {
   const formData = await request.formData()
  const img = formData.get("img")
if(!img){
  return Response.json({message:"Product has not image"},{status:400})
}

const buffer = Buffer.from(await img.arrayBuffer())
const fileName = Date.now() + img.name
const pathFile = path.join( process.cwd() , "public/uploads/" + fileName)

writeFile(pathFile ,buffer)
 return Response.json({message:"File uploaded successfully"},{status:201})

 } catch (error) {
  return Response.json({message:error},{status:500})
 }
}


