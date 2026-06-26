import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header title={title} subtitle={subtitle} />

          <main className="flex-1 px-4 py-6 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}