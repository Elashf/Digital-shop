import { dbConnect } from "@/lib/dbConnect";
import orderModel from "@/models/Order";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";

async function OrdersPage() {
  await dbConnect();

  const user = await authUser();

  if (!user) {
    redirect("/auth/login");
  }

  const orders = await orderModel
    .find({ user: user._id })
    .sort({ createdAt: -1 });

  return (
    <div className="max-w-7xl mx-auto p-5">

      <h1 className="text-2xl font-bold mb-2">
        سفارش‌های من
      </h1>

      <p className="text-gray-500 mb-8">
        لیست تمام سفارش‌های ثبت شده شما
      </p>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 text-center">
          <p className="text-gray-500">
            هنوز سفارشی ثبت نکرده‌اید.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order: any) => (

            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >

              <div className="flex justify-between items-center border-b pb-4 mb-4">

                <div>

                  <h2 className="font-bold">
                    سفارش #{order._id.toString().slice(-6)}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm

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
                  }`}
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

              </div>

              <div className="space-y-3">

                {order.items.map((item: any) => (

                  <div
                    key={item.product}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        تعداد: {item.quantity}
                      </p>

                    </div>

                    <div className="font-bold">
                      {(item.price * item.quantity).toLocaleString()} تومان
                    </div>

                  </div>

                ))}

              </div>

              <div className="border-t mt-5 pt-5 flex justify-between">

                <span className="font-bold">
                  مبلغ کل
                </span>

                <span className="font-bold text-green-700">
                  {order.totalPrice.toLocaleString()} تومان
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default OrdersPage;