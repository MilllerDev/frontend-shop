import DataTable from "@/src/shared/components/ui/data-table";
import { getAllProducts } from "../actions/get-products.action";
import { productColumns } from "./product-column";

export default async function ProductoTable() {
  const products = await getAllProducts();

  return (
    <DataTable columns={productColumns} data={products} searchKey={"title"} />
  );
}
