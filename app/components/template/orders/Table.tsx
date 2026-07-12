"use client";
type Props={
    orders:any
}
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function Table({ orders }:Props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder , setSelectedOrder] =useState<any>(null)
const [status, setStatus] = useState("");
const router = useRouter()


  const management = (order:any) => {
    setSelectedOrder(order)
    setStatus(order.status)
    setOpenModal(true);
  };

  const handleChange = async()=>{
   const res = await fetch(`/api/orders/${selectedOrder._id}`,{
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
   })
    const data = await res.json();

  if (res.ok) {
    toast.success(data.message);
    setOpenModal(false);
    router.refresh();
  } else {
    toast.error(data.message);
  }
  }


  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <table className="w-full text-center">
        <thead className="bg-gray-100">
          <tr className="bg-white dark:bg-gray-900 border">
            <th className="p-4">مشتری</th>

            <th className="p-4">تعداد محصولات</th>

            <th className="p-4">مبلغ</th>

            <th className="p-4">وضعیت</th>

            <th className="p-4">تاریخ</th>

            <th className="p-4">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id} className="border-b hover:bg-gray-500">
              <td className="p-4">{order.user?.name}</td>

              <td className="p-4">{order.items.length}</td>

              <td className="p-4">{order.totalPrice.toLocaleString()} تومان</td>

              <td className="p-4">{order.status}</td>

              <td className="p-4">
                {new Date(order.createdAt).toLocaleDateString("fa-IR")}
              </td>

              <td className="p-4">
                <button
                  onClick={()=>management(order)}
                  className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  مدیریت
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 ">
          <div className="w-full max-w-xl rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-md font-bold">مدیریت سفارش</h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl font-bold text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
            <div className="grid gap-3">
              <div>
                <label className="mb-1 block">نام مشتری</label>

                <input
                  type="text"
                  value={selectedOrder?.user.name || ""}
                  readOnly
                  className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block">آدرس</label>

                <input
                value={selectedOrder?.shippingAddress.address ||""}
                readOnly
                type="text" className="w-full rounded-lg border p-2 outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="mb-1 block">شماره تماس</label>

                <input
                 value={selectedOrder?.shippingAddress.phone ||""}
                readOnly
                  type="text"
                  className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block">محصولات سفارش</label>

                <div className="border rounded-lg p-3 space-y-2">
  {selectedOrder?.items.map((item: any) => (
    <div
      key={item.product}
      className="flex justify-between"
    >
      <span>{item.name}</span>

      <span>
        {item.quantity} × {item.price.toLocaleString()}
      </span>
    </div>
  ))}
</div>
              </div>

              <div>
                <label className="mb-1 block">مبلغ کل</label>

                <input
                value={selectedOrder?.totalPrice || ""}
                readOnly
                  type="text"
                  className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
                />
              </div>
<select
  className="w-full border rounded-lg p-2"
 value={status}
 onChange={(e) => setStatus(e.target.value)}
>
  <option value="Pending">در انتظار</option>
  <option value="Processing">در حال پردازش</option>
  <option value="Shipped">ارسال شده</option>
  <option value="Delivered">تحویل شده</option>
  <option value="Cancelled">لغو شده</option>
</select>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-lg bg-gray-200 px-4 py-2 cursor-pointer"
                >
                  انصراف
                </button>

                <button onClick={handleChange} className="rounded-lg bg-blue-600 px-4 py-2 text-white cursor-pointer">
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
