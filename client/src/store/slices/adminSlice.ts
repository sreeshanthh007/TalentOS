import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AdminUser } from '@/shared/types'

interface AdminState {
  admin: AdminUser | null
  isAuthenticated: boolean
}

const initialState: AdminState = {
  admin: null,
  isAuthenticated: false,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<AdminUser>) => {
      state.admin = action.payload
      state.isAuthenticated = true
    },
    adminLogout: (state) => {
      state.admin = null
      state.isAuthenticated = false
    },
  },
})

export const { adminLogin, adminLogout } = adminSlice.actions
export default adminSlice.reducer
