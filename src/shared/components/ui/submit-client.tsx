"use client";

import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { toast } from "sonner";
import { getUser } from "@/src/features/dashboard/actions/get-user.action";

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

export function SubmitForm() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="button"
      className="bg-black"
      onClick={() => {
        toast.promise(
          async () => {
            await getUser();
          },
          {
            loading: "Loading...",
            success: "has been created exitosamente",
            error: "Error",
          }
        );
      }}
    >
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
}
