
import { getInvataryStats } from "@/src/features/dashboard/actions/get-inventary-stats.action";
import StatCard from "@/src/features/dashboard/components/stat-card"
import { BarChart3, Package, TrendingUp, AlertCircle, Plus, Search, Filter } from "lucide-react"


export default async function DashboardPage() {

  const date = new Date().toDateString();

  const stats = await getInvataryStats();
  console.log(stats);

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-8 px-4 md:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground mt-1">Aquí está el resumen de tu inventario - {date}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Productos" value={`${stats.totalStock}`} icon={Package} change="+2.5% vs mes pasado" trend="up" />
        <StatCard title="Valor Inventario" value={`s/. ${stats.totalValue}`} icon={BarChart3} change="+12.1% vs mes pasado" trend="up" />
        <StatCard title="Productos Bajos" value={`${stats.productWithLowestStock.stock}`} icon={AlertCircle} change="Requieren reorden" trend="warning" />
        <StatCard title="Rotación Stock" value="8.2x" icon={TrendingUp} change="+1.3% vs mes pasado" trend="up" />
      </div>
    </div>
  )
}
