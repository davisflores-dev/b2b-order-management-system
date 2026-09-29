import Cart from "@/components/Cart";
import { Product } from "@/types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:4000/api/products", {
      cache: "no-store", // Garantiza datos frescos en cada solicitud
    });
    if (!res.ok) throw new Error("No se pudo cargar el catálogo.");
    return res.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <header className="max-w-6xl mx-auto px-6 mb-6">
        <h1 className="text-3xl font-black text-gray-800">
          Sistema B2B Engine - Procesamiento de Pedidos
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Demostración de Clean Architecture en Node.js + Express integrada con Next.js.
        </p>
      </header>

      <Cart products={products} />
    </main>
  );
}