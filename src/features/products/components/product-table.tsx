import DataTable from "@/src/shared/components/ui/data-table";
import { getAllProducts } from "../actions/get-products.action";
import { columns } from "./columns";

export default async function ProductoTable() {
  const products = await getAllProducts();

  return <DataTable columns={columns} data={products} searchKey={"title"} />;
}
