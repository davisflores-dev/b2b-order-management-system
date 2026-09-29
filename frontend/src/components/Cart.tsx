"use client";

import { useState } from "react";
import { Product, CartItem, OrderResponse } from "@/types";

interface CartProps {
  products: Product[];
}

export default function Cart({ products }: CartProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Agregar producto respetando la cantidad mínima de compra
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: product.minOrderQuantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Enviar el pedido a la API de Express
  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);
    setOrderResult(null);

    const payload = {
      customerId: "CLI-B2B-1001", // ID simulado del cliente B2B
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al procesar la orden.");
      }

      setOrderResult(data);
      setCart([]); // Limpiar la cesta tras compra exitosa
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
      {/* Columna Izquierda: Catálogo */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Catálogo de Productos B2B</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-500">SKU: {p.sku}</p>
              <p className="text-sm font-medium mt-1">Precio: ${p.price}</p>
              <p className="text-xs text-gray-600">Stock disponible: {p.stock}</p>
              <p className="text-xs text-amber-600 font-medium">
                Mínimo de orden: {p.minOrderQuantity} unidades
              </p>
              <button
                onClick={() => addToCart(p)}
                disabled={p.stock <= 0}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm disabled:bg-gray-300"
              >
                {p.stock > 0 ? "Añadir a la Cesta" : "Sin Stock"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Columna Derecha: Cesta e Resumen */}
      <div className="border p-4 rounded-lg shadow-sm bg-gray-50 h-fit">
        <h2 className="text-xl font-bold mb-4">Resumen de la Cesta</h2>

        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No hay productos seleccionados.</p>
        ) : (
          <div className="space-y-3">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">${product.price} x {quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Quitar
                </button>
              </div>
            ))}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded mt-4 disabled:bg-gray-400"
            >
              {loading ? "Procesando..." : "Confirmar Pedido B2B"}
            </button>
          </div>
        )}

        {/* Mensajes de feedback */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded">
            ⚠️ {errorMessage}
          </div>
        )}

        {orderResult && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 text-sm rounded space-y-1">
            <p className="font-bold">✅ ¡Pedido procesado!</p>
            <p>ID Orden: <span className="font-mono">{orderResult.id}</span></p>
            <p>Subtotal: ${orderResult.subtotal.toFixed(2)}</p>
            <p className="text-green-700 font-semibold">Descuento B2B: -${orderResult.discount.toFixed(2)}</p>
            <p>Impuestos (7%): ${orderResult.tax.toFixed(2)}</p>
            <p className="font-bold text-base mt-1">Total: ${orderResult.total.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}