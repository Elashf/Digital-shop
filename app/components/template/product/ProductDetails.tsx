"use client";

import React, { useState } from "react";
import { TiHeartOutline } from "react-icons/ti";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  img: string;
};

type Props = {
  product: Product;
};

function ProductDetails({ product }: Props) {
  const [count, setCount] = useState<number>(1);

  const addToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: count,
        productID: product._id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div>
        <div className="overflow-hidden">
          <img
            src={product.img}
            alt={product.name}
            className="h-[400px] w-full object-cover"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <img
            src={product.img}
            alt={product.name}
            className="h-20 w-20 cursor-pointer rounded border object-cover"
          />

          <img
            src={product.img}
            alt={product.name}
            className="h-20 w-20 cursor-pointer rounded border object-cover"
          />

          <img
            src={product.img}
            alt={product.name}
            className="h-20 w-20 cursor-pointer rounded border object-cover"
          />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="mt-4 flex items-center gap-3">
          <div className="text-xl text-yellow-500">★★★★★</div>
        </div>

        <div className="mt-6">
          <span className="text-3xl font-bold text-green-700">
            {product.price.toLocaleString()} تومان
          </span>
        </div>

        <p className="mt-6 leading-8 text-gray-600">
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <span>موجودی : {product.stock}</span>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex rounded border">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="cursor-pointer px-4 py-2"
            >
              +
            </button>

            <span className="border-x px-5 py-2">
              {count}
            </span>

            <button
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              className="cursor-pointer px-4 py-2"
            >
              -
            </button>
          </div>

          <button
            onClick={addToCart}
            className="cursor-pointer rounded-lg bg-green-700 px-8 py-3 text-white hover:bg-green-800"
          >
            افزودن به سبد خرید
          </button>
        </div>

        <button className="mt-6 flex cursor-pointer items-center gap-2 text-gray-600 hover:text-red-500">
          <TiHeartOutline size={24} />
          افزودن به علاقه‌مندی
        </button>
      </div>
    </>
  );
}

export default ProductDetails;