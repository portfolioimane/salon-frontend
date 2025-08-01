import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export interface GalleryImage {
  id: number;
  image_path: string;
}

interface GalleryState {
  list: GalleryImage[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  list: [],
  loading: true,
  error: null,
};

// Fetch all images
export const fetchGallery = createAsyncThunk<GalleryImage[]>(
  'gallery/fetchAll',
  async () => {
    const response = await axios.get('/admin/gallery');
    return response.data;
  }
);

// Upload multiple images
export const uploadImages = createAsyncThunk<void, File[]>(
  'gallery/upload',
  async (images, { dispatch }) => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images[]', image));
    await axios.post('/admin/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(fetchGallery());
  }
);

// Delete image by id
export const deleteImage = createAsyncThunk<void, number>(
  'gallery/delete',
  async (id, { dispatch }) => {
    await axios.delete(`/admin/gallery/${id}`);
    dispatch(fetchGallery());
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch gallery';
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to upload images';
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete image';
      });
  },
});

export default gallerySlice.reducer;
