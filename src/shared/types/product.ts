export interface Product {
  id: string;
  title: string;
  description: null;
  sku: string;
  price: string;
  imageUrl: string;
  publicUrl: string;
  isActive: boolean;
  category: Category;
  variantProduct: VariantProduct[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface VariantProduct {
  id: string;
  sizes: string;
  color: string;
  stock: string;
  createdAt: Date;
  updatedAt: Date;
}
