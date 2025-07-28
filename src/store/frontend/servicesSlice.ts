import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  duration?: number;
  category?: string;
  featured?: boolean;
}

interface ServicesState {
  list: Service[];
  popular: Service[];
  loading: boolean;
  details: Service | null;
}

const initialState: ServicesState = {
  list: [],
  popular: [],
  loading: true, // Start as loading
  details: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[]>) {
      state.list = action.payload;
      state.loading = false; // Mark as loaded
    },
    setPopularServices(state, action: PayloadAction<Service[]>) {
      state.popular = action.payload;
      state.loading = false; // Mark as loaded

    },
    setServiceDetails(state, action: PayloadAction<Service>) {
      state.details = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setServices,
  setPopularServices,
  setServiceDetails,
  setLoading,
} = servicesSlice.actions;

export default servicesSlice.reducer;
