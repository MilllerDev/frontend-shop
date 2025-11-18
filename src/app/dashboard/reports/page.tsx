import { FilterReports } from "@/src/features/reports/components/filter-reports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <p className="text-muted-foreground">Genera reportes de tu inventario por rango de fechas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generar Reporte</CardTitle>
          <CardDescription>Selecciona el rango de fechas para tu reporte</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FilterReports />
        </CardContent>

      </Card>

    </div>
  );
}