import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EmployerUser } from '@/shared/types';

interface EmployerState {
  user: EmployerUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployerState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    loginEmployer(state, action: PayloadAction<{ user: EmployerUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutEmployer(state) {
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

export const { loginEmployer, logoutEmployer, setAccessToken, setLoading, setError } = employerSlice.actions;
export default employerSlice.reducer;
