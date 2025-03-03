import express from "express";
import {
  register,
  login,
  getMe,
  deleteUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Регистрация пользователя
router.post("/register", (req, res) => {
  register(req, res).catch((error) => {
    console.error("Error in register route:", error);
    res.status(500).json({ message: "Internal server error" });
  });
});

// Авторизация пользователя
router.post("/login", (req, res) => {
  login(req, res).catch((error) => {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Internal server error" });
  });
});

// Получение данных о текущем пользователе (требуется аутентификация)
router.get("/me", authMiddleware, (req, res) => {
  getMe(req, res).catch((error) => {
    console.error("Error in getMe route:", error);
    res.status(500).json({ message: "Internal server error" });
  });
});

// Удаление пользователя (требуется аутентификация)
router.delete("/delete", authMiddleware, (req, res) => {
  deleteUser(req, res).catch((error) => {
    console.error("Error in deleteUser route:", error);
    res.status(500).json({ message: "Internal server error" });
  });
});

export default router;
