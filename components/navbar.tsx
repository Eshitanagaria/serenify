"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Leaf, Home, CalendarDays, Target, BarChart3, MessageSquare, User, LogOut } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/tracker", label: "Tracker", icon: CalendarDays },
    { href: "/habits", label: "Habits", icon: Target },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/coach", label: "Coach", icon: MessageSquare },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:bottom-auto md:w-64 bg-card/95 backdrop-blur-md border-t md:border-t-0 md:border-r border-border/50">
      <div className="flex md:flex-col h-20 md:h-screen px-4 md:px-6 py-4 md:py-8">
        {/* Logo - only visible on desktop */}
        <Link href="/dashboard" className="hidden md:flex items-center gap-2 mb-8">
          <Leaf className="w-8 h-8 text-accent" />
          <span className="text-xl font-bold text-foreground">Serenify</span>
        </Link>

        {/* Mobile nav - centered icons */}
        <div className="flex-1 md:hidden flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <button
                  className={`flex justify-center py-2 transition-colors ${
                    isActive ? "text-accent" : "text-foreground/60 hover:text-foreground"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-6 h-6" />
                </button>
              </Link>
            )
          })}
          <button
            className="text-foreground/60 hover:text-destructive transition-colors py-2"
            title="Logout"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop nav - vertical list */}
        <div className="hidden md:flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-primary/20 text-accent hover:bg-primary/30"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Desktop logout button */}
        <div className="hidden md:block">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground/70 hover:text-destructive hover:bg-destructive/10"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
