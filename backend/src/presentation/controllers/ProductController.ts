import { Request, Response } from "express";
import { GetProductsUseCase } from "../../application/use-cases/GetProductsUseCase";

export class ProductController {
  constructor(private getProductsUseCase: GetProductsUseCase) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const products = await this.getProductsUseCase.execute();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}