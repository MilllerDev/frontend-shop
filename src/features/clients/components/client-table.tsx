import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/src/shared/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import { getClients } from "../actions/get-clients.action";
import { Button } from "@/src/shared";

export default async function ClientTable() {
  const clients = await getClients();

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="text-foreground">Nombre</TableHead>
            <TableHead className="text-foreground">Teléfono</TableHead>
            <TableHead className="text-foreground">Dirección</TableHead>
            <TableHead className="text-foreground">Desde</TableHead>
            {/*<TableHead className="text-foreground">Estado</TableHead>*/}
            <TableHead className="text-right text-foreground">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow
              key={client.id}
              className="border-b border-border hover:bg-accent/5"
            >
              <TableCell className="text-foreground font-medium flex flex-row items-center gap-4">
                {`${client.name} ${client.lastname}`}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {client.phone}
              </TableCell>
              <TableCell className="text-foreground font-semibold">
                {client.direccion}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {client.createdAt.toString()}
              </TableCell>
              {/* <TableCell>
                <Badge
                variant={
                    getStatusVariant(client.status) as
                    | "default"
                    | "secondary"
                    | "destructive"
                    }
                    >
                    {client.status}Miller
                    </Badge>
                    </TableCell> */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
