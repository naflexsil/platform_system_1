import express from "express";
import { ping } from "../controllers/pingController";

const router = express.Router();

// Маршрут для проверки работоспособности сервера
router.get("/ping", ping);

export default router;
