"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { Label } from "@/src/shared/components/ui/label";
import { useEffect, useState } from "react";
import { Category } from "@/src/shared/types/product";
import { getCategories } from "@/src/features/products/actions/create.product";

type SelectyProps = {
  defaultId?: string;
};

export default function SelectCategories({ defaultId }: SelectyProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="category">Categoria</Label>
      <Select name="category" defaultValue={defaultId}>
        <SelectTrigger className="col-span-1">
          <SelectValue placeholder="Seleciona una categoria" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-background">
          <SelectGroup>
            <SelectLabel>Categorias</SelectLabel>
            {categories.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
