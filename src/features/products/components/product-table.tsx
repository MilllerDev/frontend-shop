import { getAllProducts } from "../actions/get-products.action";
import ProductRenderTable from "./product-render-table";

export default async function ProductoTable({ query }: { query?: string }) {
  const products = await getAllProducts(query);

  return <ProductRenderTable products={products} />;
}
