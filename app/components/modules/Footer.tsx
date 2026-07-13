import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t mt-16 bg-slate-50 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-bold text-lg mb-4">فروشگاه دیجیتال</h3>
            <p className="text-sm text-gray-600 leading-7">
              مرجع خرید انواع محصولات دیجیتال با بهترین قیمت و ارسال سریع
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/">صفحه اصلی</Link></li>
              <li><Link href="/products">محصولات</Link></li>
              <li><Link href="/cart">سبد خرید</Link></li>
              <li><Link href="/p-user">پنل کاربری</Link></li>
              
              
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">ارتباط با ما</h3>
            <ul className="space-y-2 text-gray-600">
              <li>📞 021-22101222</li>
              <li>📍 تهران، خیابان شریعتی</li>
              <li>✉️ support@shop.com</li>
            </ul>
          </div>

        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
          © 2026 تمامی حقوق برای فروشگاه دیجیتال محفوظ است.
        </div>
      </div>
    </footer>
  );
}

export default Footer;