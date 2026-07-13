"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLaptop, FaMobileAlt, FaHeadphones } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  product: {
    _id: string;
    name: string;
    img: string;
    price: number;
  };
};

export default function Hero({ product }: Props) {

  const router = useRouter()

  const addToCart = async()=>{
    try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productID: product._id,
        quantity:1
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "خطا در افزودن به سبد خرید");
      return;
    }

    toast.success("به سبد خرید اضافه شد");

    router.refresh();
  } catch {
    toast.error("خطای سرور");
  }
  }

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
     <div
  className="
    absolute
    inset-0
    -z-10
    opacity-30
    bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
    bg-[size:40px_40px]
    dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)]
  "
/>
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">

        <div>

          <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
            🚀 جدیدترین محصولات دیجیتال
          </span>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight">
            آینده‌ی
            <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              تکنولوژی
            </span>

            <br />

            همینجاست.
          </h1>

          <p className="mt-8 text-lg text-gray-600 dark:text-gray-300 leading-8">
            لپ‌تاپ، موبایل، هدفون، تجهیزات گیمینگ و هر چیزی که برای
            دنیای دیجیتال نیاز داری.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">

            <Button size="lg" >

              <Link className="cursor-pointer" href="/products">

                مشاهده محصولات

                <FaArrowLeftLong />

              </Link>

            </Button>

            <Button size="lg" variant="outline" >

              <Link className="cursor-pointer" href="/products">

                پیشنهادهای ویژه

              </Link>

            </Button>

          </div>

          <div className="mt-12 flex flex-wrap gap-8">

            <div className="flex items-center gap-2">

              <FaLaptop className="text-2xl text-indigo-600" />

              لپ تاپ

            </div>

            <div className="flex items-center gap-2">

              <FaMobileAlt className="text-2xl text-indigo-600" />

              موبایل

            </div>

            <div className="flex items-center gap-2">

              <FaHeadphones className="text-2xl text-indigo-600" />

              هدفون

            </div>

          </div>

        </div>


        <div className="relative flex justify-center">

          <div className="w-96 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl p-8 border">

            <img
              src={product.img}
              className="w-full object-contain"
            />

            <h2 className="mt-6 text-2xl font-bold">
              {product.name}
            </h2>

            <p className="mt-2 text-gray-500">
              Apple Silicon
            </p>

            <div className="mt-5 flex justify-between items-center">

              <span className="text-2xl font-bold text-indigo-600">

                {product.price.toLocaleString()}

              </span>

              <Button className="cursor-pointer" onClick={addToCart}>

                خرید

              </Button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}