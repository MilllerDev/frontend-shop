"use client";

import { Button } from "@/src/shared";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { VariantProduct } from "@/src/shared/types/product";
import { useState } from "react";

export default function SelectVariants() {
  const [variants, setVariants] = useState<
    Omit<VariantProduct, "id" | "createdAt" | "updatedAt">[]
  >([]);

  const addVariant = () => {
    setVariants([...variants, { sizes: "", color: "", stock: "" }]);
  };

  const updateVariant = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...variants];
    (updated[index] as any)[field] = value;
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="grid gap-3">
      <Label>Variantes</Label>
      <div className="flex flex-col gap-3">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="flex flex-row gap-3 items-center border p-3 rounded-xl"
          >
            <Input
              placeholder="Talla (ej. 30)"
              value={variant.sizes}
              onChange={(e) => updateVariant(index, "sizes", e.target.value)}
            />
            <Input
              placeholder="Color (ej. Negro)"
              value={variant.color}
              onChange={(e) => updateVariant(index, "color", e.target.value)}
            />
            <Input
              placeholder="Stock"
              type="number"
              value={variant.stock}
              onChange={(e) =>
                updateVariant(index, "stock", Number(e.target.value))
              }
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => removeVariant(index)}
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addVariant}>
          + Agregar variante
        </Button>
      </div>
    </div>
  );
}
