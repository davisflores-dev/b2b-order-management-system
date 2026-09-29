import { Router } from "express";
import { InMemoryProductRepository } from "../../infrastructure/repositories/InMemoryProductRepository";
import { InMemoryOrderRepository } from "../../infrastructure/repositories/InMemoryOrderRepository";
import { GetProductsUseCase } from "../../application/use-cases/GetProductsUseCase";
import { CreateOrderUseCase } from "../../application/use-cases/CreateOrderUseCase";
import { ProductController } from "../controllers/ProductController";
import { OrderController } from "../controllers/OrderController";
import { validateRequest } from "../middlewares/validateRequest";
import { createOrderSchema } from "../middlewares/orderSchema";

const router = Router();

// 1. Instanciamos Repositorios (Infraestructura)
const productRepository = new InMemoryProductRepository();
const orderRepository = new InMemoryOrderRepository();

// 2. Instanciamos Casos de Uso (Aplicación) e inyectamos los Repositorios
const getProductsUseCase = new GetProductsUseCase(productRepository);
const createOrderUseCase = new CreateOrderUseCase(productRepository, orderRepository);

// 3. Instanciamos Controladores (Presentación) e inyectamos los Casos de Uso
const productController = new ProductController(getProductsUseCase);
const orderController = new OrderController(createOrderUseCase);

// 4. Definición de Endpoints
router.get("/products", (req, res) => productController.getAll(req, res));
router.post(
  "/orders",
  validateRequest(createOrderSchema),
  (req, res) => orderController.create(req, res)
);

export default router;