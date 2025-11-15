import DataTable from "@/src/shared/components/ui/data-table";
import { getSales } from "../actions/get-sales.action";
import { saleColumns } from "./sale-column";

export default async function SaleTable() {
  const sales = await getSales();
  return <DataTable columns={saleColumns} data={sales} searchKey="client" />;
}
