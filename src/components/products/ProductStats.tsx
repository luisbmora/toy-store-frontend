import { DollarSign, ImageOff, Package, ShieldAlert } from 'lucide-react'
import type { Product } from '../../types/product'

interface ProductStatsProps {
  products: Product[]
}

export function ProductStats({ products }: ProductStatsProps) {
  const totalProducts = products.length

  const averagePrice =
    totalProducts > 0
      ? products.reduce((sum, product) => sum + product.price, 0) / totalProducts
      : 0

  const ageRestrictedProducts = products.filter(
    (product) => product.ageRestriction !== null && product.ageRestriction !== undefined,
  ).length

  const productsWithoutImage = products.filter(
    (product) => !product.imageUrl,
  ).length

  const stats = [
    {
      label: 'Productos registrados',
      value: totalProducts.toString(),
      icon: Package,
      color: 'bg-blue-100 text-blue-500',
    },
    {
      label: 'Precio promedio',
      value: `$${averagePrice.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-500',
    },
    {
      label: 'Con restricción de edad',
      value: ageRestrictedProducts.toString(),
      icon: ShieldAlert,
      color: 'bg-red-100 text-red-500',
    },
    {
      label: 'Sin imagen',
      value: productsWithoutImage.toString(),
      icon: ImageOff,
      color: 'bg-slate-100 text-slate-500',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <article
            key={stat.label}
            className="rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
              <Icon size={23} />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              {stat.label}
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </article>
        )
      })}
    </div>
  )
}