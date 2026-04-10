import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CandidateUser } from '@/shared/types'

interface CandidateState {
  candidate: CandidateUser | null
  isAuthenticated: boolean
}

const initialState: CandidateState = {
  candidate: null,
  isAuthenticated: false,
}

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    candidateLogin: (state, action: PayloadAction<CandidateUser>) => {
      state.candidate = action.payload
      state.isAuthenticated = true
    },
    candidateLogout: (state) => {
      state.candidate = null
      state.isAuthenticated = false
    },
  },
})

export const { candidateLogin, candidateLogout } = candidateSlice.actions
export default candidateSlice.reducer
