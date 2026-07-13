import { dbConnect } from "@/lib/dbConnect";
import productModel from "@/models/Products";
import ProductsSection from "./components/template/latest/ProductsSection";
import Hero from "./components/template/hero/Hero";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  await dbConnect();

  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const limit = 8;

  const skip = (currentPage - 1) * limit;
  const product = await productModel.findOne().sort({_id:-1})
  const products = await productModel
    .find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  const totalProducts = await productModel.countDocuments();

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <>
    <Hero product={JSON.parse(JSON.stringify(product))}/>
    <ProductsSection
      products={JSON.parse(JSON.stringify(products))}
      currentPage={currentPage}
      totalPages={totalPages}
    />
    </>
  );
}