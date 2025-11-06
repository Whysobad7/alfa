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
        <Header />
        <main className="flex-1 w-full px-4 sm:px-6 md:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <StoreProvider>{children}</StoreProvider>
          </div>
        </main>
        <footer className="mt-auto bg-white border-t text-gray-600 text-center py-2 text-sm">
          © {new Date().getFullYear()} Alfa Store. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
