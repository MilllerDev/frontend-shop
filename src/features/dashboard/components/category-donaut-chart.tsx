'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoriByProductGraficDonaut, Datum } from '@/src/shared/types/grafics-estadistics';

interface CategoryDonutChartProps {
  data: CategoriByProductGraficDonaut;
}

// Colores vibrantes para las categorías
const COLORS = [
  'oklch(0.55 0.2 300)',   // Morado (primary)
  'oklch(0.6 0.25 310)',   // Rosa/Magenta (accent)
  'oklch(0.6 0.2 270)',    // Azul-Morado
  'oklch(0.65 0.22 330)',  // Rosa claro
  'oklch(0.5 0.18 290)',   // Morado oscuro
  'oklch(0.7 0.2 320)',    // Rosa pastel
  'oklch(0.55 0.15 280)',  // Violeta
  'oklch(0.6 0.23 340)',   // Fucsia
];

export default function CategoryDonutChart({ data }: CategoryDonutChartProps) {

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-card border border-border p-4 rounded-lg shadow-lg">
          <p className="font-semibold text-card-foreground mb-2 capitalize">
            {item.name}
          </p>
          <p className="text-primary text-sm font-medium">
            Productos: {item.productCount}
          </p>
          <p className="text-accent text-sm font-medium">
            Porcentaje: {item.porcentage.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Label personalizado para mostrar porcentaje
  const renderLabel = (entry: any) => {
    return `${entry.porcentage.toFixed(0)}%`;
  };

  return (
    <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Distribución por Categorías
        </h2>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            Total de productos: <span className="font-bold text-primary">{data.total}</span>
          </p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full h-[400px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={120}
              innerRadius={70}
              fill="oklch(var(--primary))"
              dataKey="productCount"
              animationDuration={1500}
              animationBegin={0}
            >
              {data.data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="capitalize text-card-foreground">
                  {entry.payload.name} ({entry.payload.productCount})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Lista de categorías */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.data.map((category, index) => (
          <div
            key={category.id}
            className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground capitalize truncate">
                {category.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {category.productCount} productos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}