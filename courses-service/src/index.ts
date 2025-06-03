import express from "express";
import dotenv from "dotenv";
import path from "path";
import { routes } from "./consts/routes";

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

app.listen(PORT, () => {
  console.log(`courses-service работает на http://localhost:${PORT}`);
});
