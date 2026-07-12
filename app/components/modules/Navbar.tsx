import { authUser } from "@/utils/authUser";
import NavbarLinks from "../template/NavbarLinks";


async function Navbar() {

  const user = await authUser()

  
  return (
    <nav className="max-w-7xl mx-auto mt-5 shadow-xl rounded-xl p-4 bg-gray-900/70 text-white sticky top-0 z-50 backdrop-blur-md border-b border-white/10 shadow-lg">
      <NavbarLinks user={JSON.parse(JSON.stringify(user))}/>
    </nav>
  );
}

export default Navbar;