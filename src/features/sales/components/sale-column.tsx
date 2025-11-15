"use client";

import { formatDate } from "@/src/lib/utils";
import { Button } from "@/src/shared";
import { Modal } from "@/src/shared/components/ui/modal";
import { Sale } from "@/src/shared/types/sale";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import SaleDetail from "./sale.datail";

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
  {
    accessorKey: "actions",
    header: "Ver Detalles",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center justify-start gap-2">
          <Modal
            title={"Detalle de la venta"}
            description={`Pedido realizado por ${
              data.client.name
            } el ${formatDate(data.createdAt.toString())}`}
            child={
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye size={16} />
              </Button>
            }
          >
            <SaleDetail sale={data} />
          </Modal>
        </div>
      );
    },
  },
];
