import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CandidateUser } from '@/shared/types';

interface CandidateState {
  user: CandidateUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    loginCandidate(state, action: PayloadAction<{ user: CandidateUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutCandidate(state) {
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

export const { loginCandidate, logoutCandidate, setAccessToken, setLoading, setError } = candidateSlice.actions;
export default candidateSlice.reducer;
