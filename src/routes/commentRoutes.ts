import express from "express";
import {
  createComment,
  getCommentsForLesson,
  updateComment,
  deleteComment,
} from "../controllers/commentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:lessonId", authMiddleware, createComment);
router.get("/:lessonId", authMiddleware, getCommentsForLesson);
router.put("/:commentId", authMiddleware, updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
