import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class GetProductsUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute() {
    const products = await this.productRepo.findAll();
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: p.price,
      stock: p.stock,
      minOrderQuantity: p.minOrderQuantity,
    }));
  }
}