'use client'

import { useAppDispatch } from "@/lib/hooks";
import { Product, removeProduct, toggleLike } from "@/lib/features/productSlice";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'



export default function ProductCard( {product} : {product: Product} ) {
    const dispatch = useAppDispatch();
    const router = useRouter();


    const goToProductPage = () => {
      router.push(`/products/${product.id}`)
    }

    return (
    <div
      className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition cursor-pointer relative"
      onClick={goToProductPage}
    >
      <div className="relative h-40 mb-3">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain rounded-md"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <h2 className="font-semibold text-sm truncate">{product.title}</h2>
      <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">${product.price}</span>

        <div
          className="flex gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart
            className={`cursor-pointer ${
              product.liked ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
            onClick={() => dispatch(toggleLike(product.id))}
          />
          <Trash
            className="cursor-pointer text-gray-500"
            onClick={() => dispatch(removeProduct(product.id))}
          />
        </div>
      </div>
    </div>
  )
}