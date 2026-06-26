import { Bell, Menu, Search, Trash2 } from 'lucide-react'
import type { ActivityNotification } from '../../types/product'

interface HeaderProps {
  title: string
  subtitle: string
  searchTerm?: string
  notifications?: ActivityNotification[]
  onSearchChange?: (value: string) => void
  onClearNotifications?: () => void
  onOpenMobileMenu: () => void
}

function getNotificationBadgeColor(type: ActivityNotification['type']) {
  switch (type) {
    case 'created':
      return 'bg-blue-100 text-blue-600'

    case 'updated':
      return 'bg-yellow-100 text-yellow-700'

    case 'deleted':
      return 'bg-red-100 text-red-600'

    default:
      return 'bg-slate-100 text-slate-600'
  }
}

function getNotificationLabel(type: ActivityNotification['type']) {
  switch (type) {
    case 'created':
      return 'Alta'

    case 'updated':
      return 'Edición'

    case 'deleted':
      return 'Eliminación'

    default:
      return 'Actividad'
  }
}

export function Header({
  title,
  subtitle,
  searchTerm = '',
  notifications = [],
  onSearchChange,
  onClearNotifications,
  onOpenMobileMenu,
}: HeaderProps) {
  const hasNotifications = notifications.length > 0

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
              value={searchTerm}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Buscar por nombre..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <div className="relative">
            <details className="group">
              <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm transition hover:text-blue-500 [&::-webkit-details-marker]:hidden">
                <span className="relative">
                  <Bell size={21} />

                  {hasNotifications ? (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {notifications.length}
                    </span>
                  ) : null}
                </span>
              </summary>

              <div className="absolute right-0 top-14 z-40 w-[min(22rem,90vw)] rounded-3xl border border-slate-100 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Notificaciones
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Actividad reciente del inventario.
                    </p>
                  </div>

                  {hasNotifications ? (
                    <button
                      type="button"
                      onClick={onClearNotifications}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-red-500"
                      aria-label="Limpiar notificaciones"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : null}
                </div>

                <div className="mt-4 max-h-80 space-y-3 overflow-y-auto">
                  {hasNotifications ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={[
                              'rounded-full px-2.5 py-1 text-xs font-bold',
                              getNotificationBadgeColor(notification.type),
                            ].join(' ')}
                          >
                            {getNotificationLabel(notification.type)}
                          </span>

                          <span className="text-xs text-slate-400">
                            {notification.createdAt}
                          </span>
                        </div>

                        <p className="mt-2 text-sm font-medium text-slate-700">
                          {notification.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 p-5 text-center">
                      <p className="text-sm font-semibold text-slate-700">
                        Sin notificaciones
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Las altas, ediciones y eliminaciones aparecerán aquí.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  )
}