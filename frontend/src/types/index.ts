export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  minOrderQuantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  customerId: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: string;
}