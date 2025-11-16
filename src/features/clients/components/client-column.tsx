"use client";

import { formatDate } from "@/src/lib/utils";
import { Button } from "@/src/shared";
import { Modal } from "@/src/shared/components/ui/modal";
import { Client } from "@/src/shared/types/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2 } from "lucide-react";
import EditClientForn from "./edit-client-form";

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
  {
    accessorKey: "actions",
    header: "Editar",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <Modal
          child={
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit2 size={16} />
            </Button>
          }
          description="Edita los datos del cliente para mantenerlos actualizados"
          title="Edita el cliente "
        >
          <EditClientForn client={client} />
        </Modal>
      );
    },
  },
];
