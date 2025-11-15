import { Modal } from "@/src/shared/components/ui/modal";
import ProductForm from "@/src/features/products/components/product-form";
import ProductTable from "@/src/features/products/components/product-table";
import ProductTableSkeleton from "@/src/features/products/components/skeleton";
import { Button } from "@/src/shared";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:py-8 px-4 md:px-8">
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">
                Mantinimiento de Productos
              </CardTitle>
              <CardDescription className="mt-1">
                Gestiona y monitorea tu inventario
              </CardDescription>
            </div>
            <Modal
              child={
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50">
                  <Plus size={18} />
                  Agregar Cliente
                </Button>
              }
              title="Añadir un producto"
              description="Agrega un producto al inventario"
            >
              <ProductForm />
            </Modal>
          </div>
        </CardHeader>
        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductTable />
        </Suspense>
      </Card>
    </div>
  );
}
