import express from "express";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/favorites", authMiddleware, getFavorites);
router.post("/favorites", authMiddleware, addToFavorites);
router.delete("/favorites", authMiddleware, removeFromFavorites);

export default router;
