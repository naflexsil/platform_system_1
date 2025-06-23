import express from "express";
import {
  register,
  login,
  getMe,
  deleteUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.delete("/me", authMiddleware, deleteUser);

export default router;
