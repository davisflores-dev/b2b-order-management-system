import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    customerId: z.string().min(1, "El ID del cliente es obligatorio."),
    items: z.array(
      z.object({
        productId: z.string().min(1, "El ID del producto es obligatorio."),
        quantity: z.number().int().positive("La cantidad debe ser un número entero mayor a 0."),
      })
    ).min(1, "Debe enviar al menos un ítem en el pedido."),
  }),
});