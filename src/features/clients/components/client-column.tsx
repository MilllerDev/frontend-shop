"use client";

import { formatDate } from "@/src/lib/utils";
import { Client } from "@/src/shared/types/client";
import { ColumnDef } from "@tanstack/react-table";


export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "isActive",
    header: "Activo",
    cell: ({ row }) => {
      const active = row.original.isActive;
      return <>{active ? "Activo" : "Inactivo"}</>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Unido",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <>{formatDate(date.toString())}</>;
    },
  },
];
