import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import pingRoutes from "./routes/pingRoutes";

dotenv.config();

// Инициализация Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

connectDB();

// Маршруты
app.use("/api/auth", authRoutes); // Маршруты для аутентификации
app.use("/api", pingRoutes); // Маршруты для проверки сервера

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
