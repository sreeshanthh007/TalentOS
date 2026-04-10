import axios from 'axios'

export function getErrorMessage(error: unknown, fallback: string = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message
    }
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return fallback
}
