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
import { Button, SumbitSale } from "@/src/shared";
import { Trash2 } from "lucide-react";
import { CardContent, CardFooter } from "@/src/shared/components/ui/card";

export default function SummarySale() {
  const { items, removeItem } = useSaleStore();

  return items.length < 1 ? (
    <CardContent>
      <p className="text-center text-sm to-muted font-medium">
        No hay información para mostrar
      </p>
    </CardContent>
  ) : (
    <>
      <CardContent>
        <Label className="text-muted-foreground text-sm font-medium">
          Detalle de los productos
        </Label>
        <ItemGroup className="gap-1 mt-2">
          {items.map(({ product, variant, quantity }) => (
            <Item key={variant.id} variant="muted" role="listitem" size="sm">
              <div className="font-medium flex flex-row items-center gap-4">
                <div className="relative w-18 h-12 shrink-0 overflow-hidden rounded-md shadow-sm">
                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-center object-cover "
                    loading="lazy"
                  />
                </div>
              </div>
              <ItemContent>
                <ItemTitle className="line-clamp-1 text-sm font-medium">
                  {product.title} -{" "}
                  <span className="text-muted-foreground">
                    {product.category.name}
                  </span>
                </ItemTitle>
                <ItemDescription className="text-xs font-semibold">
                  Talla: {variant.sizes} Color: {variant.color}
                </ItemDescription>
                <ItemDescription className="text-xs font-semibold">
                  Cantidad: {quantity}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => removeItem(variant.id)}
                >
                  <Trash2 />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
      <CardFooter>
        <SumbitSale />
      </CardFooter>
    </>
  );
}
