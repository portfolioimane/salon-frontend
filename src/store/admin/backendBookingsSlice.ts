import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

// --- TYPES ---
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: number;
  category: string;
  featured: boolean;
}

export type PaymentMethod = 'cash' | 'card' | 'paypal' | string;

export interface Booking {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  user_id?: number;
  service_id?: number;
  service?: Service;
  payment_method?: PaymentMethod;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  date: string;
  start_time?: string;
  end_time?: string;
  total?: number;
  paid_amount?: number;
}

// --- STATE ---
interface BackendBookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BackendBookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

// --- ASYNC THUNKS ---

// FETCH BOOKINGS
export const fetchBookings = createAsyncThunk('backendBookings/fetchBookings', async () => {
  const response = await axios.get('/admin/bookings');
  return response.data.bookings as Booking[];
});

// DELETE BOOKING
export const deleteBooking = createAsyncThunk(
  'backendBookings/deleteBooking',
  async (bookingId: number) => {
    await axios.delete(`/admin/bookings/${bookingId}`);
    return bookingId;
  }
);

// UPDATE BOOKING
export const updateBooking = createAsyncThunk(
  'backendBookings/updateBooking',
  async ({ bookingId, data }: { bookingId: number; data: Partial<Booking> }) => {
    const response = await axios.put(`/admin/bookings/${bookingId}`, data);
    return response.data.booking as Booking;
  }
);


// --- SLICE ---
const backendBookingsSlice = createSlice({
  name: 'backendBookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })

      // DELETE
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      })

      // UPDATE
      .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        const index = state.bookings.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })

    
  },
});

export default backendBookingsSlice.reducer;
