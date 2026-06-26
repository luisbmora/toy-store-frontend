import { CheckCircle2, X, XCircle } from 'lucide-react'
import type { ToastMessage } from '../../types/product'

interface ToastProps {
  toast: ToastMessage | null
  onClose: () => void
}

export function Toast({ toast, onClose }: ToastProps) {
  if (!toast) {
    return null
  }

  const isSuccess = toast.type === 'success'

  return (
    <div className="fixed right-4 top-4 z-[70] w-[calc(100%-2rem)] max-w-md sm:right-6 sm:top-6">
      <div
        className={[
          'flex items-start gap-3 rounded-3xl border bg-white p-4 shadow-2xl',
          isSuccess ? 'border-blue-100' : 'border-red-100',
        ].join(' ')}
      >
        <div
          className={[
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
            isSuccess
              ? 'bg-blue-100 text-blue-600'
              : 'bg-red-100 text-red-600',
          ].join(' ')}
        >
          {isSuccess ? <CheckCircle2 size={23} /> : <XCircle size={23} />}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={[
              'text-sm font-bold',
              isSuccess ? 'text-blue-600' : 'text-red-600',
            ].join(' ')}
          >
            {isSuccess ? 'Operación exitosa' : 'Ocurrió un problema'}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          aria-label="Cerrar alerta"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}