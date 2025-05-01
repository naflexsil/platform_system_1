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
