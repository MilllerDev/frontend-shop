"use client";

import { Button } from "@/src/shared";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { VariantProduct } from "@/src/shared/types/product";
import { useEffect, useState } from "react";

interface SelectVariantsProps {
  defaultVariants?: VariantProduct[];
}

export default function SelectVariants({
  defaultVariants = [],
}: SelectVariantsProps) {
  const [variants, setVariants] = useState<
    Omit<VariantProduct, "id" | "createdAt" | "updatedAt">[]
  >(
    defaultVariants.map((v) => ({
      sizes: v.sizes,
      color: v.color,
      stock: v.stock,
    }))
  );

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>(
      "input[name='variants']"
    );
    if (input) input.value = JSON.stringify(variants);
  }, [variants]);

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
    <div className="grid gap-2">
      <Label>Variantes</Label>
      <input type="hidden" name="variants" />
      <div className="flex flex-col gap-2">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="flex flex-row gap-3 items-center border p-3 rounded-xl"
          >
            <Input
              placeholder="Talla"
              value={variant.sizes}
              onChange={(e) => updateVariant(index, "sizes", e.target.value)}
            />
            <Input
              placeholder="Color"
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
