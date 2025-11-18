'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyData {
  month: number;
  monthName: string;
  totalSales: number;
  salesCount: number;
}

interface SalesData {
  year: number;
  totalAnnualSales: number;
  totalSalesCount: number;
  monthlyData: MonthlyData[];
}

interface SalesChartProps {
  data: SalesData;
}

export default function SalesChart({ data }: SalesChartProps) {

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-4 rounded-lg shadow-lg">
          <p className="font-semibold text-foreground mb-2">{payload[0].payload.monthName}</p>
          <p className="text-primary text-sm">
            Ventas: s/. {payload[0].value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-accent text-sm">
            Cantidad: {payload[0].payload.salesCount} ventas
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
      {/* Header con información general */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Ventas Anuales {data.year}
        </h2>
        <div className="mt-4 flex flex-wrap gap-6">
          <div className="bg-primary/10 px-4 py-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Ventas</p>
            <p className="text-2xl font-semibold text-primary">
              s/. {data.totalAnnualSales.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-accent/10 px-4 py-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Cantidad de Ventas</p>
            <p className="text-2xl font-semibold text-accent">
              {data.totalSalesCount}
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="monthName"
              className="text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-muted-foreground"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `s/. ${value.toLocaleString('es-PE')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Ventas Totales"
              dot={{
                fill: 'hsl(var(--primary))',
                strokeWidth: 2,
                stroke: '#fff',
                r: 6
              }}
              activeDot={{
                r: 8,
                fill: 'hsl(var(--accent))',
                stroke: '#fff',
                strokeWidth: 2
              }}
              animationDuration={1500}
              animationBegin={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}