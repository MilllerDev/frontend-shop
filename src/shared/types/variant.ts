export interface VariantProduct {
  id: string;
  sizes: string;
  color: string;
  stock: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateVariant {
  id?: string;
  sizes: string;
  color: string;
  stock: string;
}
