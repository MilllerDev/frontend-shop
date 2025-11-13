import DataTable from "@/src/shared/components/ui/data-table";
import { getClients } from "../actions/get-clients.action";
import { clientColumns } from "./client-column";

export default async function ClientTable() {
  const clients = await getClients();

  return (
    <DataTable
      columns={clientColumns}
      data={clients}
      searchKey={"name"}
    />
  );
}
