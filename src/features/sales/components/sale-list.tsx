"use client";

import { Button } from "@/src/shared";
import { useSaleStore } from "../store/sale.store";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/src/shared/components/ui/item";
import { Label } from "@radix-ui/react-label";

export function SaleList() {
  const { items, removeItem } = useSaleStore();

  return (
    items.length > 0 && (
      <>
        <Label className="text-muted-foreground text-sm font-medium">
          Detalle de los productos
        </Label>
        <ItemGroup className="gap-2">
          {items.map((item) => (
            <Item key={item.id} variant="muted" role="listitem" size="sm">
              <div className="font-medium flex flex-row items-center gap-4">
                <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-xl shadow-sm">
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-center object-cover "
                    loading="lazy"
                  />
                </div>
              </div>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {item.name} -{" "}
                  <span className="text-muted-foreground">
                    {item.category.name}
                  </span>
                </ItemTitle>
                <ItemDescription>
                  Talla: {item.size} Color: {item.color}
                </ItemDescription>
                <ItemDescription>Cantidad: {item.quantity}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </>
    )
  );
}
