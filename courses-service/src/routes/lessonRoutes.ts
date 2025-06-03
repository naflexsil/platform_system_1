import express from "express";
import {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  deleteLesson,
} from "../../../courses-service/src/controllers/lessonController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLesson);
router.get("/course/:courseId", authMiddleware, getLessonsByCourse);
router.get("/:id", authMiddleware, getLessonById);
router.delete("/:id", authMiddleware, deleteLesson);

export default router;
