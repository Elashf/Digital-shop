"use client"
import React, { useState } from 'react'
import { TiHeartOutline } from "react-icons/ti";
import { toast } from 'react-toastify';


function ProductDetails({product}:any) {

  const [count , setCount]=useState(1)
  
  const addToCart = async()=>{
    const res = await fetch("/api/cart",{
      method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({quantity:count , productID: product._id})
    })
      const data = await res.json();

  if (res.ok) {
    toast.success(data.message);
  } else {
    toast.error(data.message);
  }
  }

  return (
    <>
    <div>
          <div className="  overflow-hidden">
            <img
              src={product.img}
              alt="product"
              className=" h-[100] object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <img
              src={product.img}
              className="w-20 h-20  cursor-pointer"
            />
            <img
              src={product.img}
              className="w-20 h-20  cursor-pointer"
            />
            <img
              src={product.img}
              className="w-20 h-20 cursor-pointer"
            />
          </div>
        </div>

    
        <div>

          <h1 className="text-3xl font-bold">
          {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-yellow-500 text-xl">
              ★★★★★
            </div>

          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold text-green-700">
              {product.price.toLocaleString()} تومان
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-8">
           {product.description}
          </p>


          <div className="mt-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>موجودی : {product.stock}</span>
          </div>

          <div className="flex items-center gap-3 mt-8">

            <div className="flex border rounded">
              <button
              onClick={()=> setCount((prev) => prev +1)}
              className="cursor-pointer px-4 py-2">+</button>

              <span className="px-5 py-2 border-x">
                {count}
              </span>

              <button onClick={()=> setCount((prev)=>Math.max(1,prev-1))} className="cursor-pointer px-4 py-2">-</button>
            </div>

            <button
            onClick={addToCart}
            className="cursor-pointer bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg">
              افزودن به سبد خرید
            </button>
          </div>

          <button className="cursor-pointer flex items-center gap-2 mt-6 text-gray-600 hover:text-red-500">
            <TiHeartOutline />
            افزودن به علاقه‌مندی
          </button>

        </div>
        </>
  )
}

export default ProductDetails