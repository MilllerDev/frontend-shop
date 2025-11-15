"use client";

import { Button } from "@/src/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  UsersRound,
  ChevronRight,
  Coins,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Reportes", href: "/dashboard/reports" },
  { icon: Coins, label: "Ventas", href: "/dashboard/sales" },
];

const maintenanceItems = [
  { icon: Package, label: "Productos", href: "/dashboard/products" },
  { icon: UsersRound, label: "Clientes", href: "/dashboard/clients" },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if any maintenance item is active
  const isMaintenanceActive = maintenanceItems.some(
    (item) => pathname === item.href
  );

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
        className={`fixed flex flex-col justify-between left-0 top-0 h-screen w-64 bg-background border-r border-primary/30 transition-transform duration-300 ease-in-out z-30 md:sticky md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/*        
        <div className="p-6 border-b border-primary/20 flex flex-col justify-center items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/50">
            <Package className="text-accent-foreground" size={24} />
          </div>
          <div className="hidden md:block text-center">
            <h1 className="text-lg font-bold text-foreground">Inventory</h1>
            <p className="text-xs text-primary/70">Admin</p>
          </div>
        </div> */}
        {children}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 flex flex-col gap-1 overflow-y-auto">
          {/* Regular Menu Items */}
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start gap-2 ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/50"
                    : "text-foreground hover:bg-primary/30"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Button>
            </Link>
          ))}

          {/* Maintenance Accordeon */}
          <Accordion
            type="single"
            collapsible
            className="w-full animate-in fade-in slide-in-from-left-3 duration-300"
            style={{ animationDelay: `${menuItems.length * 50}ms` }}
          >
            <AccordionItem value="maintenance" className="border-none">
              <AccordionTrigger
                className={`p-0 hover:no-underline group transition-all duration-300 [&>svg]:hidden ${
                  isMaintenanceActive ? "" : ""
                }`}
              >
                <Button
                  variant={isMaintenanceActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 transition-all duration-300 ${
                    isMaintenanceActive
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/50 scale-[1.02]"
                      : "text-foreground hover:bg-primary/30 hover:translate-x-1"
                  }`}
                  asChild
                >
                  <div className="flex items-center w-full">
                    <Settings
                      size={20}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />
                    <span className="flex-1 text-left ml-3">Mantenimiento</span>
                    <ChevronRight
                      size={16}
                      className="transition-all duration-500 ease-out group-data-[state=open]:rotate-90"
                    />
                  </div>
                </Button>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1 space-y-1 ml-2">
                {maintenanceItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="block animate-in fade-in slide-in-from-left-2 duration-300"
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 pl-11 group transition-all duration-300 ${
                        pathname === item.href
                          ? "bg-primary/20 text-accent-foreground before:absolute before:left-2 before:w-1 before:h-6 before:bg-accent before:rounded-full"
                          : "text-foreground/80 hover:bg-primary/20 hover:text-foreground hover:translate-x-1"
                      } relative`}
                    >
                      <item.icon
                        size={18}
                        className="transition-transform duration-300 group-hover:scale-110 ml-1"
                      />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-primary/20">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 border-primary/30 text-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive/50 bg-transparent"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
