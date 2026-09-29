export interface ProductProps {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  minOrderQuantity: number;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    if (props.price <= 0) throw new Error("El precio debe ser mayor a 0.");
    if (props.stock < 0) throw new Error("El stock no puede ser negativo.");
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get sku(): string { return this.props.sku; }
  get price(): number { return this.props.price; }
  get stock(): number { return this.props.stock; }
  get minOrderQuantity(): number { return this.props.minOrderQuantity; }

  hasSufficientStock(quantity: number): boolean {
    return this.props.stock >= quantity;
  }

  reduceStock(quantity: number): void {
    if (!this.hasSufficientStock(quantity)) {
      throw new Error(`Stock insuficiente para el producto ${this.props.name}`);
    }
    this.props.stock -= quantity;
  }
}