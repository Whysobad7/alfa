'use client'

import { addProduct, Product, toggleLike } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {  useParams } from "next/navigation";
import { useEffect } from "react";




export default function ProductPage() {
    const {id} = useParams()
    const dispatch = useAppDispatch()

    const product = useAppSelector(state =>
        state.products.items.find(p => p.id === Number(id))
    )


    useEffect(() => {
        if (!product) {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
            if (!res.ok) throw new Error('Не удалось загрузить товар')
            return res.json()
        })
        .then((data: Product) => {
          dispatch(addProduct(data)) // добавляем в store
        })
        .catch(err => console.error(err))
    }
  }, [id, product, dispatch])

    if (!product) return <p>Загрузка</p>

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="relative w-64 h-64 mx-auto mb-4">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                />
            </div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-4">${product.price}</p>

            <button
                className="mb-4"
                onClick={() => dispatch(toggleLike(product.id))}
            >
                <Heart
                    className={ product.liked ? "text-red-500 fill-red-500" : "text-gray-400" }
                    size={24}
                />
            </button>

            <div>
                <Link
                href={"/products"}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" 
                >
                Назад к товарам
                </Link>
            </div>
        </div>
    )


}