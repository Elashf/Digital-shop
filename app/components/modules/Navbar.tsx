
import { authUser } from "@/utils/authUser";
import Link from "next/link";
import Logout from "../template/logout/Logout";


async function Navbar() {

  const user = await authUser()

  
  return (
    <nav className="max-w-7xl mx-auto mt-5 shadow-xl rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-blue-800">
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>

          <li>
            <Link href="/products">محصولات</Link>
          </li>

          <li>
            <Link href={user?.role ==="admin" ? "/p-admin" : "/p-user"}>{user?.role === "admin"?" پنل ادمین" :" پنل کاربری"} </Link>
          </li>

          <li >
            <Link href="/cart">سبد خرید </Link>
          </li>
         
        </ul>
          {user ?(<Logout />) : ( <div className="flex justify-center md:justify-end gap-4 text-sm font-bold">
          <Link href="/auth/login">ورود</Link>

          <Link href="/auth/register">ثبت نام</Link>
        </div>)}
       

      </div>
    </nav>
  );
}

export default Navbar;