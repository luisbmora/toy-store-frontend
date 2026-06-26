import { Package, Plus } from 'lucide-react'

export function InventoryPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
              Toy Store
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Inventario de juguetes
            </h1>

            <p className="mt-2 text-slate-500">
              Administra productos, precios, compañías e imágenes desde un solo lugar.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600">
            <Plus size={20} />
            Agregar producto
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
              <Package size={22} />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Productos registrados
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              0
            </h2>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Precio promedio
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              $0.00
            </h2>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Con restricción de edad
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              0
            </h2>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Sin imagen
            </p>

            <h2 className="mt-3 text-3xl font-bold text-red-500">
              0
            </h2>
          </article>
        </div>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Productos
          </h2>

          <p className="mt-2 text-slate-500">
            En la siguiente sección conectaremos esta vista con la API del backend.
          </p>
        </section>
      </section>
    </main>
  )
}