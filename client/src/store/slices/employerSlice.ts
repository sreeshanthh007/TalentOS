import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { EmployerUser } from '@/shared/types'
import { getSession } from '@/shared/utils/session'

interface EmployerState {
  employer: EmployerUser | null
  isAuthenticated: boolean
}

const initialState: EmployerState = {
  employer: null,
  isAuthenticated: getSession()?.role === 'employer',
}

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    employerLogin: (state, action: PayloadAction<EmployerUser>) => {
      state.employer = action.payload
      state.isAuthenticated = true
    },
    employerLogout: (state) => {
      state.employer = null
      state.isAuthenticated = false
    },
  },
})

export const { employerLogin, employerLogout } = employerSlice.actions
export default employerSlice.reducer
