"use client";

import { formatDate } from "@/src/lib/utils";
import { Client } from "@/src/shared/types/client";
import { ColumnDef } from "@tanstack/react-table";

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  { accessorKey: "lastname", header: "Apellidos" },
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
    header: "Estado",
    cell: ({ row }) => {
      const client = row.original;
      const isActive = client.isActive;

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
    accessorKey: "createdAt",
    header: "Unido",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <>{formatDate(date.toString())}</>;
    },
  },
];
