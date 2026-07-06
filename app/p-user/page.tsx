import { authUser } from '@/utils/authUser'
import { redirect } from 'next/navigation'
import React from 'react'

async function PUser() {
   const user = await authUser()
    if(!user){
     
      redirect("/auth/login")
    }
  return (
    <div>page</div>
  )
}

export default PUser