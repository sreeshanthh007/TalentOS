import { toast } from 'sonner'

export function useToast() {
  return {
    success: (message: string) => {
      toast.success(message, {
        style: {
          background: '#0D4F4F',
          color: '#fff',
          border: '1px solid #0D4F4F',
        },
      })
    },
    error: (message: string) => {
      toast.error(message, {
        style: {
          background: '#FF6B6B',
          color: '#fff',
          border: '1px solid #FF6B6B',
        },
      })
    },
    info: (message: string) => {
      toast.info(message, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #333',
        },
      })
    },
    warning: (message: string) => {
      toast.warning(message, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #333',
        },
      })
    },
    loading: (message: string) => {
      return toast.loading(message, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #333',
        },
      })
    },
    dismiss: (id?: string | number) => {
      toast.dismiss(id)
    },
  }
}
