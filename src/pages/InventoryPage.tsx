import { Package, Plus, ShieldAlert, ImageOff, DollarSign } from 'lucide-react'
import { AppLayout } from '../components/layout/Applayout'
import { Button } from '../components/ui/Button'

const stats = [
  {
    label: 'Productos registrados',
    value: '0',
    icon: Package,
    color: 'bg-blue-100 text-blue-500',
  },
  {
    label: 'Precio promedio',
    value: '$0.00',
    icon: DollarSign,
    color: 'bg-yellow-100 text-yellow-500',
  },
  {
    label: 'Con restricción de edad',
    value: '0',
    icon: ShieldAlert,
    color: 'bg-red-100 text-red-500',
  },
  {
    label: 'Sin imagen',
    value: '0',
    icon: ImageOff,
    color: 'bg-slate-100 text-slate-500',
  },
]

export function InventoryPage() {
  return (
    <AppLayout
      title="Inventario de juguetes"
      subtitle="Administra productos, precios, compañías e imágenes desde un solo lugar."
    >
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Catálogo de productos
            </h1>

            <p className="mt-2 text-slate-500">
              Vista general del inventario disponible en la tienda.
            </p>
          </div>

          <Button>
            <Plus size={20} />
            Agregar producto
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Productos
              </h2>

              <p className="mt-1 text-slate-500">
                En la siguiente sección conectaremos esta vista con la API del backend.
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
              Pendiente de conexión API
            </span>
          </div>
        </section>
      </section>
    </AppLayout>
  )
}