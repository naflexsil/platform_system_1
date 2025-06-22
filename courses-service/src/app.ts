import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import { routes } from "./consts/routes";
import { consumeRabbit } from "./utils/rabbitmq";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(express.json());

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "..", "public", "uploads", "images")),
);

const startServer = async () => {
  try {
    await connectDB();
    await consumeRabbit();

    app.listen(PORT, () => {
      console.log(`courses-service работает на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при запуске сервиса:", error);
    process.exit(1);
  }
};

startServer();
