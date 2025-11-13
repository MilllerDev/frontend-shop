"use client"

import { Button } from "@/src/shared"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/components/ui/dialog"
import { Plus } from "lucide-react"
import { CreateClientForm } from "./create-client-form"
import { useState } from "react"

export const ModalCreateClient = () => {
  
  const [open,setIsOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto shadow-lg shadow-accent/50">
          <Plus size={18} />
          Agregar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Añadir un cliente</DialogTitle>
          <DialogDescription>
            Agrega un cliente y da seguimiento a sus pedidos
          </DialogDescription>
        </DialogHeader>
        
        <CreateClientForm onSuccess={()=> setIsOpen(false)}/>


      </DialogContent>
    </Dialog>
  )
}
