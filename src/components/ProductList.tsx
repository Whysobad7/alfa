"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchProducts, setFilter } from "../lib/features/productSlice";
import ProductCard from "./ProductCard";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 12;

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { items, loading, filter } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const filtered = items
    .filter((p) => (filter === "favorites" ? p.liked : true))
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(
      (p) =>
        (minPrice === "" || p.price >= minPrice) &&
        (maxPrice === "" || p.price <= maxPrice)
    );

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex gap-4 mb-4 items-center">
        <h1 className="text-2x1 font-bold">Фильтры</h1>
        <select
          value={filter}
          onChange={(e) =>
            dispatch(setFilter((e.target.value as "all") || "favorites"))
          }
          className="border rounded px-2 py-1"
        >
          <option value="all">Все</option>
          <option value="favorites">Избранные</option>
        </select>
        <input
          type="number"
          placeholder="Мин. цена"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded px-2 py-1 w-24"
        />
        <input
          type="number"
          placeholder="Макс. цена"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded px-2 py-1 w-24"
        />

        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 flex-1 min-w-[200px]"
        />
        <Link
          href="/create-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Создать продукт
        </Link>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filtered.length > ITEMS_PER_PAGE && (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center gap-2 mt-6"
              pageClassName="px-3 py-1 border rounded hover:bg-blue-100 cursor-pointer"
              previousClassName="px-3 py-1 border rounded hover:bg-blue-100 cursor-pointer"
              nextClassName="px-3 py-1 border rounded hover:bg-blue-100 cursor-pointer"
              activeClassName="bg-blue-600 text-white border-blue-600"
            />
          )}
        </>
      )}
    </div>
  );
}
