import { Sale } from "@/src/shared/types/sale";

export default function SaleDetail({ sale }: { sale: Sale }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-4 items-center border-b border-gray-200 pb-2">
        <label className="text-sm font-semibold text-gray-600">
          Nombre del cliente
        </label>
        <p className="text-base text-foreground font-medium">
          {sale.client.name}
        </p>
      </div>
      <div className="flex flex-row gap-4 items-center border-b border-gray-200 pb-2">
        <label className="text-sm font-semibold text-gray-600">
          Número de la orden
        </label>
        <p className="text-base text-foreground font-medium">
          {sale.id.substring(0, 15).toUpperCase()}
        </p>
      </div>
      <div className="flex flex-row gap-4 items-center border-b border-gray-200 pb-2">
        <label className="text-sm font-semibold text-gray-600">
          Estado de la compra
        </label>
        <p className="text-base text-foreground font-medium">
          {sale.status.toString()}
        </p>
      </div>
      <div className="mt-6 border-b border-gray-200 pb-4">
        <div className="flex flex-row justify-between">
          <label className="text-sm font-semibold text-gray-600">
            {sale.details.length > 1
              ? "Detalles de la venta"
              : "Detalle de la venta"}
          </label>
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
