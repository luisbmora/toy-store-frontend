import {
  BarChart3,
  Boxes,
  ClipboardList,
  Home,
  Package,
  Settings,
  ShoppingBag,
  X,
} from 'lucide-react'

interface SidebarProps {
  isMobileOpen: boolean
  onCloseMobile: () => void
}

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

function SidebarContent({ onCloseMobile }: { onCloseMobile?: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-md">
            <Package size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Toy Store
            </h1>
            <p className="text-sm text-slate-500">
              Inventory System
            </p>
          </div>
        </div>

        {onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        ) : null}
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.label}
              type="button"
              onClick={onCloseMobile}
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
    </>
  )
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside className="hidden min-h-screen w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        <SidebarContent />
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={onCloseMobile}
          />

          <aside className="relative z-10 flex h-full w-[min(22rem,85vw)] flex-col bg-white px-5 py-6 shadow-2xl">
            <SidebarContent onCloseMobile={onCloseMobile} />
          </aside>
        </div>
      ) : null}
    </>
  )
}