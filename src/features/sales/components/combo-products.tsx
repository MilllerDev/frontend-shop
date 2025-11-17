"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "../../products/actions/get-products.action";
import { ComboBox } from "./combo-box";
import { Product } from "@/src/shared/types/product";

export default function ComboProducts({
  onSelect,
}: {
  onSelect: (select: string) => void;
}) {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function load() {
      const products = await getAllProducts();
      setProduct(products);
    }
    load();
  }, []);

  const productsFormatted = product.map((p) => ({
    value: p.id,
    label: `${p.title} -  S/${p.price}`,
  }));
  return (
    <ComboBox
      options={productsFormatted}
      placeholder="Busca el producto"
      onSelect={onSelect}
    />
  );
}
