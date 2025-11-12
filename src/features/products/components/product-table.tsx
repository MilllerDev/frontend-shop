import { getAllProducts } from "../actions/get-products.action";
import { columns } from "./columns";
import ProductRenderTable from "./product-render-table";

export default async function ProductoTable() {
  const products = await getAllProducts();

  return <ProductRenderTable columns={columns} data={products} />;
}
