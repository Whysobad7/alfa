import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    liked?: boolean;
}

interface ProductsState {
    items: Product[];
    loading: boolean;
    filter: 'all' | 'favorites'
}


const initialState: ProductsState = {
    items: [],
    loading: false,
    filter: 'all', 
}


export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    return (await res.json()) as Product[];
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find(p => p.id === action.payload)
      if (product) product.liked = !product.liked
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload)
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift({ ...action.payload, id: Date.now() })
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
  },
})

export const { toggleLike, removeProduct, addProduct, setFilter } = productsSlice.actions
export default productsSlice.reducer