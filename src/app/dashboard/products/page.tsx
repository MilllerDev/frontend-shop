import ProductTable from "@/src/features/products/components/product-table";
import { Button } from "@/src/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Plus } from "lucide-react";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query } = await searchParams;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Stock":
        return "bg-purple-600 text-white";
      case "Stock Bajo":
        return "bg-yellow-100 text-yellow-700";
      case "Agotado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-8 px-4 md:px-8">
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">Productos</CardTitle>
              <CardDescription className="mt-1">
                Gestiona y monitorea tu inventario
              </CardDescription>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50">
              <Plus size={18} />
              Agregar Producto
            </Button>
          </div>
        </CardHeader>

        <CardContent className="border-b pb-6 border-primary/20 flex flex-col gap-4">
          <ProductTable query={query} />
        </CardContent>
      </Card>
    </div>
  );
}
