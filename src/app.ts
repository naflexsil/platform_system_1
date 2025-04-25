import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db";
import authRoutes from "../src/routes/authRoutes";
import pingRoutes from "../src/routes/pingRoutes";
import protectedRoutes from "../src/routes/protectedRoutes";
import courseRoutes from "../src/routes/courseRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/ping", pingRoutes);

app.use("/api/protected", protectedRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/users", userRoutes);

app.use("/upload", uploadRoutes);
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "processedImages")),
);

app.listen(PORT, () => {
  console.log(`сервер работает на: http://localhost:${PORT}`);
});
