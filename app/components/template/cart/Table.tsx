"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function Table({cart}) {
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const router = useRouter()

    const increase =async(id :string)=>{
        const res = await fetch(`/api/cart/${id}`,{
            method:"PUT" ,
             headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "increase",
    }),
  });

  if (res.ok) {
    router.refresh()
  }
   }


   const decrease = async(id :string)=>{
        const res = await fetch(`/api/cart/${id}`,{
            method:"PUT" ,
             headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "decrease",
    }),
  });

  if (res.ok) {
    router.refresh()
  }
   }

   const handleDelete = async(id:string)=>{
    const res = await fetch(`api/cart/${id}`,{
      method:"DELETE"}
    )
    if(res.ok){
      toast.success("محصول حذف شد")
      router.refresh()
    }
   }

if (cart.length === 0) {
  return (
    <div className="text-center py-20">
      سبد خرید شما خالی است.
    </div>
  );
}
const totalPrice = cart.reduce((total , item)=>{
return total+ item.product.price * item.quantity
},0)


const handleOrder = async()=>{
  const res=await fetch("/api/orders",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({fullName , address, phone})
  })
  const data = await res.json()
  if(res.ok){
    toast.success(data.message)
    router.refresh()
  } else {
    toast.error(data.message);
  }
}




  return (
    <>
   
     <div className="text-xs px-10 md:text-md col-span-2 mt-10 overflow-x-auto">
      
  <table className="table-auto w-full border border-gray-300 text-center">
    <thead className="bg-gray-100">
      <tr>
        <th className="border border-gray-300 p-3">نام محصول</th>
        <th className="border border-gray-300 p-3">قیمت</th>
        <th className="border border-gray-300 p-3">تعداد</th>
        <th className="border border-gray-300 p-3">جمع</th>
        <th className="border border-gray-300 p-3">عملیات</th>
      </tr>
    </thead>

    <tbody>
        {cart.map((item)=>(
            <tr key={item._id} className="hover:bg-gray-50">
        <td className="border border-gray-300 p-3">{item.product.name} </td>
        <td className="border border-gray-300 p-3">{item.product.price.toLocaleString()}</td>
        
        <td className="border border-gray-300 p-3">
            <div className="flex gap-3 justify-center ">

            <span
            onClick={()=>increase(item._id)}
            className="cursor-pointer border px-1 rounded-md font-bold text-blue-800">+</span>

            {item.quantity}

            <span
            onClick={()=> decrease(item._id)}
            className="cursor-pointer border px-1 rounded-md font-bold text-blue-800">-</span>
            </div>
            </td>
        <td className="border border-gray-300 p-3">
          <div className="flex justify-center gap-2">
           
            {(item.product.price * item.quantity).toLocaleString()}
          </div>
        </td>
        <td className="border border-gray-300 p-3">
          <div className="flex justify-center gap-2">
           
            <button
            onClick={()=>handleDelete(item._id)}
            className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded">
              حذف
            </button>
          </div>
        </td>
      </tr> 
        ))}
     
    </tbody>
  </table>
</div>
<div className='px-10 my-10 flex flex-col gap-15 justify-between'>
   <p> جمع کل : {totalPrice.toLocaleString()} تومان</p>



<div className="max-w-[70%] m-auto px-10 mt-10 space-y-4">

  <input
    type="text"
    placeholder="نام و نام خانوادگی"
    value={fullName}
    onChange={(e)=>setFullName(e.target.value)}
    className="border rounded w-full p-2"
  />

  <input
    type="text"
    placeholder="شماره تماس"
    value={phone}
    onChange={(e)=>setPhone(e.target.value)}
    className="border rounded w-full p-2"
  />

  <textarea
    placeholder="آدرس کامل"
    value={address}
    onChange={(e)=>setAddress(e.target.value)}
    className="border rounded w-full p-2 h-32 resize-none"
  />
</div>


   <button
   onClick={handleOrder}
   className='cursor-pointer bg-green-700 text-white rounded'>پرداخت</button>
</div>
    </>
  )
}

export default Table