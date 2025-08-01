import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export interface Finance {
  id: number;
  title: string;
  amount: number;
  type: 'revenue' | 'expense';
  date: string;
  note?: string;
}

interface FinanceState {
  list: Finance[];
  current: Finance | null;
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  list: [],
  current: null,
  loading: true,
  error: null,
};

// ─── Async Thunks ────────────────────────────────

export const fetchFinances = createAsyncThunk('finances/fetchAll', async () => {
  const response = await axios.get('/admin/finances');
  return response.data;
});

export const fetchFinanceById = createAsyncThunk('finances/fetchById', async (id: number) => {
  const response = await axios.get(`/admin/finances/${id}`);
  return response.data;
});

export const addFinance = createAsyncThunk('finances/add', async (data: Partial<Finance>, { dispatch }) => {
  await axios.post('/admin/finances', data);
  dispatch(fetchFinances());
});

export const updateFinance = createAsyncThunk(
  'finances/update',
  async ({ id, data }: { id: number; data: Partial<Finance> }, { dispatch }) => {
    await axios.put(`/admin/finances/${id}`, data);
    dispatch(fetchFinances());
  }
);

export const deleteFinance = createAsyncThunk('finances/delete', async (id: number, { dispatch }) => {
  await axios.delete(`/admin/finances/${id}`);
  dispatch(fetchFinances());
});

// ─── Slice ────────────────────────────────

const financeSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinances.fulfilled, (state, action: PayloadAction<Finance[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchFinances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch finances';
      })
      .addCase(fetchFinanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceById.fulfilled, (state, action: PayloadAction<Finance>) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchFinanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch finance';
      });
  },
});

export const { clearCurrent } = financeSlice.actions;
export default financeSlice.reducer;
