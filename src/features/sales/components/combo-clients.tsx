"use client";

import { getClients } from "@/src/features/clients/actions/get-clients.action";
import { ComboBox } from "./combo-box";
import { useEffect, useState } from "react";
import { Client } from "@/src/shared/types/client";

export function ComboClients() {
  const [client, setClient] = useState<Client[]>([]);
  useEffect(() => {
    async function load() {
      const clients = await getClients();
      setClient(clients);
    }

    load();
  }, []);

  const clientsFormatted = client.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  return (
    <ComboBox
      id="client"
      options={clientsFormatted}
      placeholder="Selecciona un cliente"
    />
  );
}
