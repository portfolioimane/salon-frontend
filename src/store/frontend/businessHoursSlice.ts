import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

// Define types
export interface BusinessHours {
  id: number;
  day: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
}

interface BusinessHoursState {
  hours: BusinessHours[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: BusinessHoursState = {
  hours: [],
  status: 'idle',
  loading: false,
};

// Async Thunks
export const fetchBusinessHours = createAsyncThunk<BusinessHours[]>(
  'businessHours/fetch',
  async () => {
    const res = await axios.get('/admin/business-hours');
    return res.data;
  }
);

export const addBusinessHours = createAsyncThunk<BusinessHours, Omit<BusinessHours, 'id'>>(
  'businessHours/add',
  async (data) => {
    const res = await axios.post('/admin/business-hours', data);
    return res.data;
  }
);

export const updateBusinessHours = createAsyncThunk<
  BusinessHours,
  { id: number; data: Omit<BusinessHours, 'id'> }
>(
  'businessHours/update',
  async ({ id, data }) => {
    const postData = {
      ...data,
      id,
      _method: 'PUT',
    };

    const res = await axios.post(`/admin/business-hours/${id}`, postData);
    return res.data;
  }
);

export const deleteBusinessHours = createAsyncThunk<number, number>(
  'businessHours/delete',
  async (id) => {
    await axios.delete(`/admin/business-hours/${id}`);
    return id;
  }
);

// Slice
const businessHoursSlice = createSlice({
  name: 'businessHours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBusinessHours.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchBusinessHours.fulfilled, (state, action: PayloadAction<BusinessHours[]>) => {
        state.hours = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchBusinessHours.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      })

      // ADD
      .addCase(addBusinessHours.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBusinessHours.fulfilled, (state, action: PayloadAction<BusinessHours>) => {
        state.hours.push(action.payload);
        state.loading = false;
      })
      .addCase(addBusinessHours.rejected, (state) => {
        state.loading = false;
      })

      // UPDATE
      .addCase(updateBusinessHours.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBusinessHours.fulfilled, (state, action: PayloadAction<BusinessHours>) => {
        const index = state.hours.findIndex(h => h.id === action.payload.id);
        if (index !== -1) state.hours[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateBusinessHours.rejected, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteBusinessHours.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBusinessHours.fulfilled, (state, action: PayloadAction<number>) => {
        state.hours = state.hours.filter(h => h.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBusinessHours.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default businessHoursSlice.reducer;
