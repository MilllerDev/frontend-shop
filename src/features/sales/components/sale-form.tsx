"use client";

import { useTransition } from "react";
import { createSale } from "../actions/create-sale";
import { toast } from "sonner";
import SelectClients from "@/src/shared/components/ui/select-clients";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Badge, Link, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { ComboClients } from "./combo-clients";
import { Modal } from "@/src/shared/components/ui/modal";
import { Button } from "@/src/shared";
import { CreateClientForm } from "../../clients/components/create-client-form";
import { ProductSelector } from "./product-selector";
import { SaleList } from "./sale-list";

export default function SaleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [pending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createSale(formData);
      onSuccess?.();

      if (result.ok) {
        toast.success("Producto creado");
      } else {
        toast.error("Error al crear producto");
      }
    });
  };

  return (
          <form action={createSale}>
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex flex-row gap-2 items-center">
                <Badge>1</Badge>Seleccionar cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="client">Nombre del cliente</Label>
                <ComboClients />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="new_client">¿Es un nuevo cliente?</Label>
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
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex flex-row gap-2 items-center">
                <Badge>2</Badge>Seleccionar producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <ProductSelector />
                <SaleList />
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/dashboard/sales"
                className="flex-1 border border-gray-100 rounded-md p-2 text-center text-sm font-medium"
              >
                Cancelar
              </Link>
              <Button type="submit" className="flex-1">
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
  );
}
