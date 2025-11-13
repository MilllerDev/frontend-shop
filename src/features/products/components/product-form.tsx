import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { createProduct } from "../actions/create.product";
import SelectCategories from "./select-categories";
import { DialogClose, DialogFooter } from "@/src/shared/components/ui/dialog";
import { Button, Submit } from "@/src/shared";
import SelectVariants from "./select-variants";
import { UploadImage } from "./image-upload";

export default function ProductForm() {
  return (
    <form action={createProduct}>
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
        <Submit>Guardar</Submit>
      </DialogFooter>
    </form>
  );
}
