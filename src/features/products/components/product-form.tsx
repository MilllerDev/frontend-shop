import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { createProduct } from "../actions/create.product";
import SelectCategories from "./select-categories";
import { DialogClose, DialogFooter } from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared";
import { VariantProduct } from "@/src/shared/types/product";
import SelectVariants from "./select-variants";
import ImageUploadPreview from "./image-upload";

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
        {/*         <div className="grid gap-3">
        </div> */}
        {/*         <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="image">Imágen</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
          />
        </div> */}
        <ImageUploadPreview />
        <SelectVariants />
      </div>
      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Guardar</Button>
      </DialogFooter>
    </form>
  );
}
