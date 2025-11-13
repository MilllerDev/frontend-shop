import { getProductById } from "@/src/features/products/actions/get-products.action";
import { updateProduct } from "@/src/features/products/actions/update-product";
import { ChangeImage } from "@/src/features/products/components/image-upload";
import SelectCategories from "@/src/features/products/components/select-categories";
import SelectVariants from "@/src/features/products/components/select-variants";
import { Button } from "@/src/shared";
import { BackButton } from "@/src/shared/components/ui/back-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  const { variantProduct } = product;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <BackButton text="Volver a Productos" />
        <p className="text-gray-600">Actualiza los detalles del producto</p>
      </div>

      <form action={updateProduct} className="space-y-6">
        <input type="hidden" name="id" value={product.id} />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <ChangeImage defaultImg={product.imageUrl} />
          </div>

          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Nombre</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={product.title}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <textarea
                      rows={2}
                      id="description"
                      name="description"
                      defaultValue={product.description || ""}
                      className="text-sm resize-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={product.price}
                      />
                    </div>
                    <SelectCategories defaultId={product.category.id} />
                  </div>
                  <SelectVariants defaultVariants={variantProduct} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-row gap-4">
                <Link
                  href="/dashboard/products"
                  className="flex-1 border border-gray-100 rounded-md p-2 text-center text-sm font-medium"
                >
                  Cancelar
                </Link>
                <Button type="submit" className="flex-1">
                  Guardar Cambios
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
