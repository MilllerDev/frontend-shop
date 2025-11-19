import { Skeleton } from "@/src/shared/components/ui/skeleton";
import { Button } from "@/src/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Filter, Search } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { CardContent } from "@/src/shared/components/ui/card";

export default function ClientSkeleton() {
  return (
    <>
      <CardContent className="border-b pb-6 border-primary/20 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              disabled
              placeholder="Cargando..."
              className="pl-10 bg-input border-primary/30 text-muted-foreground"
            />
          </div>
          <Button
            variant="outline"
            disabled
            className="border-primary/30 text-muted-foreground hover:bg-transparent w-full sm:w-auto"
          >
            <Filter size={18} />
            Filtros
          </Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-foreground">Nombre</TableHead>
                <TableHead className="text-foreground">Apellidos</TableHead>
                <TableHead className="text-foreground"> Teléfono</TableHead>
                <TableHead className="text-foreground">Dirección</TableHead>
                <TableHead className="text-foreground">Estado</TableHead>
                <TableHead className="text-foreground">Unido</TableHead>
                <TableHead className="text-foreground">Editar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[...Array(10)].map((_, i) => (
                <TableRow
                  key={i}
                  className="border-b border-border hover:bg-transparent animate-pulse"
                >
                  <TableCell>
                    <Skeleton className="h-4 w-30 opacity-50" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-30 opacity-50" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 opacity-50" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-30 opacity-50" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 opacity-50" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 opacity-50" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-start gap-2 opacity-50">
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </>
  );
}
