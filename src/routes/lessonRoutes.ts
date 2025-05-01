import express from "express";
import {
  createLesson,
  getLessonsByCourse,
} from "../controllers/lessonController.js";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLesson);
router.get("/course/:courseId", authMiddleware, getLessonsByCourse);

export default router;
