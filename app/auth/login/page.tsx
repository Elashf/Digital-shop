"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'

function Login() {
 const [email , setEmail] = useState("")
const [password , setPassword] = useState("")
const router = useRouter()
  const login =async()=>{
    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email , password})
    })
    if(res.ok){
      toast.success("ورود موفق")
      router.push("/")
      router.refresh()
      
    }else{
      toast.error("مجدد تلاش کنید")
    }
  }


  return (
    <div className=' m-auto mt-25 border border-gray-200 shadow-xl px-4 w-80 h-105 flex flex-col gap-5 py-10 '>
       <h1 className="text-center mb-5 font-bold text-2xl text-green-900">Wellcome</h1>
      <label>ایمیل :</label>
<Input
name='email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
className='border border-blue-300 shadow-xl p-2 rounded-md'
placeholder='ایمیل'
/>
<label>پسورد :</label>
<Input
type='password'
name='password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
className='w-full'
placeholder='رمز عبور'
/>
<button onClick={login} className='mt-10 cursor-pointer bg-green-500 w-30 mx-auto py-1 rounded-xl border hover:bg-green-800 hover:text-white'>ورود </button>
    </div>
  )
}

export default Login