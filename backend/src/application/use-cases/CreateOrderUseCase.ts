import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { CreateOrderInput, OrderOutput } from "../dtos/CreateOrderDTO";

export class CreateOrderUseCase {
  // Inyección de dependencias a través del constructor
  constructor(
    private productRepo: IProductRepository,
    private orderRepo: IOrderRepository
  ) {}

  async execute(input: CreateOrderInput): Promise<OrderOutput> {
    if (!input.items || input.items.length === 0) {
      throw new Error("El pedido debe contener al menos un producto.");
    }

    const orderItems = [];

    // 1. Validar productos, mínimo de compra y stock disponible
    for (const item of input.items) {
      const product = await this.productRepo.findById(item.productId);
      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no fue encontrado.`);
      }

      // Regla B2B: Mínimo de compra
      if (item.quantity < product.minOrderQuantity) {
        throw new Error(
          `El producto '${product.name}' requiere un pedido mínimo de ${product.minOrderQuantity} unidades.`
        );
      }

      // Regla de Negocio: Disponibilidad de Stock
      if (!product.hasSufficientStock(item.quantity)) {
        throw new Error(`Stock insuficiente para el producto '${product.name}'.`);
      }

      // Reducir el stock del producto en memoria
      product.reduceStock(item.quantity);
      await this.productRepo.save(product);

      orderItems.push({
        productId: product.id,
        unitPrice: product.price,
        quantity: item.quantity,
      });
    }

    // 2. Crear la entidad Order
    const newOrder = new Order({
      id: `ord-${Date.now()}`,
      customerId: input.customerId,
      items: orderItems,
      status: "COMPLETED",
      createdAt: new Date(),
    });

    // 3. Guardar el pedido en el repositorio
    await this.orderRepo.save(newOrder);

    // 4. Retornar el DTO con el resumen calculado
    return {
      id: newOrder.id,
      customerId: newOrder.customerId,
      items: newOrder.items,
      subtotal: newOrder.calculateSubtotal(),
      discount: newOrder.calculateDiscount(),
      tax: newOrder.calculateTax(),
      total: newOrder.calculateTotal(),
      status: newOrder.status,
      createdAt: new Date(),
    };
  }
}