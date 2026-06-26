import {
  BarChart3,
  Boxes,
  ClipboardList,
  Home,
  Package,
  Settings,
  ShoppingBag,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Dashboard',
    icon: Home,
    isActive: false,
  },
  {
    label: 'Inventario',
    icon: Package,
    isActive: true,
  },
  {
    label: 'Productos',
    icon: Boxes,
    isActive: false,
  },
  {
    label: 'Órdenes',
    icon: ShoppingBag,
    isActive: false,
  },
  {
    label: 'Reportes',
    icon: BarChart3,
    isActive: false,
  },
  {
    label: 'Auditoría',
    icon: ClipboardList,
    isActive: false,
  },
  {
    label: 'Configuración',
    icon: Settings,
    isActive: false,
  },
]

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-md">
          <Package size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Toy Store
          </h1>
          <p className="text-sm text-slate-500">
             Sistema de Inventarios
          </p>
        </div>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.label}
              type="button"
              className={[
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition',
                item.isActive
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-100'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
              ].join(' ')}
            >
              <Icon size={20} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="rounded-3xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          Prueba técnica
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Frontend conectado a Toy Store API.
        </p>
      </div>
    </aside>
  )
}