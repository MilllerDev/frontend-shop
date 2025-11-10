import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4 md:px-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-sm font-medium text-purple-300">Nuevo Sistema</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-purple-100 bg-clip-text text-transparent">
              Administrador
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent">
              de Inventario
            </span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-purple-200/80 text-balance max-w-2xl mx-auto leading-relaxed">
            Toda la administración de tu tienda en un solo sitio. Gestiona inventario, ventas y más de forma inteligente
          </p>
        </div>

        <Link
          href="/auth/login"
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-slate-950 bg-gradient-to-r from-purple-400 to-blue-300 hover:from-purple-300 hover:to-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 active:scale-95"
        >
          <span>Acceder al Sistema</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
            </div>
            <span className="text-sm text-purple-300/70">Acceso Rápido</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <span className="text-sm text-blue-300/70">Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
            </div>
            <span className="text-sm text-purple-300/70">En Tiempo Real</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </main>
  )
}
