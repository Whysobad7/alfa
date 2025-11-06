"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchProductById,
  toggleLike,
  updateProduct,
} from "@/lib/features/productSlice";
import { Heart, Edit, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductPageProps {
  productId: string;
}

export default function ProductPageClient({ productId }: ProductPageProps) {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);

  const product = items.find((p) => p.id === productId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [product, productId, dispatch]);

  const handleToggleLike = () => {
    if (!product) return;
    dispatch(toggleLike(product.id));
  };

  const handleSave = () => {
    if (!product) return;
    dispatch(
      updateProduct({
        ...product,
        title,
        description,
        price: Number(price),
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!product) return;
    setTitle(product.title);
    setDescription(product.description);
    setPrice(String(product.price));
    setIsEditing(false);
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        {loading ? "Загружаем товар..." : "Товар не найден 😢"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto p-6">
      <Link
        href="/products"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start"
      >
        Назад к товарам
      </Link>

      <div className="flex flex-col gap-4 bg-white p-6 rounded shadow-md">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        {isEditing ? (
          <>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border p-2 rounded w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
          </>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-1"
                >
                  <Check size={16} /> Сохранить
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-1"
                >
                  <X size={16} /> Отменить
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 flex items-center gap-1"
              >
                <Edit size={16} /> Редактировать
              </button>
            )}
          </div>

          <button onClick={handleToggleLike}>
            <Heart
              className={
                product.liked ? "text-red-500 fill-red-500" : "text-gray-400"
              }
              size={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
