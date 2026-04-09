import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/shared/utils/axiosInstance';
import { loginCandidate, logoutCandidate } from '@/store/slices/candidateSlice';
import { loginEmployer, logoutEmployer } from '@/store/slices/employerSlice';
import { loginAdmin, logoutAdmin } from '@/store/slices/adminSlice';

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (role: 'candidate' | 'employer' | 'admin', { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/${role}/me`);
      
      if (role === 'candidate') {
        dispatch(loginCandidate({ user: data.data.user, accessToken: data.data.accessToken }));
      }
      if (role === 'employer') {
        dispatch(loginEmployer({ user: data.data.user, accessToken: data.data.accessToken }));
      }
      if (role === 'admin') {
        dispatch(loginAdmin({ user: data.data.user, accessToken: data.data.accessToken }));
      }
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (role: 'candidate' | 'employer' | 'admin', { dispatch }) => {
    try {
      await axiosInstance.post('/api/v1/auth/logout');
    } finally {
      localStorage.removeItem('talentos_session');
      if (role === 'candidate') dispatch(logoutCandidate());
      if (role === 'employer') dispatch(logoutEmployer());
      if (role === 'admin') dispatch(logoutAdmin());
    }
  }
);
