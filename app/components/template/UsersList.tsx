"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

type Props={
    users : any
}
function UsersList({users}:Props) {
    const[openEditModal , setOpenEditModal]= useState(false)
    const[name, setName]=useState("")
const[email,setEmail]=useState("")
const[role, setRole]=useState("")
const [selectedUser,setSelectedUser] = useState(null)
const router = useRouter()

const handleEdit = (user)=>{
    setOpenEditModal(true)
setName(user.name)
setEmail(user.email)
setRole(user.role)
setSelectedUser(user)

}

const saveChanges = async()=>{
  const res = await fetch(`/api/user/${selectedUser.
    _id}`,{
    method:"PUT" ,
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({name, email , role})
  })
if(res.ok){
  toast.success("User updated")
  setOpenEditModal(false)
  router.refresh()
}
}

const handleDelete = async(id:string)=>{
  const res = await fetch(`/api/user/${id}`,{
    method:"DELETE" ,
    
  })
if(res.ok){
  toast.success("User deleted")
   router.refresh()
}
}


  return (
    
     <div className="text-xs md:text-md col-span-2 mt-10 overflow-x-auto">
  <table className="table-auto w-full border border-gray-300 text-center">
    <thead className="bg-gray-100">
      <tr>
        <th className="border border-gray-300 p-3">نام کاربر</th>
        <th className="border border-gray-300 p-3">ایمیل</th>
        <th className="border border-gray-300 p-3">نقش</th>
        <th className="border border-gray-300 p-3">عملیات</th>
      </tr>
    </thead>
{users.map((user:any)=>(
        <tbody key={user._id}>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 p-3">{user.name} </td>
        <td className="border border-gray-300 p-3">{user.email}</td>
        <td className="border border-gray-300 p-3">{user.role}</td>
        <td className="border border-gray-300 p-3">
          <div className="flex justify-center gap-2">
            <button onClick={()=>handleEdit(user)} className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer">
              ویرایش
            </button>
            <button
            onClick={()=>handleDelete(user._id)}
            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
              حذف
            </button>
          </div>
        </td>
      </tr>
      
    </tbody>
    
     ))}
    
  </table>
  {openEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">
        <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
             <div className="mb-6 flex items-center justify-between">
          <h2 className="text-md font-bold">
            ویرایش محصول
          </h2>
           <button
            onClick={()=>setOpenEditModal(false)}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>
          </div>
           <div className="grid gap-4">
          <div>
            <label className="mb-1 block">
              نام کاربر
            </label>

            <input 
           value={name}
           onChange={(e)=> setName(e.target.value)}
              type="text"
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block">
              ایمیل
            </label>

            <input 
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
              type="email"
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block">
              نقش کاربر
            </label>

            <input 
           value={role}
           onChange={(e)=> setRole(e.target.value)}
              type="text"
              className="w-full rounded-lg border p-2 outline-none focus:border-blue-500"
            />
          </div>
<div className="mt-6 flex justify-end gap-3">
          <button
            onClick={()=>setOpenEditModal(false)}
            className="rounded-lg bg-gray-200 px-4 py-2 cursor-pointer"
          >
            انصراف
          </button>

          <button
         onClick={saveChanges}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white cursor-pointer"
          >
            ذخیره تغییرات
          </button>
        </div>
         
        </div>
        </div>
        </div>
    )}
</div>
  )
}

export default UsersList