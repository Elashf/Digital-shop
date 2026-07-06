import Comments from "@/app/components/template/comments/Comments";
import ProductDetails from "@/app/components/template/product/ProductDetails";
import { dbConnect } from "@/lib/dbConnect";
import commentModel from "@/models/Comments";
import productModel from "@/models/Products";

type Props={
  params: Promise<{id:string}>
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