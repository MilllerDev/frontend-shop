import { getClients } from "@/src/features/clients/actions/get-clients.action";
import ClientTable from "@/src/features/clients/components/client-table";
import { ModalCreateClient } from "@/src/features/clients/components/moda-create-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Suspense } from "react";


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
            <ModalCreateClient />
          </div>
        </CardHeader>
        <CardContent className="border-b pb-6 border-primary/20 flex flex-col gap-4">
          <Suspense fallback={<div>Cargando datos</div>}>
            <ClientTable/>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
