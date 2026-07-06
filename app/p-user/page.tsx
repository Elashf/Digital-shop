import { dbConnect } from "@/lib/dbConnect";
import cartModel from "@/models/Cart";

import orderModel from "@/models/Order";
import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/authUser";
import Link from "next/link";
import { redirect } from "next/navigation";

async function PUser() {
  await dbConnect();

  const user = await authUser();

  if (!user) {
    redirect("/auth/login");
  }

  const orders = await orderModel.find({ user: user._id });
  const wishlist = await wishlistModel.find({ user: user._id });
  const cart = await cartModel.find({ user: user._id });

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-2">پنل کاربری</h1>

      <p className="text-gray-500 mb-8">{user.name} عزیز، خوش آمدید.</p>

      {/* آمار */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-5">
          <p className="text-gray-500">سفارش‌های من</p>
          <h2 className="text-3xl font-bold mt-2">{orders.length}</h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <p className="text-gray-500">علاقه‌مندی‌ها</p>
          <h2 className="text-3xl font-bold mt-2">{wishlist.length}</h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <p className="text-gray-500">سبد خرید</p>
          <h2 className="text-3xl font-bold mt-2">{cart.length}</h2>
        </div>
      </div>

      {/* دسترسی سریع */}
      <div className="bg-white shadow-lg rounded-xl p-5 mb-10">
        <h2 className="font-bold text-lg mb-4">دسترسی سریع</h2>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/p-user/orders"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            سفارش‌های من
          </Link>

          <Link
            href="/wishlist"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg"
          >
            علاقه‌مندی‌ها
          </Link>

          <Link
            href="/cart"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            سبد خرید
          </Link>

          <Link
            href="/"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            ادامه خرید
          </Link>
        </div>
      </div>

      {/* آخرین سفارش‌ها */}
      <div className="bg-white shadow-lg rounded-xl p-5">
        <h2 className="font-bold text-lg mb-4">آخرین سفارش‌های من</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3">شماره سفارش</th>
                  <th className="border p-3">مبلغ</th>
                  <th className="border p-3">وضعیت</th>
                  <th className="border p-3">تاریخ</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order: any) => (
                  <tr key={order._id}>
                    <td className="border p-3">
                      {order._id.toString().slice(-6)}
                    </td>

                    <td className="border p-3">
                      {order.totalPrice.toLocaleString()} تومان
                    </td>

                    <td className="border p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
      ${
        order.status === "Pending"
          ? "bg-yellow-500"
          : order.status === "Processing"
            ? "bg-blue-500"
            : order.status === "Shipped"
              ? "bg-purple-500"
              : order.status === "Delivered"
                ? "bg-green-500"
                : "bg-red-500"
      }
    `}
                      >
                        {order.status === "Pending"
                          ? "در انتظار"
                          : order.status === "Processing"
                            ? "در حال پردازش"
                            : order.status === "Shipped"
                              ? "ارسال شده"
                              : order.status === "Delivered"
                                ? "تحویل شده"
                                : "لغو شده"}
                      </span>
                    </td>

                    <td className="border p-3">
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PUser;
