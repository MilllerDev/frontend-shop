"use client"

import { Button } from "@/src/shared"
import { Badge } from "@/src/shared/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/components/ui/table"
import { Edit2, Trash2 } from "lucide-react"




const products = [
  { id: 1, name: "Laptop Pro", sku: "LP-001", stock: 45, price: "$1,299", category: "Electrónica", status: "En Stock" },
  {
    id: 2,
    name: "Mouse Inalámbrico",
    sku: "MW-002",
    stock: 128,
    price: "$29.99",
    category: "Accesorios",
    status: "En Stock",
  },
  {
    id: 3,
    name: "Teclado Mecánico",
    sku: "KM-003",
    stock: 8,
    price: "$129",
    category: "Accesorios",
    status: "Bajo Stock",
  },
  { id: 4, name: "Monitor 4K", sku: "MN-004", stock: 15, price: "$499", category: "Electrónica", status: "En Stock" },
  { id: 5, name: "Cable HDMI", sku: "CB-005", stock: 0, price: "$9.99", category: "Cables", status: "Agotado" },
]

export default function ProductTable() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "En Stock":
        return "default"
      case "Bajo Stock":
        return "secondary"
      case "Agotado":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="text-foreground">Producto</TableHead>
            <TableHead className="text-foreground">SKU</TableHead>
            <TableHead className="text-foreground">Stock</TableHead>
            <TableHead className="text-foreground">Precio</TableHead>
            <TableHead className="text-foreground">Categoría</TableHead>
            <TableHead className="text-foreground">Estado</TableHead>
            <TableHead className="text-right text-foreground">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-b border-border hover:bg-accent/5">
              <TableCell className="text-foreground font-medium">{product.name}</TableCell>
              <TableCell className="text-muted-foreground">{product.sku}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {product.stock} unidades
                </Badge>
              </TableCell>
              <TableCell className="text-foreground font-semibold">{product.price}</TableCell>
              <TableCell className="text-muted-foreground">{product.category}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(product.status) as "default" | "secondary" | "destructive"}>
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
