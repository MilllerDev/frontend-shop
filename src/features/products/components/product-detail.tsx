import { Product } from "@/src/shared/types/product";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="space-y-">
      <div className="grid grid-cols-2 gap-4">
        <div className="size-40 overflow-hidden rounded-xl border border-border shadow-sm">
          <img
            src={product.imageUrl}
            alt={`Imagen de ${product.title}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <div className="flex flex-row gap-4 items-center border-b border-gray-200 pb-2">
            <label className="text-sm font-semibold text-foreground">
              Precio
            </label>
            <p className="text-base text-muted-foreground font-medium">
              S/ {product.price}
            </p>
          </div>
          <div className="flex flex-row gap-4 items-center border-b border-gray-200 py-2">
            <label className="text-sm font-semibold text-foreground">
              Estado
            </label>
            <div className="text-sm flex items-center">
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
                  product.isActive ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
              <span
                className={`font-medium ${
                  product.isActive ? "text-green-700" : "text-red-700"
                }`}
              >
                {product.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center border-b border-gray-200 py-2">
            <label className="text-sm font-semibold text-foreground">
              Categoría
            </label>
            <p className="text-muted-foreground text-base font-medium">
              {product.category.name}
            </p>
          </div>
          <div className="flex flex-row gap-4 items-center border-b border-gray-200 py-2">
            <label className="text-sm font-semibold text-foreground">
              Stock Total
            </label>
            <p className="text-muted-foreground font-medium text-base">
              {product.variantProduct.reduce(
                (acc, v) => acc + parseInt(v.stock),
                0
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold text-gray-600">Variantes</label>
        {product.variantProduct.length > 0 ? (
          product.variantProduct.map((variant) => (
            <div
              key={variant.id}
              className="py-2 rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Color:</span>
                  <span className="text-sm font-medium text-foreground">
                    {variant.color}
                  </span>
                  <span className="text-sm text-muted-foreground ml-4">
                    Talla:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {variant.sizes}
                  </span>
                </div>
              </div>
              <div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {variant.stock} unidades
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary-foreground text-sm text-center">
            No hay variantes de este producto
          </p>
        )}
      </div>
    </div>
  );
}
