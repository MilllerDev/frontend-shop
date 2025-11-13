import { Modal } from "@/src/features/products/components/modal";
import ProductTable from "@/src/features/products/components/product-table";
import ProductTableSkeleton from "@/src/features/products/components/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:py-8 px-4 md:px-8">
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">Productos</CardTitle>
              <CardDescription className="mt-1">
                Gestiona y monitorea tu inventario
              </CardDescription>
            </div>
            <Modal
              textButton="Agregar Producto"
              title="Añadir un producto"
              description="Agrega un producto al inventario"
            />
          </div>
        </CardHeader>
        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductTable />
        </Suspense>
      </Card>
    </div>
  );
}
