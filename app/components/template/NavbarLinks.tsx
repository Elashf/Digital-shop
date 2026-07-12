"use client"
import Link from 'next/link'
import Logout from './logout/Logout'
import { usePathname } from 'next/navigation'
import ModeToggle from '../modules/ModeToggle'

type user={
    role:string
}
type Props={
    user:user | null
}

function NavbarLinks({user}:Props) {
    const pathname = usePathname()

    const isActive = (href:string)=>{
        if(href ==="/"){
            return pathname ==="/"
            ? "text-indigo-500 border-b-2 border-indigo-500 pb-1"
            : "text-white hover:text-indigo-500"
        }
        return pathname.startsWith(href)
        ? "text-indigo-500 border-b-2 border-indigo-500 pb-1"
    : "text-white hover:text-indigo-500";
    }

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-blue-800 px-5">
          <li>
            <Link className={`${isActive("/")} transition`} href="/">صفحه اصلی</Link>
          </li>

          <li>
            <Link className={`${isActive("/products")} transition`} href="/products">محصولات</Link>
          </li>

          <li>
            <Link className={`${isActive( user?.role === "admin" ? "/p-admin" : "/p-user")} transition`} href={user?.role ==="admin" ? "/p-admin" : "/p-user"}>{user?.role === "admin"?" پنل ادمین" :" پنل کاربری"} </Link>
          </li>

          <li >
            <Link className={`${isActive("/cart")} transition`} href="/cart">سبد خرید </Link>
          </li>
         
        </ul>
        
        <div>
          <ModeToggle />
          {user ?(<Logout />) : ( <div className="flex justify-center md:justify-end gap-4 text-sm font-bold">
          <Link className='text-blue-100 hover:text-blue-300 transition' href="/auth/login">ورود</Link>

          <Link className='text-blue-100 hover:text-blue-300 transition' href="/auth/register">ثبت نام</Link>
        </div>)}
       </div>

      </div>
  )
}

export default NavbarLinks