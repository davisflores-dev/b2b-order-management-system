# 📦 Sistema de Gestiòn de Pedidos y Stock

Un motor de procesamiento de pedidos e inventario B2B desarrollado aplicando **Clean Architecture** (Arquitectura Limpia) en el backend y **Next.js (App Router)** en el frontend.

El objetivo principal de este proyecto es demostrar la separación de responsabilidades, el aislamiento de la lógica de negocio pura, la inyección de dependencias y la validación de datos end-to-end.

---

## 🏗️ Arquitectura del Sistema

El repositorio está estructurado en dos módulos independientes:

```text
b2b-order-engine/
├── backend/          # API REST con Express + TypeScript (Clean Architecture)
└── frontend/         # Interfaz de usuario interactiva con Next.js + Tailwind CSS
```

### Backend (Node.js + Express) — Clean Architecture
Organizado en 4 capas estrictas sin dependencias cruzadas hacia el dominio:
1. **Domain:** Entidades (`Order`, `Product`), reglas puras de descuento B2B (10% por volumen) e impuestos (7%), e interfaces de repositorios.
2. **Application:** Casos de uso (`CreateOrderUseCase`, `GetProductsUseCase`) e interfaces DTO.
3. **Infrastructure:** Repositorios simulados en memoria (*InMemory*) para independizar la lógica de la base de datos.
4. **Presentation:** Controladores Express, esquemas de validación con **Zod** y middlewares de manejo de errores.

### Frontend (Next.js 15 / React 19)
- **Server Components:** Carga de catálogo mediante `fetch` directamente en servidor para un renderizado veloz.
- **Client Components:** Gestión de la cesta de compras interactiva y validaciones del lado del cliente.

---

## 🚀 Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU-USUARIO/b2b-order-engine.git](https://github.com/TU-USUARIO/b2b-order-engine.git)
cd b2b-order-engine
```

### 2. Iniciar el Backend
```bash
cd backend
npm install
npm run dev
```
> El backend se iniciará en `http://localhost:4000`.

### 3. Iniciar el Frontend
En otra terminal desde la raíz:
```bash
cd frontend
npm install
npm run dev
```
> Abre `http://localhost:3000` en tu navegador.