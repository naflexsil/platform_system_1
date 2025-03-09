import express from "express";
import {
  register,
  login,
  getMe,
  deleteUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", (req, res) => {
  register(req, res).catch((error) => {
    console.error("Ошибка в маршруте регистрации:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

router.post("/login", (req, res) => {
  login(req, res).catch((error) => {
    console.error("Ошибка в маршруте логина:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

router.get("/me", authMiddleware, (req, res) => {
  getMe(req, res).catch((error) => {
    console.error("Ошибка в маршруте getMe:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

router.delete("/delete", authMiddleware, (req, res) => {
  deleteUser(req, res).catch((error) => {
    console.error("Ошибка в маршруте удаления пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

export default router;
