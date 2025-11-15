"use client";

import { formatDate } from "@/src/lib/utils";
import { Sale } from "@/src/shared/types/sale";
import { ColumnDef } from "@tanstack/react-table";

export const saleColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "client",
    header: "Cliente",
    accessorFn: (row) => row.client.name,
    cell: ({ row }) => {
      const client = row.original.client;
      return <>{`${client.name} ${client.lastname}`}</>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "saleDate",
    header: "Fecha de Venta",
    cell: ({ row }) => {
      const data = row.original.saleDate;
      return <>{formatDate(data.toString())}</>;
    },
  },
];
