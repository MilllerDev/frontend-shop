"use client"

import { Button } from "@/src/shared"
import { LayoutDashboard, Package, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Productos", href: "/dashboard/products" },
  { icon: BarChart3, label: "Reportes", href: "/dashboard/reports" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed flex flex-col justify-between left-0 top-0 h-screen w-64 bg-gradient-to-b from-primary/20 to-primary/5 border-r border-primary/30 transition-transform duration-300 ease-in-out z-30 md:sticky md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-primary/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/50">
            <Package className="text-accent-foreground" size={24} />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-foreground">Inventory</h1>
            <p className="text-xs text-primary/70">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start gap-2 ${pathname === item.href
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/50"
                  : "text-foreground hover:bg-primary/30"
                  }`}
              >
                <item.icon size={20} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-primary/20 ">
          <Button
            variant="outline"
            className="w-full  justify-center gap-2 border-primary/30 text-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive/50 bg-transparent"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
