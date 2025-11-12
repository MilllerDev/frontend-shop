import ClientTable from "@/src/features/clients/components/client-table";
import { Button } from "@/src/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:pt-8 px-4 md:px-8">
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">Clientes</CardTitle>
              <CardDescription className="mt-1">
                Gestiona y monitorea a tus clientes
              </CardDescription>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50">
              <Plus size={18} />
              Añadir cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent className="border-b pb-6 border-primary/20 flex flex-col gap-4">
          <Suspense fallback={<div>Cargando datos</div>}>
            <ClientTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
