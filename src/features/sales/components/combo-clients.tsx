import { getClients } from "@/src/features/clients/actions/get-clients.action";
import { ComboBox } from "./combo-box";

export async function ComboClients() {
  const clients = await getClients();
  const clientsFormatted = clients.map((client) => ({
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
