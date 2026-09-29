import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./presentation/routes/apiRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Montar la API
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
app.get("/", (_req, res) => {
  res.send("API B2B Order Engine - Backend corriendo correctamente 🚀");
});