"use client";

import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Client } from "@/src/shared/types/client";
import { updateClient } from "../actions/update-client.action";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/src/shared";
import { DialogClose, DialogFooter } from "@/src/shared/components/ui/dialog";

interface EditClientProps {
  client: Client;
  onSuccess?: () => void;
}

export default function EditClientForn({ client, onSuccess }: EditClientProps) {
  const [pending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateClient(formData);
      onSuccess?.();

      if (result?.ok) {
        toast.success("Cliente actualizado");
      } else {
        toast.error("Error al actualizar cliente");
      }
    });
  };

  return (
    <form action={handleAction}>
      <div className="grid gap-4">
        <Input hidden name="id" defaultValue={client.id} />
        <div className="grid gap-3">
          <Label htmlFor="name">Nombre:</Label>
          <Input id="name" name="name" defaultValue={client.name} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="titlastnamele">Apellidos:</Label>
          <Input id="lastname" name="lastname" defaultValue={client.lastname} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone:</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={client.phone}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="direccion">Direccion:</Label>
          <Input
            id="direccion"
            name="direccion"
            defaultValue={client.direccion}
          />
        </div>
      </div>
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? "Actulizando..." : "Actualizar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
