import { AlertTriangle, Trash2 } from 'lucide-react'
import type { Product } from '../../types/product'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface DeleteProductModalProps {
  product: Product | null
  isOpen: boolean
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteProductModal({
  product,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar producto"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-100 text-red-500">
          <AlertTriangle size={34} />
        </div>

        <h3 className="mt-5 text-2xl font-bold text-slate-900">
          ¿Eliminar producto?
        </h3>

        <p className="mt-3 text-slate-500">
          ¿Estás seguro de eliminar{' '}
          <span className="font-bold text-slate-900">
            {product?.name ?? 'este producto'}
          </span>
          ? Esta acción no se puede deshacer.
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
          >
            No, conservar
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            <Trash2 size={18} />
            {isDeleting ? 'Eliminando...' : 'Sí, eliminar producto'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}