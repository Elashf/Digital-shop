"use client"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

function Register() {
const [name , setName]= useState("")
const [email , setEmail]= useState("")
const [password , setPassword]= useState("")
const router= useRouter()

const register = async()=>{
  const res = await fetch("/api/auth/register",{
    method:"POST",
    headers:{
      "Content-Type" :"application/json"
    },
    body: JSON.stringify({name ,
email ,
password})
  })
  const data= await res.json()
 
  
  if(res.ok){
    toast.success("ثبت نام موفق")
    router.push("/")
    router.refresh()
  }
}

  return (
    <div className=' m-auto mt-25 border border-gray-200 shadow-xl px-4 w-80 h-130 flex flex-col gap-5 py-10 '>
        <h1 className="text-center mb-5 font-bold text-2xl text-green-900">Wellcome</h1>
      <label>نام :</label>
<Input
value={name}
onChange={(e)=> setName(e.target.value)}
className='w-full'
placeholder='نام'
/>
      <label>ایمیل :</label>
<Input
value={email}
onChange={(e)=> setEmail(e.target.value)}
className='w-full'
placeholder='ایمیل'
/>
<label>پسورد :</label>
<Input
type="password"
value={password}
onChange={(e)=> setPassword(e.target.value)}
className='w-full'
placeholder='رمز عبور'
/>
<button onClick={register} className='mt-10 cursor-pointer bg-green-500 w-30 mx-auto py-1 rounded-xl border hover:bg-green-800 hover:text-white'>ثبت نام</button>
    </div>
  )
}

export default Register