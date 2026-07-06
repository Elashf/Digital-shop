import { dbConnect } from "@/lib/dbConnect";
import ProductsSection from "./components/template/latest/ProductsSection";
import productModel from "@/models/Products";


export default async function Home() {
await dbConnect()
const products = await productModel.find({}).sort({_id:-1})
  return (
    <>
    <ProductsSection products={JSON.parse(JSON.stringify(products))}/>
   </>
  );
}
