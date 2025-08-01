import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export interface Campaign {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  active: boolean;
}

interface CampaignState {
  list: Campaign[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchCampaigns = createAsyncThunk<Campaign[]>(
  'campaigns/fetchAll',
  async () => (await axios.get('/admin/campaigns')).data
);

export const addCampaign = createAsyncThunk<void, Omit<Campaign, 'id' | 'bookings_generated'>>(
  'campaigns/add',
  async (payload, { dispatch }) => {
    await axios.post('/admin/campaigns', payload);
    dispatch(fetchCampaigns());
  }
);

export const updateCampaign = createAsyncThunk<void, { id: number; data: Partial<Campaign> }>(
  'campaigns/update',
  async ({ id, data }, { dispatch }) => {
    await axios.put(`/admin/campaigns/${id}`, data);
    dispatch(fetchCampaigns());
  }
);

export const deleteCampaign = createAsyncThunk<void, number>(
  'campaigns/delete',
  async (id, { dispatch }) => {
    await axios.delete(`/admin/campaigns/${id}`);
    dispatch(fetchCampaigns());
  }
);

const slice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCampaigns.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchCampaigns.fulfilled, (state, { payload }) => { state.list = payload; state.loading = false; })
      .addCase(fetchCampaigns.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to load';
      })
      // Add
      .addCase(addCampaign.rejected, (state, { error }) => { state.error = error.message ?? 'Add failed'; })
      // Update
      .addCase(updateCampaign.rejected, (state, { error }) => { state.error = error.message ?? 'Update failed'; })
      // Delete
      .addCase(deleteCampaign.rejected, (state, { error }) => { state.error = error.message ?? 'Delete failed'; });
  },
});

export default slice.reducer;
