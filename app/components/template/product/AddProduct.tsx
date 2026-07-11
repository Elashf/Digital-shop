"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

function AddProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const addProduct = async () => {
    if (!name || !price || !stock || !description || !img) {
      toast.error("لطفاً تمام فیلدها را تکمیل کنید.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("img", img);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || "محصول اضافه شد");

      setName("");
      setPrice("");
      setStock("");
      setDiscount("");
      setDescription("");
      setImg(null);

      router.refresh();
    } else {
      toast.error(data.message || "خطا در ثبت محصول");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImg(file);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label>نام محصول</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>قیمت</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>موجودی</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>تخفیف (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label>توضیحات</label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-3 md:col-span-2">
        <label className="font-medium">تصویر محصول</label>

        <label
          htmlFor="image"
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-500"
        >
          {img ? "تغییر تصویر" : "برای انتخاب تصویر کلیک کنید"}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {img && (
          <img
            src={URL.createObjectURL(img)}
            alt="Preview"
            className="h-48 w-48 rounded-lg border object-cover"
          />
        )}
      </div>

      <div className="md:col-span-2">
        <button
          onClick={addProduct}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          ثبت محصول
        </button>
      </div>
    </div>
  );
}

export default AddProduct;