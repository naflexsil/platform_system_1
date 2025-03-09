import express from "express";
import { ping } from "../controllers/pingController";

const router = express.Router();

router.get("/ping", async (req, res) => {
  try {
    await ping(req, res);
  } catch (error: unknown) {
    console.error("Ошибка в маршруте ping:", error);
  }
});

export default router;
