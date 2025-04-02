import express from "express";
import { connectDB } from "../src/config/db";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes";
import pingRoutes from "../src/routes/pingRoutes";
import protectedRoutes from "../src/routes/protectedRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", pingRoutes);
app.use("/api", protectedRoutes);

app.listen(PORT, () => {
  console.log(`сервер работает на: http://localhost:${PORT}`);
});
