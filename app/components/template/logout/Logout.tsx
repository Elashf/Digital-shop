"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiLogOut } from 'react-icons/bi'


 function Logout() {
  const router = useRouter()
    const logout  =async()=>{
  const res = await fetch("api/auth/logout",{
    method:"POST"
  })
  if(res.ok){
    router.refresh()
  }
    }

  return (
    <Link onClick={logout} className="text-xl font-bold " href="/">{<BiLogOut />} </Link>
  )
}

export default Logout