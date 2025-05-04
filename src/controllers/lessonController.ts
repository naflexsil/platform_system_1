import { Request, Response } from "express";
import Lesson from "../models/lesson";

export const createLesson = async (req: Request, res: Response) => {
  try {
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
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getLessonsByCourse = async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort(
      "order",
    );
    res.json(lessons);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: "Урок не найден" });
      return;
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении урока", error });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: "Урок не найден" });
      return;
    }
    res.json({ message: "Урок удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении урока", error });
  }
};
