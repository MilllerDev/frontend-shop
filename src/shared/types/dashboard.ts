export interface InventaryStats {
  totalStock:              number;
  totalValue:              number;
  variantsTotal:           number;
  productWithLowestStock:  ProductWithEstStock;
  productWithHighestStock: ProductWithEstStock;
  alerts:                  Alerts;
}

export interface Alerts {
  lowStack: number;
}

export interface ProductWithEstStock {
  title: string;
  stock: number;
}
