import { CreateClientForm } from "@/src/features/clients/components/create-client-form";
import { createSale } from "@/src/features/sales/actions/create-sale.action";
import { ComboClients } from "@/src/shared/components/ui/combo-clients";
import { ProductSelector } from "@/src/features/sales/components/product-selector";
import SummarySale from "@/src/features/sales/components/summary-sale";
import { Button } from "@/src/shared";
import { BackButton } from "@/src/shared/components/ui/back-button";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Label } from "@/src/shared/components/ui/label";
import { Modal } from "@/src/shared/components/ui/modal";
import { Plus } from "lucide-react";

export default function RegisterSalePage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:py-8 px-4 md:px-8">
      <div className="mb-4">
        <BackButton text="Volver a ventas" />
        <p className="">Ingresa los datos para registrar la venta</p>
      </div>
      <form action={createSale}>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-row gap-2 items-center">
                  <Badge>1</Badge>Seleccionar cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <Label htmlFor="client">Nombre del cliente</Label>
                  <ComboClients />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label htmlFor="new_client">¿Es un nuevo cliente?</Label>
                  <Modal
                    child={
                      <Button type="button" variant="outline">
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-row gap-2 items-center">
                  <Badge>2</Badge>Seleccionar producto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <ProductSelector />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="flex flex-row gap-2 items-center">
                <Badge>3</Badge>Resumen de la venta
              </CardTitle>
            </CardHeader>
            <SummarySale />
          </Card>
        </div>
      </form>
    </div>
  );
}
