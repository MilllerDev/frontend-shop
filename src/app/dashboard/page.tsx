import { getInvataryStats } from "@/src/features/dashboard/actions/get-inventary-stats.action";
import StatCard from "@/src/features/dashboard/components/stat-card"
import { getGraficsByCategoriesWithCountProduct, getGraficsByMonth } from "@/src/features/dashboard/actions/get-grafics-data.action";
import SalesChart from "@/src/features/dashboard/components/sales-chart";
import { BarChart3, Package, TrendingUp, AlertCircle, User2Icon } from "lucide-react"
import CategoryDonutChart from "@/src/features/dashboard/components/category-donaut-chart";

export default async function DashboardPage() {
  const date = new Date().toDateString();
  const stats = await getInvataryStats();
  const graficsBYMonth = await getGraficsByMonth();
  const graficByDonaut = await getGraficsByCategoriesWithCountProduct();
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
        <StatCard title="Total Productos" value={`${stats.totalStock}`} icon={Package} change="Total de productos" trend="up" />
        <StatCard title="Valor Inventario" value={`s/. ${stats.totalValue}`} icon={BarChart3} change="Valor total" trend="up" />
        <StatCard title="Productos Bajos" value={`${stats.productWithLowestStock.stock}`} icon={AlertCircle} change="Requieren reorden" trend="warning" />
        <StatCard title="Cliente con más compras" value={`${stats.topClient.name}`} icon={User2Icon} change={`${stats.topClient.total} compras en total`} trend="up" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
        <SalesChart data={graficsBYMonth} />
        <CategoryDonutChart data={graficByDonaut} />
      </div>

    </div>
  )
}