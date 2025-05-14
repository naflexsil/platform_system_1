import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Lesson from "../models/lesson";

export const createLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const { course, title, content, videoUrl, order, quiz } = req.body;
    const lesson = new Lesson({
      course,
      title,
      content,
      videoUrl,
      order,
      quiz,
    });
    await lesson.save();
    res.status(201).json(lesson);
  },
);

export const getLessonsByCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort(
      "order",
    );
    res.json(lessons);
  },
);

export const getLessonById = asyncHandler(
  async (req: Request, res: Response) => {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      res.status(404);
      throw new Error("Урок не найден");
    }

    res.json(lesson);
  },
);

export const deleteLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      res.status(404);
      throw new Error("Урок не найден");
    }

    res.json({ message: "Урок удалён" });
  },
);
