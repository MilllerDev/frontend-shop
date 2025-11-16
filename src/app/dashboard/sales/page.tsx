import SaleForm from "@/src/features/sales/components/sale-form";
import SaleTable from "@/src/features/sales/components/sale-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Modal } from "@/src/shared/components/ui/modal";
import { Plus } from "lucide-react";
import Link from "next/link";
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
            <Link
              href={"/dashboard/sales/register"}
              className="flex flex-row items-center gap-2 p-2 rounded-md text-sm bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50"
            >
              <Plus size={18} />
              Registrar venta
            </Link>
          </div>
        </CardHeader>
        <Suspense fallback={<div>Cargando</div>}>
          <SaleTable />
        </Suspense>
      </Card>
    </div>
  );
}
