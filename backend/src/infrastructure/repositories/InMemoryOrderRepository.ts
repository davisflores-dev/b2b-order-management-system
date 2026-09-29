import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === id);
    return order || null;
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }
}