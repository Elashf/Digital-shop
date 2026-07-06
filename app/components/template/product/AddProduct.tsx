"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();


  const addProduct = async () => {
    const formData = new FormData()
     formData.append("name" , name)
formData.append("price" , price)
formData.append("stock" , stock)
formData.append("discount" , discount)
formData.append("description" , description)
    formData.append("img" , img)
    
    const res = await fetch("/api/products",{
      method:"POST",
      body: formData
    })
    
    if (res.ok) {
      toast.success("محصول اضافه شد");
      setName("");
      setPrice("");
      setStock("");
      setDiscount("");
      setDescription("");
      setImg(null)
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2 ">
        <label>نام محصول</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>قیمت</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>موجودی</label>
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>تخفیف (%)</label>
        <input
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          type="number"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2">
        <label>توضیحات</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col gap-3">
  <label className="font-medium">تصویر محصول</label>

  <label
    htmlFor="image"
    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition"
  >
    {img ? "تغییر تصویر" : "برای انتخاب تصویر کلیک کنید"}
  </label>

  <input
    id="image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setImg(file);
      }
    }}
  />
</div>
      
      <div className="md:col-span-2">
        <button
          onClick={addProduct}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ثبت محصول
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
