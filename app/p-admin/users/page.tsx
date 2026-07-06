import UsersList from "@/app/components/template/UsersList"
import { dbConnect } from "@/lib/dbConnect"
import userModel from "@/models/Users"

async function page() {
  await dbConnect()
  const users =await userModel.find({})
  return (
   
   <UsersList users={JSON.parse(JSON.stringify(users))}/> 
  )
}

export default page