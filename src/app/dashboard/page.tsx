"use client"

import ProductTable from "@/src/features/dashboard/components/products-table"
import StatCard from "@/src/features/dashboard/components/stat-card"
import { Button } from "@/src/shared"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/components/ui/card"
import { Input } from "@/src/shared/components/ui/input"
import { BarChart3, Package, TrendingUp, AlertCircle, Plus, Search, Filter } from "lucide-react"


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:pt-8 px-4 md:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground mt-1">Aquí está el resumen de tu inventario</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Productos" value="1,254" icon={Package} change="+2.5% vs mes pasado" trend="up" />
        <StatCard title="Valor Inventario" value="$45,230" icon={BarChart3} change="+12.1% vs mes pasado" trend="up" />
        <StatCard title="Productos Bajos" value="42" icon={AlertCircle} change="Requieren reorden" trend="warning" />
        <StatCard title="Rotación Stock" value="8.2x" icon={TrendingUp} change="+1.3% vs mes pasado" trend="up" />
      </div>

      {/* Products Section */}
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">Productos</CardTitle>
              <CardDescription className="mt-1">Gestiona y monitorea tu inventario</CardDescription>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50">
              <Plus size={18} />
              Agregar Producto
            </Button>
          </div>
        </CardHeader>

        {/* Search and Filter */}
        <CardContent className="pt-6 border-b border-primary/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50"
              />
            </div>
            <Button
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10 bg-transparent w-full sm:w-auto"
            >
              <Filter size={18} />
              Filtros
            </Button>
          </div>
        </CardContent>

        {/* Table */}
        <CardContent className="pt-6">
          <ProductTable />
        </CardContent>
      </Card>
    </div>
  )
}
