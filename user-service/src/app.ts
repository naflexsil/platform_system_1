import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import { routes } from "./consts/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

connectDB();

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "processedImages")),
);

app.listen(PORT, () => {
  console.log(`user-service работает на http://localhost:${PORT}`);
});
