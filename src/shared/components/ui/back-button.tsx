"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

export function BackButton({ text }: { text?: string }) {
  const router = useRouter();

  return (
    <Button onClick={router.back} variant="outline" className="mb-4">
      <ArrowLeft className="w-5 h-5" />
      {text && text}
    </Button>
  );
}

export function CancelFormPage() {
  const router = useRouter();
  return (
    <Button onClick={router.back} variant="outline" className="mb-4">
      Cancelar
    </Button>
  );
}
