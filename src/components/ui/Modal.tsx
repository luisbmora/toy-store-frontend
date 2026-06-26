import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  title?: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({ title, children, isOpen, onClose }: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-3 py-3 sm:items-center sm:px-4 sm:py-6">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <section className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:p-6">
        {title ? (
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
          </div>
        ) : null}

        {children}
      </section>
    </div>
  )
}