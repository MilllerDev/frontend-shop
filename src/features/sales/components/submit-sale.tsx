"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useSaleStore } from "@/src/features/sales/store/sale.store";
import { Button } from "@/src/shared";

export function SumbitSale() {
  const router = useRouter();
  const { pending } = useFormStatus();
  const { clear } = useSaleStore();

  useEffect(() => {
    if (pending) {
      clear();
    }
  }, [pending]);

  return (
    <div className="flex flex-row gap-4 w-full">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex-1"
        onClick={() => {
          clear();
          router.back();
        }}
      >
        Cancelar
      </Button>
      <Button type="submit" size="sm" className="flex-1">
        {pending ? "Guardando ..." : "Guardar"}
      </Button>
    </div>
  );
}
