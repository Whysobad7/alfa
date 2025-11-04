'use client'

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { fetchProducts, setFilter } from "../lib/features/productSlice"
import ProductCard from "./ProductCard"


export default function ProductList() {
    const dispatch = useAppDispatch()
    const { items, loading, filter } = useAppSelector(state => state.products)

    useEffect(() => {
        if (!items.length) {
            dispatch(fetchProducts())
        }
    }, [dispatch, items.length])

    const filtered = filter === 'favorites' ? items.filter(p => p.liked) : items

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4 mb-4">
                <h1 className="text-2x1 font-bold">Продукты</h1>
                <select 
                    value={filter}
                    onChange={e => dispatch(setFilter(e.target.value as any))}
                    className="border rounded px-2 py-1"
                >
                    <option value='all'>Все</option>
                    <option value='favorites'>Избранные</option>
                </select>
            </div>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            )}
        </div>
    )
}