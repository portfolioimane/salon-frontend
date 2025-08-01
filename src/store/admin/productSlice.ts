import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  supplier: string;
  quantity: number;
  price: number;
  image?: string;
  last_updated?: string;
}

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: true,
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => (await axios.get('/admin/products')).data
);

// Add a new product (without id, last_updated)
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: FormData) => {
    const response = await axios.post('/admin/products', product, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
);


// Update product by id with partial data
export const updateProduct = createAsyncThunk<void, { id: number; data: FormData }>(
  'products/update',
  async ({ id, data }, { dispatch }) => {
    await axios.post(`/admin/products/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(fetchProducts());
  }
);

// Delete product by id
export const deleteProduct = createAsyncThunk<void, number>(
  'products/delete',
  async (id, { dispatch }) => {
    await axios.delete(`/admin/products/${id}`);
    dispatch(fetchProducts());
  }
);

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to load products';
      })
      .addCase(addProduct.rejected, (state, { error }) => {
        state.error = error.message ?? 'Add product failed';
      })
      .addCase(updateProduct.rejected, (state, { error }) => {
        state.error = error.message ?? 'Update product failed';
      })
      .addCase(deleteProduct.rejected, (state, { error }) => {
        state.error = error.message ?? 'Delete product failed';
      });
  },
});

export default slice.reducer;
