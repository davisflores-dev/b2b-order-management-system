import { Product } from "../../domain/entities/Product";

export const initialProducts: Product[] = [
  new Product({
    id: "prod-1",
    name: "Laptop Empresarial 14 pulgadas",
    sku: "LAP-CORP-14",
    price: 800,
    stock: 25,
    minOrderQuantity: 2, // Requiere comprar al menos 2 unidades
  }),
  new Product({
    id: "prod-2",
    name: "Monitor Ergonómico 27 4K",
    sku: "MON-ERG-27",
    price: 350,
    stock: 50,
    minOrderQuantity: 5,
  }),
  new Product({
    id: "prod-3",
    name: "Kit de Teclado y Mouse Inalámbrico",
    sku: "ACC-KB-MOUSE",
    price: 45,
    stock: 120,
    minOrderQuantity: 10,
  }),
];