import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export interface SummaryReport {
  totalAppointments: number;
  totalRevenue: number;
  newCustomers: number;
  occupancyRate: number;
}

export interface ServiceReport {
  serviceName: string;
  timesBooked: number;
  revenue: number;
}

export interface ClientReport {
  clientName: string;
  visits: number;
}

interface ReportState {
  summary: SummaryReport | null;
  popularServices: ServiceReport[];
  topClients: ClientReport[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  summary: null,
  popularServices: [],
  topClients: [],
  loading: true,
  error: null,
};

// Fetch summary report
export const fetchSummaryReport = createAsyncThunk<
  SummaryReport,
  { year: number; month: number }
>('reports/fetchSummary', async ({ year, month }) => {
  const response = await axios.get('/admin/reports/summary', {
    params: { year, month: month + 1 }, // JS month is 0-based
  });
  return response.data;
});

// Fetch popular services
export const fetchPopularServices = createAsyncThunk<
  ServiceReport[],
  { year: number; month: number }
>('reports/fetchPopularServices', async ({ year, month }) => {
  const response = await axios.get('/admin/reports/popular-services', {
    params: { year, month: month + 1 },
  });
  return response.data;
});

// Fetch top clients
export const fetchTopClients = createAsyncThunk<
  ClientReport[],
  { year: number; month: number }
>('reports/fetchTopClients', async ({ year, month }) => {
  const response = await axios.get('/admin/reports/top-clients', {
    params: { year, month: month + 1 },
  });
  return response.data;
});

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    resetReports(state) {
      state.summary = null;
      state.popularServices = [];
      state.topClients = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Summary report
      .addCase(fetchSummaryReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummaryReport.fulfilled, (state, action) => {
        state.summary = action.payload;
        state.loading = false;
      })
      .addCase(fetchSummaryReport.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch summary report';
        state.loading = false;
      })

      // Popular services
      .addCase(fetchPopularServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularServices.fulfilled, (state, action) => {
        state.popularServices = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopularServices.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch popular services';
        state.loading = false;
      })

      // Top clients
      .addCase(fetchTopClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopClients.fulfilled, (state, action) => {
        state.topClients = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopClients.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch top clients';
        state.loading = false;
      });
  },
});

export const { resetReports } = reportSlice.actions;

export default reportSlice.reducer;
