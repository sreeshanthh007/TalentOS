import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { logoutCandidate, setAccessToken as setCandidateToken } from '@/store/slices/candidateSlice';
import { logoutEmployer, setAccessToken as setEmployerToken } from '@/store/slices/employerSlice';
import { logoutAdmin, setAccessToken as setAdminToken } from '@/store/slices/adminSlice';
import { toast } from 'sonner';

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

function onRefreshed(token?: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function getRoleFromUrl(url?: string): 'candidate' | 'employer' | 'admin' | '' {
  const part = url?.split('/')[3] || '';
  return (['candidate', 'employer', 'admin'] as const).includes(part as never)
    ? (part as 'candidate' | 'employer' | 'admin')
    : '';
}

function handleLogout(role: string) {
  localStorage.removeItem('talentos_session');
  switch (role) {
    case 'candidate':
      store.dispatch(logoutCandidate());
      break;
    case 'employer':
      store.dispatch(logoutEmployer());
      break;
    case 'admin':
      store.dispatch(logoutAdmin());
      break;
    default:
      window.location.href = '/';
  }
}

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const state = store.getState();
  const sessionString = localStorage.getItem('talentos_session');
  let role = '';

  if (sessionString) {
    try {
      const session = JSON.parse(sessionString);
      role = session.role;
    } catch {
      // Ignore
    }
  }

  let token: string | null = null;
  if (role === 'candidate') token = state.candidate.accessToken;
  else if (role === 'employer') token = state.employer.accessToken;
  else if (role === 'admin') token = state.admin.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const role = getRoleFromUrl(originalRequest?.url) || (() => {
      try {
        return JSON.parse(localStorage.getItem('talentos_session') || '{}').role || '';
      } catch {
        return '';
      }
    })();

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/v1/auth/refresh-token') {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token?: string) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            } else {
              resolve(Promise.reject(error));
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post('/api/v1/auth/refresh-token', { role });
        const newToken = data.data.accessToken;

        if (role === 'candidate') store.dispatch(setCandidateToken(newToken));
        else if (role === 'employer') store.dispatch(setEmployerToken(newToken));
        else if (role === 'admin') store.dispatch(setAdminToken(newToken));

        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        onRefreshed();
        handleLogout(role);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    } else if (error.response?.status === 401 && originalRequest.url === '/api/v1/auth/refresh-token') {
      handleLogout(role);
    } else if (error.response?.status === 403) {
      toast.info('Access denied or blocked.');
      handleLogout(role);
    }

    return Promise.reject(error);
  }
);
