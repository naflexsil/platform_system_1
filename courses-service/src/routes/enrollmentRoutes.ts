import express from "express";
import {
  enrollInCourse,
  getMyEnrollments,
  markLessonCompleted,
  getCourseProgress,
  getEnrolledCount,
  uncompleteLesson,
} from "../../../courses-service/src/controllers/enrollmentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.post("/", enrollInCourse);
router.get("/my", getMyEnrollments);

router.patch("/:courseId/lessons/:lessonId", markLessonCompleted);
router.patch("/:courseId/lessons/:lessonId/uncomplete", uncompleteLesson);

router.get("/:courseId/progress", getCourseProgress);
router.get("/course/:courseId/count", getEnrolledCount);

export default router;
