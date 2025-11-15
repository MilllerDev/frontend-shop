"use client";

import { Button } from "@/src/shared";
import { Product } from "@/src/shared/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Modal } from "../../../shared/components/ui/modal";
import ProductDetail from "./product-detail";

export const productColumns: ColumnDef<Product>[] = [
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
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const product = row.original;
      const totalStock = product.variantProduct?.reduce(
        (acc, v) => acc + parseInt(v.stock),
        0
      );

      return <span className="font-semibold">{totalStock}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const data = row.original;
      const totalStock = data.variantProduct?.reduce(
        (acc, v) => acc + parseInt(v.stock),
        0
      );
      const isActive = data.isActive && totalStock > 0;

      return (
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
              isActive ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
          <span
            className={`font-medium ${
              isActive ? "text-green-700" : "text-red-700"
            }`}
          >
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const data = row.original;
      const router = useRouter();
      const id = data.id;
      return (
        <div className="flex items-center justify-start gap-2">
          <Button
            onClick={() => router.push(`/dashboard/products/${id}`)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Edit2 size={16} />
          </Button>
          <Modal
            title={data.title}
            description={
              data.description ||
              "Aún no hay una descripción, agrégalo al editar"
            }
            child={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Eye size={16} />
              </Button>
            }
          >
            <ProductDetail product={data} />
          </Modal>
        </div>
      );
    },
  },
];
