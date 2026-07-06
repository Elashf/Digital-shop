
import AddProduct from "@/app/components/template/product/AddProduct";
import ProductList from "@/app/components/template/product/ProductList";
import productModel from "@/models/Products";


async function Products() {
 
  const products = await productModel.find({}).lean()

  return (
    <>
      <div className="w-full mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">افزودن محصول</h1>

        <AddProduct />
        <ProductList products={JSON.parse(JSON.stringify(products))}/>
      </div>
    </>
  );
}

export default Products;
