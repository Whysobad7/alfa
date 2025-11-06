"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hooks";
import { addProduct } from "@/lib/features/productSlice";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const productSchema = z.object({
  title: z.string().min(3, "Название должно быть не менее 3 символов"),
  description: z.string().min(10, "Описание должно быть не менее 10 символов"),
  price: z.number().min(0.01, "Цена должна быть больше 0"),
  image: z.url("Введите корректный URL изображения"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    const newProduct = {
      ...data,
      id: uuidv4(),
    };
    dispatch(addProduct(newProduct));
    reset();
    alert("Продукт успешно создан!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col">
      <Link
        href={"/products"}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-6 self-start"
      >
        Назад
      </Link>
      <h1 className="text-2xl font-bold mb-4 self-center">Создать продукт</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-semibold">Название</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded px-3 pt-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Описание</label>
          <textarea
            {...register("description")}
            className="w-full border rounded px-3 pt-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Цена</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">URL изображения</label>
          <input
            type="text"
            {...register("image")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition self-center"
        >
          Создать продукт
        </button>
      </form>
    </div>
  );
}
