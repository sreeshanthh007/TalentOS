import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '@/store/slices/candidateSlice';
import employerReducer from '@/store/slices/employerSlice';
import adminReducer from '@/store/slices/adminSlice';

export const store = configureStore({
  reducer: {
    candidate: candidateReducer,
    employer: employerReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
