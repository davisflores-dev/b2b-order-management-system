import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../application/use-cases/CreateOrderUseCase";

export class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.createOrderUseCase.execute(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}