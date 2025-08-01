import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/utils/axios';

export interface Employee {
  id: number;
  name: string;
  email?: string;
  role?: string;
  phone?: string;
  avatar?: string;
}

interface EmployeeState {
  list: Employee[];
  current: Employee | null;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string[]> | null;
}

const initialState: EmployeeState = {
  list: [],
  current: null,
  loading: true,
  error: null,
  validationErrors: null,
};

// Async thunks

export const fetchEmployees = createAsyncThunk<Employee[]>(
  'employees/fetchAll',
  async () => {
    const response = await axios.get('/admin/employees');
    return response.data;
  }
);

export const fetchEmployeeById = createAsyncThunk<Employee, number>(
  'employees/fetchById',
  async (id) => {
    const response = await axios.get(`/admin/employees/${id}`);
    return response.data;
  }
);

export const addEmployee = createAsyncThunk<
  void,
  Partial<Employee> | FormData,
  { rejectValue: Record<string, string[]> }
>(
  'employees/add',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const config = data instanceof FormData
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};

      await axios.post('/admin/employees', data, config);
      dispatch(fetchEmployees());
    } catch (error: any) {
      if (error.response?.status === 422) {
        return rejectWithValue(error.response.data.errors);
      }
      throw error;
    }
  }
);

export const updateEmployee = createAsyncThunk<
  void,
  { id: number; data: Partial<Employee> | FormData },
  { rejectValue: Record<string, string[]> }
>(
  'employees/update',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      let config = {};
      let payload: any = data;

      if (data instanceof FormData) {
        data.append('_method', 'PUT');
        config = { headers: { 'Content-Type': 'multipart/form-data' } };
      } else {
        payload = { ...data, _method: 'PUT' };
      }

      await axios.post(`/admin/employees/${id}`, payload, config);
      dispatch(fetchEmployees());
    } catch (error: any) {
      if (error.response?.status === 422) {
        return rejectWithValue(error.response.data.errors);
      }
      throw error;
    }
  }
);

export const deleteEmployee = createAsyncThunk<void, number>(
  'employees/delete',
  async (id, { dispatch }) => {
    await axios.delete(`/admin/employees/${id}`);
    dispatch(fetchEmployees());
  }
);

// Slice

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch employees';
      })

      // Fetch by ID
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch employee';
      })

      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.validationErrors = null;
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.validationErrors = action.payload;
        } else {
          state.error = action.error.message ?? 'Failed to add employee';
        }
      })

      // Update employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.validationErrors = null;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.validationErrors = action.payload;
        } else {
          state.error = action.error.message ?? 'Failed to update employee';
        }
      })

      // Delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete employee';
      });
  },
});

export const { clearCurrent, clearValidationErrors, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
