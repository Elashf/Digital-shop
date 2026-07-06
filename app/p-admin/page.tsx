
import { dbConnect } from "@/lib/dbConnect";
import productModel from "@/models/Products";
import userModel from "@/models/Users";
import { authUser } from "@/utils/authUser";
import Link from "next/link";
import { redirect } from "next/navigation";

async function PAdmin() {

  await dbConnect()
  const products = await productModel.find({}) 
  const users = await userModel.find({}) 

  const user = await authUser()
  if(!user || user.role !=="admin"){
   
    redirect("/auth/login")
  }
  return (
    <div>
      

      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-2">
          داشبورد مدیریت
        </h1>

        <p className="text-gray-500 mb-8">
          به پنل مدیریت فروشگاه خوش آمدید.
        </p>

        {/* آمار */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white shadow-lg rounded-xl p-5">
            <p className="text-gray-500">محصولات</p>
            <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-5">
            <p className="text-gray-500">کاربران</p>
            <h2 className="text-3xl font-bold mt-2">{users.length}</h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-5">
            <p className="text-gray-500">سفارشات</p>
            <h2 className="text-3xl font-bold mt-2">48</h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-5">
            <p className="text-gray-500">فروش کل</p>
            <h2 className="text-3xl font-bold mt-2">12M</h2>
          </div>
        </div>

        {/* عملیات سریع */}
        <div className="bg-white shadow-lg rounded-xl p-5 mb-10">
          <h2 className="font-bold text-lg mb-4">دسترسی سریع</h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/p-admin/products"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              افزودن محصول
            </Link>
            <Link href="/p-admin/users">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer">
              مدیریت کاربران
            </button>
            </Link>
            
          </div>
        </div>

        {/* آخرین محصولات */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="font-bold text-lg mb-4">
            آخرین محصولات
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-center border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">نام محصول</th>
                  <th className="p-3 border">قیمت</th>
                  <th className="p-3 border">موجودی</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product)=>(
                   <tr key={product._id}>
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">{product.price.toLocaleString()}</td>
                  <td className="p-3 border">{product.stock}</td>
                </tr>
                 ))}
               
               
               

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PAdmin;