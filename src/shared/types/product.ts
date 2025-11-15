import { VariantProduct } from "./variant";

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


