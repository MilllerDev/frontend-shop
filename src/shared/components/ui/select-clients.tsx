"use client";

import { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { getClients } from "@/src/features/clients/actions/get-clients.action";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

export default function SelectClients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function loadClients() {
      const data = await getClients();
      setClients(data);
    }
    loadClients();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="client">Cliente</Label>
      <Select name="client">
        <SelectTrigger className="col-span-1">
          <SelectValue placeholder="Seleciona un cliente" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-background">
          <SelectGroup>
            <SelectLabel>Clientes</SelectLabel>
            {clients.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
