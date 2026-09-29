export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerId: string;
  items: CreateOrderItemInput[];
}

export interface OrderOutput {
  id: string;
  customerId: string;
  items: {
    productId: string;
    unitPrice: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: string;
  createdAt: Date;
}