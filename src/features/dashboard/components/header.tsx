"use client"

import { Button } from "@/src/shared"
import { Bell, User, Moon, Sun } from "lucide-react"

import { useTheme } from "next-themes"


export default function Header() {
  const { theme, setTheme } = useTheme()


  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">📦</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">InventPro</h1>
            <p className="text-xs text-muted-foreground">Gestor de Inventario</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:bg-accent"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
