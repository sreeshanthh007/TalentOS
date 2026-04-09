import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {type  AdminUser } from '@/shared/types';

interface AdminState {
  user: AdminUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin(state, action: PayloadAction<{ user: AdminUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutAdmin(state) {
      Object.assign(state, initialState);
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { loginAdmin, logoutAdmin, setAccessToken, setLoading, setError } = adminSlice.actions;
export default adminSlice.reducer;
