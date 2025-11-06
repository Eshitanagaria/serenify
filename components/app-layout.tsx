import type { ReactNode } from "react"
import { MainNav } from "@/components/main-nav"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
