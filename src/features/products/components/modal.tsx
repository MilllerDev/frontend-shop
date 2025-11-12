import { Button } from "@/src/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import { Plus } from "lucide-react";
import ProductForm from "./product-form";

export function Modal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus size={18} />
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir un producto</DialogTitle>
          <DialogDescription>
            Agrega un producto al inventario
          </DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
}
