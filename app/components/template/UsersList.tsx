"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Props = {
  users: User[];
};

function UsersList({ users }: Props) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const router = useRouter();

  const handleEdit = (user: User) => {
    setOpenEditModal(true);

    setName(user.name);
    setEmail(user.email);
    setRole(user.role);

    setSelectedUser(user);
  };

  const saveChanges = async () => {
    if (!selectedUser) return;

    const res = await fetch(`/api/user/${selectedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        role,
      }),
    });

    if (res.ok) {
      toast.success("User updated");

      setOpenEditModal(false);

      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("User deleted");

      router.refresh();
    }
  };

  return (
    <div className="text-xs md:text-md col-span-2 mt-10 overflow-x-auto">
      <table className="table-auto w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr className="bg-white dark:bg-gray-900">
            <th className="border border-gray-300 p-3">نام کاربر</th>

            <th className="border border-gray-300 p-3">ایمیل</th>

            <th className="border border-gray-300 p-3">نقش</th>

            <th className="border border-gray-300 p-3">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-500">
              <td className="border border-gray-300 p-3">{user.name}</td>

              <td className="border border-gray-300 p-3">{user.email}</td>

              <td className="border border-gray-300 p-3">{user.role}</td>

              <td className="border border-gray-300 p-3">
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => handleEdit(user)}
                    className="
                      bg-yellow-500
                      text-white
                      px-3
                      py-1
                      rounded
                      cursor-pointer
                      "
                  >
                    ویرایش
                  </Button>

                  <Button
                    onClick={() => handleDelete(user._id)}
                    className="
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded
                      cursor-pointer
                      "
                  >
                    حذف
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="sm:max-w-xl ">
          <DialogHeader>
            <DialogTitle className="font-bold">ویرایش کاربر</DialogTitle>
          </DialogHeader>
          <label className="mt-3 block">نام کاربر</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="
                    w-full
                    
                    "
          />
          <label className="mb-1 block">ایمیل</label>

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="
                    w-full
                    rounded-lg
                    border
                    p-2
                    outline-none
                    focus:border-blue-500
                    "
          />
          <label>نقش کاربر</label>
          <Select value={role} onValueChange={(value) => setRole(value ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="نقش کاربر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        
          <Button
            onClick={saveChanges}
            className="
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-2
                  text-white
                  cursor-pointer
                  "
          >
            ذخیره تغییرات
          </Button>
        </DialogContent>
      </Dialog>

    
    </div>
  );
}

export default UsersList;
