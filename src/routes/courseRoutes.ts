import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);

router.post(
  "/courses",
  authMiddleware,
  roleMiddleware(["teacher"]),
  createCourse,
);

router.put("/courses/:id", authMiddleware, updateCourse);
router.delete("/courses/:id", authMiddleware, deleteCourse);

router.post("/upload", upload.single("image"), (req: any, res) => {
  res.json({ imageUrl: `/uploads/images/${req.file.filename}` });
});

export default router;
