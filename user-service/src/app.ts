import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import { routes } from "./consts/routes";
import { connectRabbitMQ } from "./rabbitMQ/publisher";
import { startUserConsumer } from "./rabbitMQ/consumer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "processedImages")),
);

const startServer = async () => {
  try {
    await connectDB();
    await connectRabbitMQ();
    await startUserConsumer();

    app.listen(PORT, () => {
      console.log(`user-service работает на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при запуске сервиса:", error);
    process.exit(1);
  }
};

startServer();
