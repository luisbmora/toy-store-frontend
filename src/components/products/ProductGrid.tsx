import { PackageSearch } from 'lucide-react'
import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  apiBaseUrl: string
  onEdit: (product: Product) => void
}

export function ProductGrid({ products, apiBaseUrl, onEdit }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
          <PackageSearch size={34} />
        </div>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          No hay productos registrados
        </h3>

        <p className="mt-2 max-w-md text-slate-500">
          Cuando agregues productos, aparecerán en esta sección del inventario.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          apiBaseUrl={apiBaseUrl}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}