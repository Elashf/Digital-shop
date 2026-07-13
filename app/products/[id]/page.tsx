import Comments from "@/app/components/template/comments/Comments";
import ProductDetails from "@/app/components/template/product/ProductDetails";
import { dbConnect } from "@/lib/dbConnect";
import commentModel from "@/models/Comments";
import productModel from "@/models/Products";
import { Metadata } from "next";

type Props={
  params: Promise<{id:string}>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  await dbConnect();

  const { id } = await params;

  const product = await productModel.findById(id);

  if (!product) {
    return {
      title: "محصول یافت نشد",
    };
  }

  return {
    title: `${product.name} | Digital Shop`,
    description: product.description,
    keywords: [
      product.name,
      "خرید",
      "فروشگاه دیجیتال",
      "لپ تاپ",
      "موبایل",
    ],
  };
}


export default async function ProductPage({params}:Props) {
  await dbConnect()
 const {id} =await params
const product = await productModel.findById(id)
const comments = await commentModel.find({productID : id ,
  isAccepted:true
}).populate("user" ,"name")
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Product Images */}
        <ProductDetails product={JSON.parse(JSON.stringify(product))}/>
      </div>
      <Comments productID={product._id.toString()} comments={JSON.parse(JSON.stringify(comments))}/>
    </div>
  );
}