"use client";

import { Button } from "@/src/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Edit2, Filter, Search, Trash2 } from "lucide-react";
import { Product } from "@/src/shared/types/product";
import { Input } from "@/src/shared/components/ui/input";
import { useMemo, useState } from "react";

export default function ProductRenderTable({
  products,
}: {
  products: Product[];
}) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;

    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }, [query, products]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="pl-10 bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50"
          />
        </div>
        <Button
          variant="outline"
          className="border-primary/30 text-foreground hover:bg-primary/10 bg-transparent w-full sm:w-auto"
        >
          <Filter size={18} />
          Filtros
        </Button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-foreground">Producto</TableHead>
              <TableHead className="text-foreground">SKU</TableHead>
              <TableHead className="text-foreground">Precio</TableHead>
              <TableHead className="text-foreground">Categoría</TableHead>
              {/*<TableHead className="text-foreground">Estado</TableHead>*/}
              <TableHead className="text-left text-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="border-b border-border hover:bg-accent/5"
              >
                <TableCell className="text-foreground font-medium flex flex-row items-center gap-4">
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
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.sku}
                </TableCell>
                <TableCell className="text-foreground font-semibold">
                  {product.price}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.category.name}
                </TableCell>
                {/* <TableCell>
                <Badge
                variant={
                    getStatusVariant(product.status) as
                    | "default"
                    | "secondary"
                    | "destructive"
                    }
                    >
                    {product.status}Miller
                    </Badge>
                    </TableCell> */}
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
