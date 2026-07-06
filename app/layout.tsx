import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/modules/Navbar";
import Footer from "./components/modules/Footer";
import { ToastContainer } from "react-toastify";
import Aos from "@/utils/Aos";


const vazir = localFont({
  src: [
    {
      path: "./fonts/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title:"Digital Shop",
  description: "انواع لوازم دیجیتال موبایل ،تبلت ،لپتاپ ،هدفون و ..." ,

 
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" dir="rtl"

    >
      <body className={vazir.className}>
        <Navbar/>
        <Aos />
        {children}
        <ToastContainer position="top-right" autoClose={3000}/>
        <Footer/>
        </body>
        
    </html>
  );
}
