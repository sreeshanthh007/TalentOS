import { configureStore } from '@reduxjs/toolkit'
import candidateReducer from './slices/candidateSlice'
import employerReducer from './slices/employerSlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
  reducer: {
    candidate: candidateReducer,
    employer: employerReducer,
    admin: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
