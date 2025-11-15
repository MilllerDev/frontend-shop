import { Sale } from "@/src/shared/types/sale";

export default function SaleDetail({ sale }: { sale: Sale }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-4 items-center border-b border-gray-200 pb-2">
        <label className="text-sm font-semibold text-gray-600">
          Número de orden
        </label>
        <p className="text-base text-foreground font-medium">
          {sale.id.substring(0, 15).toUpperCase()}
        </p>
      </div>
      <div className="mt-6 border-b border-gray-200 pb-4">
        <div className="flex flex-row justify-between">
          <label className="text-sm font-semibold text-gray-600">
            {sale.details.length > 1
              ? "Detalles de la venta"
              : "Detalle de la venta"}
          </label>{" "}
          <div className="text-sm flex items-center">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
                sale.isActive ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  sale.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
            <span
              className={`font-medium ${
                sale.isActive ? "text-green-700" : "text-red-700"
              }`}
            >
              {sale.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
        {sale.details.map((detail) => (
          <div key={detail.id} className="mt-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <p className="font-medium text-foreground text-sm">
                  {detail.productTitle}
                </p>
                <div className="flex-1 flex flex-row gap-2 font-medium">
                  <p className="text-sm text-gray-600">
                    Cantidad: {detail.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Talla: {detail.variantSizes}
                  </p>
                  <p className="text-sm text-gray-600">
                    Color: {detail.variantColor}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-secondary-foreground text-sm">
                  S/{detail.unitPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-between">
        <label className="text-sm font-semibold text-gray-600">Total</label>
        <p className="text-base text-foreground font-medium">S/{sale.total}</p>
      </div>
    </div>
  );
}
