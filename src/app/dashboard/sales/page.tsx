import SaleTable from "@/src/features/sales/components/sale-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Suspense } from "react";

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:py-8 px-4 md:px-8">
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">Módulo de Ventas</CardTitle>
              <CardDescription className="mt-1">
                Monitorea todas tus ventas aquí
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <Suspense fallback={<div>Cargando</div>}>
          <SaleTable />
        </Suspense>
      </Card>
    </div>
  );
}
