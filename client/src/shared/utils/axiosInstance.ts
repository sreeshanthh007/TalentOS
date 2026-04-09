import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for JWT attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for 401 refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // TODO: Call Refresh Token API
        // const { data } = await axiosInstance.post('/auth/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
        // localStorage.setItem('accessToken', data.accessToken);
        // return axiosInstance(originalRequest);
      } catch (refreshError) {
        // TODO: Handle refresh failure (logout)
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
