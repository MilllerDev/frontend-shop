"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/src/shared/components/ui/item";
import { useSaleStore } from "../store/sale.store";
import { Label } from "@/src/shared/components/ui/label";
import { Button } from "@/src/shared";
import { Trash2 } from "lucide-react";

export default function SummarySale() {
  const { items, removeItem } = useSaleStore();

  return items.length < 1 ? (
    <></>
  ) : (
    <>
      <Label className="text-muted-foreground text-sm font-medium">
        Detalle de los productos
      </Label>
      <ItemGroup className="gap-2">
        {items.map((item) => (
          <Item key={item.variantId} variant="muted" role="listitem" size="sm">
            <div className="font-medium flex flex-row items-center gap-4">
              <div className="relative w-18 h-12 shrink-0 overflow-hidden rounded-md shadow-sm">
                <img
                  src={item.imageUrl}
                  className="w-full h-full object-center object-cover "
                  loading="lazy"
                />
              </div>
            </div>
            <ItemContent>
              <ItemTitle className="line-clamp-1 text-sm font-medium">
                {item.name} -{" "}
                <span className="text-muted-foreground">
                  {item.category.name}
                </span>
              </ItemTitle>
              <ItemDescription className="text-xs font-semibold">
                Talla: {item.size} Color: {item.color}
              </ItemDescription>
              <ItemDescription className="text-xs font-semibold">
                Cantidad: {item.quantity}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </>
  );
}
