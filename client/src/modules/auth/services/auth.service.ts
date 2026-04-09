import { axiosInstance } from '@/shared/utils/axiosInstance';
import type { LoginValues, CandidateRegisterValues, EmployerRegisterValues } from '@/shared/types';

export const AuthService = {
  login: async (data: LoginValues) => {
    return axiosInstance.post('/api/v1/auth/login', data);
  },
  registerCandidate: async (data: CandidateRegisterValues) => {
    return axiosInstance.post('/api/v1/auth/register/candidate', data);
  },
  registerEmployer: async (data: EmployerRegisterValues) => {
    return axiosInstance.post('/api/v1/auth/register/employer', data);
  }
};
