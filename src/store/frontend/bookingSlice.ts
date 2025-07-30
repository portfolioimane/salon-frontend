import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';  // your axios instance

// Slot interface matches your backend slot structure
interface Slot {
  start_time: string; // e.g., "09:00"
  end_time: string;   // e.g., "09:30"
}

interface BookingState {
  slots: Slot[];
  loadingSlots: boolean;
  bookingLoading: boolean;
  bookingSuccess: boolean;
  bookingError: string | null;
}

const initialState: BookingState = {
  slots: [],
  loadingSlots: false,
  bookingLoading: false,
  bookingSuccess: false,
  bookingError: null,
};

// Fetch available slots thunk
export const fetchAvailableSlots = createAsyncThunk<
  Slot[],
  { date: string; service_id: number },
  { rejectValue: string }
>(
  'booking/fetchAvailableSlots',
  async ({ date, service_id }, { rejectWithValue }) => {
    try {
      const res = await axios.get('/available-slots', {
        params: { date, service_id },
      });
      return res.data as Slot[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch available slots');
    }
  }
);

// Submit booking thunk
export const submitBooking = createAsyncThunk<
  void,
  {
    service_id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    start_time: string;
    end_time: string;
    payment_method: string;
    total: number;
  },
  { rejectValue: string }
>(
  'booking/submitBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post('/book', payload);
      if (res.status !== 201) {
        throw new Error('Booking failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Booking failed');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingState(state) {
      state.bookingSuccess = false;
      state.bookingError = null;
      state.bookingLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loadingSlots = true;
        state.slots = [];
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action: PayloadAction<Slot[]>) => {
        state.loadingSlots = false;
        state.slots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loadingSlots = false;
        state.slots = [];
        state.bookingError = action.payload || 'Failed to load slots';
      })
      .addCase(submitBooking.pending, (state) => {
        state.bookingLoading = true;
        state.bookingSuccess = false;
        state.bookingError = null;
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = false;
        state.bookingError = action.payload || 'Booking failed';
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
