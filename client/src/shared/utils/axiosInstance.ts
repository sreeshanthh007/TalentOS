import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { store } from '@/store'
import { adminLogout } from '@/store/slices/adminSlice'
import { candidateLogout } from '@/store/slices/candidateSlice'
import { employerLogout } from '@/store/slices/employerSlice'
import { getSession, clearSession } from './session'
import { type UserRole, type ApiResponse } from '../types'
import { API_ENDPOINTS } from '../constants/api.routes'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers: ((error: Error | null) => void)[] = []

function onRefreshed(error: Error | null) {
  refreshSubscribers.forEach((callback) => callback(error))
  refreshSubscribers = []   
}

const handleLogout = (role: string | null) => {
  clearSession()
  if (role === 'candidate') {
    store.dispatch(candidateLogout())
  } else if (role === 'employer') {
    store.dispatch(employerLogout())
  } else if (role === 'admin') {
    store.dispatch(adminLogout())
  }
}

function getRoleFromUrl(url?: string): UserRole | null {
  if (!url) return null
  const segment = url.split('/')[3]
  if (segment === 'candidate') return 'candidate'
  if (segment === 'employer') return 'employer'
  if (segment === 'admin') return 'admin'
  return null
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<null>>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig
    if (!originalRequest) return Promise.reject(error)

    const session = getSession()

    // Assuming the URL format for api is /api/v1/userRole/... 
    // Wait, the hook uses the original approach for URL sniffing
    const roleFromUrl = getRoleFromUrl(originalRequest.url)
    const role: UserRole | string | null = roleFromUrl || session?.role || null

    const message = error.response?.data?.message || ''

    if (error.response?.status === 401 && !originalRequest._retry) {
      const isLoginRequest = originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN)
      const isRefreshTokenRequest = originalRequest.url?.includes(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
      
      if (isRefreshTokenRequest || isLoginRequest) {
        clearSession()
        handleLogout(role)
        toast.info(message || 'Session expired, please log in again')
        return Promise.reject(error)
      }
 
      originalRequest._retry = true
 
      if (!isRefreshing) {
        isRefreshing = true
 
        try {
          const authRole = roleFromUrl || session?.role || ''
          await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, authRole ? { role: authRole } : undefined)
          
          isRefreshing = false
          onRefreshed(null)
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          isRefreshing = false
          clearSession()
          handleLogout(role)
          onRefreshed(refreshError as Error)
          return Promise.reject(refreshError)
        }
      }

      return new Promise((resolve, reject) => {
        refreshSubscribers.push((err: Error | null) => {
          if (err) {
            reject(err)
          } else {
            resolve(axiosInstance(originalRequest))
          }
        })
      })
    }

    if (
      error.response?.status === 403 &&
      (message.includes('blocked') || message.includes('blacklisted'))
    ) {
      clearSession()
      handleLogout(role)
      toast.info(message || 'Access denied')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)
