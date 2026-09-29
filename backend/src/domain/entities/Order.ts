export interface OrderItem {
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderProps {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
}

export class Order {
  private props: OrderProps;

  constructor(props: OrderProps) {
    if (!props.items || props.items.length === 0) {
      throw new Error(" Un pedido debe incluir al menos un producto.");
    }
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get customerId(): string { return this.props.customerId; }
  get items(): OrderItem[] { return this.props.items; }
  get status(): string { return this.props.status; }

  // Subtotal de la orden sin descuentos ni impuestos
  calculateSubtotal(): number {
    return this.props.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }

  // Regla B2B: Descuento del 10% si el subtotal supera los $1,000 o si compra más de 50 items en total
  calculateDiscount(): number {
    const subtotal = this.calculateSubtotal();
    const totalItems = this.props.items.reduce((acc, item) => acc + item.quantity, 0);

    if (subtotal >= 1000 || totalItems >= 50) {
      return subtotal * 0.10; // 10% de descuento
    }
    return 0;
  }

  // Cálculo de impuesto (ejemplo 7%)
  calculateTax(): number {
    const taxableAmount = this.calculateSubtotal() - this.calculateDiscount();
    return taxableAmount * 0.07;
  }

  // Total final calculado dinámicamente
  calculateTotal(): number {
    return this.calculateSubtotal() - this.calculateDiscount() + this.calculateTax();
  }
}