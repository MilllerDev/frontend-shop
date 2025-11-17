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

export function ProductSelector() {
  const { addItem } = useSaleStore();

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

  const handleAdd = () => {
    const variant = variants.find((v) => v.id === variantId);
    if (!variant) return;
    if (productInfo) {
      addItem({
        id: `${productId}-${variantId}`,
        productId,
        productName: productInfo.title,
        variantId,
        color: variant.color,
        size: variant.sizes,
        stock: variant.stock,
        quantity,
        price: productInfo.price,
      });
    }

    setProductId("");
    setVariantId("");
    setQuantity(1);
  };

  return (
    <div className="space-y-4">
      <ComboProducts onSelect={setProductId} />

      {productId && variants.length > 0 && (
        <ComboBox
          id="variant"
          options={variants.map((v) => ({
            value: v.id,
            label: `${v.color} - ${v.sizes} (stock: ${v.stock})`,
          }))}
          placeholder="Selecciona variante"
          onSelect={setVariantId}
        />
      )}
      <div className="flex flex-row justify-between">
        {variantId && (
          <div className="flex items-center gap-3">
            <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus />
            </Button>
            <span>{quantity}</span>
            <Button onClick={() => setQuantity(quantity + 1)}>
              <Plus />
            </Button>
          </div>
        )}

        {variantId && <Button onClick={handleAdd}>Añadir</Button>}
      </div>
    </div>
  );
}

export function SaleItemsList() {
  const items = useSaleStore((s) => s.items);
  const remove = useSaleStore((s) => s.removeItem);

  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-3 border rounded"
        >
          <div>
            <p className="font-bold">{item.productName}</p>
            <p>
              {item.color} - {item.size}
            </p>
            <p>Cantidad: {item.quantity}</p>
          </div>

          <Button onClick={() => remove(item.id)}>Eliminar</Button>
        </div>
      ))}
    </div>
  );
}
