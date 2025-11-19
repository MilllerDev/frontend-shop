import { getClients } from "@/src/features/clients/actions/get-clients.action";
import ClientTable from "@/src/features/clients/components/client-table";
import { CreateClientForm } from "@/src/features/clients/components/create-client-form";
import { Modal } from "@/src/shared/components/ui/modal";
import { Button } from "@/src/shared";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import ClientSkeleton from "@/src/features/clients/components/skeleton";

export default async function ClientPage() {
  const data = await getClients();

  console.log(data);
  return (
    <div className="min-h-screen bg-background pt-20 md:pt-8 px-4 md:px-8">
      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-primary">
                Mantinimiento de Clientes
              </CardTitle>
              <CardDescription className="mt-1">
                Gestiona y monitorea a tus clientes
              </CardDescription>
            </div>
            <Modal
              child={
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50">
                  <Plus size={18} />
                  Agregar Cliente
                </Button>
              }
              title="Añadir un cliente"
              description="Agrega un cliente y da seguimiento a sus pedidos"
            >
              <CreateClientForm />
            </Modal>
          </div>
        </CardHeader>
        <Suspense fallback={<ClientSkeleton />}>
          <ClientTable />
        </Suspense>
      </Card>
    </div>
  );
}
