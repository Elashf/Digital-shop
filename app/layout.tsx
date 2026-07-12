import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/modules/Navbar";
import Footer from "./components/modules/Footer";
import { ToastContainer } from "react-toastify";
import Aos from "@/utils/Aos";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./components/modules/ThemeProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      lang="fa" dir="rtl" suppressHydrationWarning className={cn("font-sans", geist.variable)}

    >
      <body className={`${vazir.className} bg-white dark:bg-gray-900`}>
        <Providers>
        <Navbar/>
        <Aos />
        {children}
        <ToastContainer position="top-right" autoClose={3000}/>
        <Footer/>
        </Providers>
        </body>
        
    </html>
  );
}
