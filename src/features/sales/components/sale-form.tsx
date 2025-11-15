"use client";

import { useTransition } from "react";
import { createSale } from "../actions/create-sale";
import { toast } from "sonner";
import SelectClients from "@/src/shared/components/ui/select-clients";

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
    <form action={handleAction} className="space-y-4">
      <p>Formulario</p>
      <SelectClients />
    </form>
  );
}
