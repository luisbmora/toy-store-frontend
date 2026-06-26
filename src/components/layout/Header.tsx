import { Bell, Menu, Search } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle: string
  onOpenMobileMenu: () => void
}

export function Header({ title, subtitle, onOpenMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 sm:text-sm">
              Toy Store
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              {title}
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-slate-500 md:text-base">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block flex-1 sm:w-80">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Buscar productos..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <button
            type="button"
            className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm transition hover:text-blue-500 sm:flex"
            aria-label="Notificaciones"
          >
            <Bell size={21} />
          </button>
        </div>
      </div>
    </header>
  )
}