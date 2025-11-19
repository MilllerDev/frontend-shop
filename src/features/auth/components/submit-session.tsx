"use client";

import { Button } from "@/src/shared";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitSession({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" className="flex-1" disabled={pending}>
      {pending ? (
        <Loader
          size={20}
          className="animate-spin mx-auto text-gray-300"
          style={{ animationDuration: "2s" }}
        />
      ) : (
        children
      )}
    </Button>
  );
}
