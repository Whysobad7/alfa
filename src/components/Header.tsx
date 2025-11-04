'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"



export default function Header() {
    const pathName = usePathname();

  const linkClasses = (path: string) =>
    `hover:text-blue-600 transition-colors duration-200 ${
      pathName === path ? 'text-blue-600 font-semibold' : 'text-gray-700'
    }`;

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center" >
                <h1 className="text-xl font-bold text-gray-800">
                    <Link href={"/"}>Home</Link>
                </h1>
                <nav className="flex gap-6">
                    <Link href={"/"} className={linkClasses("/")}>
                    Главная
                    </Link>
                    <Link href={'/products'} className={linkClasses("/products")}>
                    Продукты
                    </Link>
                </nav>
            </div>

        </header>
    )

}