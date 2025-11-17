"use client";

import { useState, useEffect } from "react";
import ComboProducts from "./combo-products";
import { ComboBox } from "./combo-box";
import { Button } from "@/src/shared";
import { useSaleStore } from "@/src/features/sales/store/sale.store";
import { getProductById } from "../../products/actions/get-products.action";
import { Product } from "@/src/shared/types/product";
import { VariantProduct } from "@/src/shared/types/variant";
import { Minus, Plus } from "lucide-react";
import { Label } from "@/src/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { salePayload } from "@/src/lib/utils";

export function ProductSelector() {
  const { addItem, items } = useSaleStore();
  const payload = salePayload(items);

  const [productId, setProductId] = useState("");
  const [productInfo, setProductInfo] = useState<Product>();
  const [variants, setVariants] = useState<VariantProduct[]>([]);
  const [variantId, setVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function load() {
      if (!productId) return;
      const products = await getProductById(productId);
      setProductInfo(products);
      setVariants(products.variantProduct);
    }
    load();
  }, [productId]);

  const variantStock = variants.find((v) => v.id === variantId)?.stock ?? "0";
  const handleAdd = () => {
    const variant = variants.find((v) => v.id === variantId);
    if (!variant) return;
    if (productInfo) {
      addItem({
        id: productId,
        category: productInfo.category,
        sku: productInfo.sku,
        name: productInfo.title,
        imageUrl: productInfo.imageUrl,
        variantId: variant.id,
        color: variant.color,
        size: variant.sizes,
        stock: variant.stock,
        quantity,
        price: productInfo.price,
      });
    }
    setVariantId("");
    setQuantity(1);
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
      <div className="grid grid-cols-2 gap-4">
        <Label className="col-span-2">Elije el producto y su variante</Label>
        <ComboProducts onSelect={setProductId} />
        <ComboBox
          disabled={!productId && variants.length < 1}
          id="variant"
          options={variants.map((v) => ({
            value: v.id,
            label: `${v.color} - ${v.sizes} (stock: ${v.stock})`,
          }))}
          placeholder="Selecciona variante"
          onSelect={setVariantId}
        />
        <SelectStatus />
        <div className="flex flex-col gap-2">
          {variantId && <Label className="">Cantidad del producto</Label>}
          <div className="flex flex-row justify-between">
            {variantId && (
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus />
                </Button>
                <span>{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(prev + 1, Number(variantStock))
                    )
                  }
                >
                  <Plus />
                </Button>
              </div>
            )}
            {variantId && (
              <Button type="button" onClick={handleAdd}>
                Añadir
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SelectStatus() {
  const status = [
    { value: "completado", label: "Completado" },
    { value: "cancelado", label: "Cancelado" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="status">Estado de la compra</Label>
      <Select name="status" defaultValue="completado">
        <SelectTrigger className="w-full">
          <SelectValue defaultValue={"compleado"} />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-background">
          <SelectGroup>
            <SelectLabel>Estado</SelectLabel>
            {status.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
