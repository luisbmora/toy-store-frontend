import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  title: string
  subtitle: string
  searchTerm?: string
  onSearchChange?: (value: string) => void
  children: ReactNode
}

export function AppLayout({
  title,
  subtitle,
  searchTerm,
  onSearchChange,
  children,
}: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={title}
            subtitle={subtitle}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          <main className="flex-1 px-4 py-5 sm:px-5 md:px-8 md:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}