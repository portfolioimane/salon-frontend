import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

// Define Photo type if your service has gallery photos


// Define the Service type (adapted from Property)
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: number;     // e.g. in minutes
  category: string;
  featured: boolean;
}

interface ServicesState {
  list: Service[];
  current: Service | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

// Async thunks for API calls

export const fetchServices = createAsyncThunk('services/fetchAll', async () => {
  const response = await axios.get('/admin/services');
  return response.data;
});

export const fetchServiceById = createAsyncThunk('services/fetchById', async (id: number) => {
  const response = await axios.get(`/admin/services/${id}`);
  return response.data;
});

export const addService = createAsyncThunk('services/add', async (formData: FormData, { dispatch }) => {
  await axios.post('/admin/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  dispatch(fetchServices());
});

export const updateService = createAsyncThunk(
  'services/update',
  async ({ id, formData }: { id: number; formData: FormData }, { dispatch }) => {
    await axios.post(`/admin/services/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { _method: 'PUT' },
    });
    dispatch(fetchServices());
  }
);

export const deleteService = createAsyncThunk('services/delete', async (id: number, { dispatch }) => {
  await axios.delete(`/admin/services/${id}`);
  dispatch(fetchServices());
});

export const toggleFeatured = createAsyncThunk('services/toggleFeatured', async (id: number, { dispatch }) => {
  await axios.put(`/admin/services/${id}/toggle-featured`);
  dispatch(fetchServices());
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action: PayloadAction<Service>) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch the service';
      });
  },
});

export const { clearCurrent } = servicesSlice.actions;
export default servicesSlice.reducer;
