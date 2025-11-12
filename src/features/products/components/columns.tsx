"use client";

import { Button } from "@/src/shared";
import { Product } from "@/src/shared/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Producto",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="font-medium flex flex-row items-center gap-4">
          {product.imageUrl && (
            <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-xl shadow-sm">
              <img
                src={product.imageUrl}
                className="w-full h-full object-center object-cover "
                loading="lazy"
              />
            </div>
          )}
          {product.title}
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const category = row.original.category.name;
      return <>{category}</>;
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      );
    },
  },
];
