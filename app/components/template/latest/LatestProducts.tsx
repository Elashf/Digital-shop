import Link from "next/link";
import Pagination from "../../modules/Pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@base-ui/react/button";

type product={
   _id: string;
  name: string;
  price: number;
  img: string;

}
type Props = {
  products: product[];
  currentPage: number;
  totalPages: number;
};

function LatestProducts({ products ,currentPage,
totalPages}: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 mt-15">
      <div className="flex justify-between px-9 font-bold">
        <div>
          <h1 className=" px-9">لیست محصولات</h1>
          <hr className="w-40 m-2" />
        </div>
        <Link className="text-sm text-purple-500" href="/products">
          {" "}
          مشاهده همه{" "}
        </Link>
      </div>
      <div
        data-aos={"fade-up"}
        className="bg-white dark:bg-gray-900 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          {products.map((product) => (
            <Card className="bg-white dark:bg-gray-900" key={product._id}>
             
<Link href={`/products/${product._id}`} className="group ">
                 <img
                  src={product.img}
                  className="aspect-square w-[50%] m-auto rounded-lg object-contain group-hover:opacity-75 xl:aspect-7/8"
                />
              </Link>
              <CardContent className="space-y-2 pt-5">
                <h3 className="font-bold">{product.name}</h3>
              <p className="text-lg font-semibold text-green-600">
                {product.price.toLocaleString()} تومان
              </p>
             </CardContent>
             <CardFooter>
    <Link href={`/products/${product._id}`} className="w-full cursor-pointer text-center">
        مشاهده محصول
    </Link>
</CardFooter>
            </Card>
          ))}
        </div>
       <Pagination currentPage={currentPage}
  totalPages={totalPages}/>
      </div>
    </div>
  );
}

export default LatestProducts;
