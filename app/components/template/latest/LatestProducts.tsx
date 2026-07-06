import Link from "next/link";


type Props = {
  products: any[];
};

function LatestProducts({ products }: Props) {
  return (
    <div className="bg-white mt-15">
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
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id}>
              <a href={`/products/${product._id}`} className="group ">
                <img
                  src={product.img}
                  className="aspect-square w-[50%] m-auto rounded-lg object-contain group-hover:opacity-75 xl:aspect-7/8"
                />
              </a>
             
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price.toLocaleString()} تومان
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestProducts;
