"use client";

import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { createProduct } from "../actions/create.product";
import { DialogClose, DialogFooter } from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared";
import { UploadImage } from "./image-upload";
import { useTransition } from "react";
import { toast } from "sonner";
import SelectCategories from "@/src/shared/components/ui/select-categories";
import SelectVariants from "@/src/shared/components/ui/select-variants";

export default function ProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const [pending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createProduct(formData);
      onSuccess?.();

      if (result?.ok) {
        toast.success("Producto creado");
      } else {
        toast.error("Error al crear producto");
      }
    });
  };

  return (
    <form action={handleAction}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title">Nombre</Label>
          <Input id="title" name="title" placeholder="Jean sm" />
        </div>
        <div className="grid grid-cols-3 gap-3 items-end">
          <div className="flex flex-col gap-3">
            <Label htmlFor="price">Precio</Label>
            <Input id="price" name="price" placeholder="60" />
          </div>
          <SelectCategories />
        </div>
        <UploadImage />
        <SelectVariants />
      </div>
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? "Guardando..." : "Guardar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
