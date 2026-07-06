import productModel from '@/models/Products'
import React from 'react'

async function Products() {
  const products = await productModel.find({})
  return (
     <div className="bg-white mt-15">
    <h1 className='font-bold px-9'>لیست محصولات</h1>
    <hr className='w-40 m-2'/>
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>

    <div className=" grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product)=>(
        <div key={product._id}>
<a href="#" className="group">
        <img src={product.img} className="w-full aspect-square object-contain rounded-lg bg-gray-200 group-hover:opacity-75 transition" />
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{product.price.toLocaleString()}</p>
      </a>
        </div>
      ))}
      
      
     
    </div>
  </div>
</div>
  )
}

export default Products