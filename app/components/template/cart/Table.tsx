"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type CartItem = {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    img?: string;
  };
};

type Props = {
  cart: CartItem[];
};

function Table({ cart }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  const increase = async (id: string) => {
    const res = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "increase",
      }),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const decrease = async (id: string) => {
    const res = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "decrease",
      }),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("محصول حذف شد");
      router.refresh();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        سبد خرید شما خالی است.
      </div>
    );
  }

  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        address,
        phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      router.refresh();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="overflow-x-auto mt-10 px-4 md:px-10">
        <table className="table-auto w-full border border-gray-300 text-center text-xs md:text-base">
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
            {cart.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  {item.product.name}
                </td>

                <td className="border border-gray-300 p-3">
                  {item.product.price.toLocaleString()}
                </td>

                <td className="border border-gray-300 p-3">
                  <div className="flex justify-center gap-3">
                    <span
                      onClick={() => increase(item._id)}
                      className="cursor-pointer rounded border px-2 font-bold text-blue-800"
                    >
                      +
                    </span>

                    {item.quantity}

                    <span
                      onClick={() => decrease(item._id)}
                      className="cursor-pointer rounded border px-2 font-bold text-blue-800"
                    >
                      -
                    </span>
                  </div>
                </td>

                <td className="border border-gray-300 p-3">
                  {(item.product.price * item.quantity).toLocaleString()}
                </td>

                <td className="border border-gray-300 p-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-10 flex flex-col gap-10 px-4 md:px-10">
        <p className="text-lg font-bold">
          جمع کل: {totalPrice.toLocaleString()} تومان
        </p>

        <div className="mx-auto w-full max-w-2xl space-y-4">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded border p-2"
          />

          <input
            type="text"
            placeholder="شماره تماس"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border p-2"
          />

          <textarea
            placeholder="آدرس کامل"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-32 w-full resize-none rounded border p-2"
          />

          <button
            onClick={handleOrder}
            className="w-full cursor-pointer rounded bg-green-700 py-2 text-white hover:bg-green-800"
          >
            پرداخت
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;