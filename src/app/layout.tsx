import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./storeProvider";
import Header from "@/components/Header";



export const metadata: Metadata = {
  title: "Alfa store",
  description: "Онлайн-магазин на Next.js с использованием Redux Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Header/>
        <main className="flex-1 w-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-8">
                <StoreProvider>{children}</StoreProvider>
              </div>
        </main>
        <footer className="mt-auto bg-white border-t text-gray-600 text-center py-4 text-sm">
          © {new Date().getFullYear()} Alfa Store. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
