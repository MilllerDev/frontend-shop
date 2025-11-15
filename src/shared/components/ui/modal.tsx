"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import { cloneElement, isValidElement, ReactNode, useState } from "react";

interface ModalProps {
  child: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export function Modal({ child, title, description, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  // Si el children es un componente React, le pasamos onSuccess
  const enhancedChildren = isValidElement(children)
    ? cloneElement(children as any, {
        onSuccess: () => setOpen(false), // se cierra el modal
      })
    : children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {enhancedChildren}
      </DialogContent>
    </Dialog>
  );
}
