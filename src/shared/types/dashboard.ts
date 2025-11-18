export interface InventaryStats {
  totalStock:              number;
  totalValue:              number;
  variantsTotal:           number;
  productWithLowestStock:  ProductWithEstStock;
  productWithHighestStock: ProductWithEstStock;
  alerts:                  Alerts;
  topClient: TopClient
}

export interface Alerts {
  lowStack: number;
}

export interface TopClient{
  name: string;
  total: number;
}

export interface ProductWithEstStock {
  title: string;
  stock: number;
}
