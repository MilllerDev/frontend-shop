"use client";

import { Loader } from "lucide-react";
import { ReactNode, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { createSale } from "@/src/features/sales/actions/create-sale.action";
import { toast } from "sonner";
import { useSaleStore } from "@/src/features/sales/store/sale.store";

export function Submit({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 cursor-pointer disabled:opacity-70"
    >
      {pending ? (
        <Loader
          size={20}
          className="animate-spin mx-auto text-gray-300"
          style={{ animationDuration: "2s" }}
        />
      ) : (
        children
      )}
    </button>
  );
}

export function SumbitSale() {
  const router = useRouter();
  const { pending } = useFormStatus();
  const { clear } = useSaleStore();

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
