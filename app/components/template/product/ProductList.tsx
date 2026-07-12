"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props ={
    products:any[]
}


 function ProductList({products}:Props) {
  const [openEditModal , setOpenEditModal] = useState(false)
  const[name,setName] = useState("")
  const[price,setPrice] = useState("")
  const[stock , setStock] = useState("")
  const[description , setDescription] = useState("")
const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const router = useRouter()
  
  const handleEdit = (product :any)=>{
    setOpenEditModal(true)
    setName(product.name)
setPrice(product.price)
setStock(product.stock)
setDescription(product.description)
setSelectedProduct(product)
  }

  const saveChanges =async()=>{
    const res = await fetch(`/api/products/${selectedProduct._id}`,{
       method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        stock,
        description,
      }),
    })
 if (res.ok) {
    setOpenEditModal(false);
router.refresh()
  }
  }


  const handleDelete = async(id:string)=>{
     const res = await fetch(`/api/products/${id}` ,{
      method:"DELETE" ,
    } )
    if(res.ok){
      router.refresh()
    }
  }



  return (
    <div className="text-xs md:text-md col-span-2 mt-10 overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 text-center">
              <thead className="-bg-white dark:bg-gray-900">
                <tr>
                  <th className="border border-gray-300 p-3">نام محصول</th>
                  <th className="border border-gray-300 p-3">قیمت</th>
                  <th className="border border-gray-300 p-3">موجودی</th>
                  <th className="border border-gray-300 p-3">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {products?.map((product)=>(
                 
                 
                  <tr key={product._id} className="hover:bg-gray-500">
                  <td className="border border-gray-300 p-3">{product.name} </td>
                  <td className="border border-gray-300 p-3">{product.price.toLocaleString()}</td>
                  <td className="border border-gray-300 p-3">{product.stock}</td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={()=>handleEdit(product)} className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded">
                        ویرایش
                      </button>
                      <button onClick={()=> handleDelete(product._id)} className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded">
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
                 
                ))}
               
              </tbody>
            </table>
             {openEditModal && ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            ویرایش محصول
          </h2>

          <button
            onClick={()=>setOpenEditModal(false)}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="mb-1 block">
              نام محصول
            </label>

            <input 
            value={name}
            onChange={(e)=> setName(e.target.value)}
              type="text"
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block">
              قیمت
            </label>

            <input 
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
              type="number"
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block">
              موجودی
            </label>

            <input 
            value={stock}
            onChange={(e)=> setStock(e.target.value)}
              type="number"
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block">
              توضیحات
            </label>

            <textarea 
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={()=>setOpenEditModal(false)}
            className="rounded-lg bg-gray-200 px-4 py-2"
          >
            انصراف
          </button>

          <button onClick={saveChanges}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>)}
          </div>
         
  )
}

export default ProductList