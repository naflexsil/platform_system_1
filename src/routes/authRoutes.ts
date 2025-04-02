import express, { Request, Response } from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  register(req, res).catch((error) => {
    console.error("Ошибка в маршруте регистрации:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

router.post("/login", (req: Request, res: Response) => {
  login(req, res).catch((error) => {
    console.error("Ошибка в маршруте логина:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

export default router;
