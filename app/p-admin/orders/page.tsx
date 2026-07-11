import Table from '@/app/components/template/orders/Table'
import { dbConnect } from '@/lib/dbConnect'
import orderModel from '@/models/Order'
import { authUser } from '@/utils/authUser'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
    await dbConnect()
    const user = await authUser()

    if(!user || user.role !=="admin"){
        redirect("/auth/login")
    }
    const orders = await orderModel.find({}).populate("user").sort({createAt:-1})
  return (
     <div className="max-w-7xl mx-auto p-5">

            <h1 className="text-2xl font-bold mb-2">
                مدیریت سفارش‌ها
            </h1>

            <p className="text-gray-500 mb-8">
                لیست تمام سفارش‌های ثبت شده
            </p>
<Table orders={JSON.parse(JSON.stringify(orders))}/>
        </div>
  )
}

export default page