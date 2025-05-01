import express from "express";
import {
  createComment,
  getCommentsForLesson,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:lessonId", authMiddleware, createComment);
router.get("/:lessonId", authMiddleware, getCommentsForLesson);

export default router;
