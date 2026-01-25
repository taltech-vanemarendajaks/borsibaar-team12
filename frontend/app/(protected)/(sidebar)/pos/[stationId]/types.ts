export interface Product {
  id: number;
  organizationId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  basePrice: number;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  organizationId: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  maxQuantity: number;
  unitPrice: number;
}

export interface CurrentUser {
  id: number | string;
  email: string;
  name?: string;
  organizationId?: number;
  needsOnboarding: boolean;
  role?: string;
}

export interface BarStation {
  id: number;
  organizationId: number;
  name: string;
  description?: string;
  isActive: boolean;
}
