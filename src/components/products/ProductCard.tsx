import { Edit, ImageOff, Trash2 } from 'lucide-react'
import type { Product } from '../../types/product'
import { Button } from '../ui/Button'

interface ProductCardProps {
  product: Product
  apiBaseUrl: string
  onEdit: (product: Product) => void
}

export function ProductCard({ product, apiBaseUrl, onEdit }: ProductCardProps) {
  const imageSource = product.imageUrl
    ? `${apiBaseUrl}${product.imageUrl}`
    : null

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 items-center justify-center bg-slate-100">
        {imageSource ? (
          <img
            src={imageSource}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-slate-400">
            <ImageOff size={42} />
            <span className="mt-2 text-sm font-medium">
              Sin imagen
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {product.name}
            </h3>

            <p className="mt-1 text-sm font-semibold text-blue-500">
              {product.company}
            </p>
          </div>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-4 min-h-12 text-sm text-slate-500">
          {product.description || 'Sin descripción disponible.'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.ageRestriction !== null && product.ageRestriction !== undefined ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
              +{product.ageRestriction} años
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              Sin restricción
            </span>
          )}

          {product.imageUrl ? (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
              Con imagen
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              Imagen pendiente
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            className="px-3"
            onClick={() => onEdit(product)}
          >
            <Edit size={17} />
            Editar
          </Button>

          <Button variant="danger" className="px-3">
            <Trash2 size={17} />
            Eliminar
          </Button>
        </div>
      </div>
    </article>
  )
}