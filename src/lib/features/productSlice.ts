import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  liked?: boolean;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  filter: "all" | "favorites";
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  filter: "all",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return (data as any[]).map((p) => ({ ...p, id: String(p.id) })) as Product[];
});
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return { ...product, id: String(product.id) } as Product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift({ ...action.payload });
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;

        const exists = state.items.find((p) => p.id === action.payload.id);
        if (!exists) {
          state.items.unshift(action.payload);
        }
      });
  },
});

export const {
  toggleLike,
  removeProduct,
  addProduct,
  updateProduct,
  setFilter,
} = productsSlice.actions;
export default productsSlice.reducer;
