import HeroSidebar from "@/src/features/dashboard/components/hero-sidebar";
import Sidebar from "@/src/features/dashboard/components/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar>
        <HeroSidebar />
      </Sidebar>

      <div className="flex flex-col flex-1 w-full">
        <main className="flex-1 w-full">{children}</main>

        {/* Footer Elegante */}
        <footer className="border-t border-border ">
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

              {/* Logo y marca */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">ES</span>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">ElGStore</p>
                  <p className="text-xs text-muted-foreground">Sistema de Gestión</p>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="text-center md:text-right">
                <p className="text-sm text-card-foreground font-medium">
                  Soporte técnico
                </p>
                <p className="text-xs text-muted-foreground">
                  contacto@elgstore.com • +51 967393088
                </p>
              </div>

            </div>
            <div className="my-4 border-t border-border/50"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-sm text-muted-foreground">
                © 2025 ElGStore. Todos los derechos reservados.
              </p>

              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-card-foreground transition-colors duration-200"
                >
                  Política de Privacidad
                </a>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-card-foreground transition-colors duration-200"
                >
                  Términos de Servicio
                </a>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-card-foreground transition-colors duration-200"
                >
                  Soporte
                </a>
              </div>
            </div>

            {/* Versión del sistema */}
            <div className="mt-4 text-center">
              <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border">
                v2.1.0 • Sistema de Inventario
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}