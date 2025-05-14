import { Request, Response } from "express";
import { Types } from "mongoose";
import asyncHandler from "express-async-handler";
import { Enrollment } from "../models/enrollment";
import Lesson from "../models/lesson";

export const enrollInCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.body;
    const studentId = req.user?.userId;

    const exists = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (exists) {
      res.status(400);
      throw new Error("Вы уже записаны на курс.");
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });
    res.status(201).json(enrollment);
  },
);

export const getMyEnrollments = asyncHandler(
  async (req: Request, res: Response) => {
    const studentId = req.user?.userId;
    const enrollments = await Enrollment.find({ student: studentId }).populate(
      "course",
    );
    res.json(enrollments);
  },
);

export const markLessonCompleted = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId, lessonId } = req.params;
    const studentId = req.user?.userId;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (!enrollment) {
      res.status(404);
      throw new Error("Запись не найдена");
    }

    if (!enrollment.completedLessons.includes(new Types.ObjectId(lessonId))) {
      enrollment.completedLessons.push(new Types.ObjectId(lessonId));
    }

    res.json(enrollment);
  },
);

export const uncompleteLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId, lessonId } = req.params;
    const studentId = req.user?.userId;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (!enrollment) {
      res.status(404);
      throw new Error("Запись не найдена");
    }

    enrollment.completedLessons = enrollment.completedLessons.filter(
      (id) => id.toString() !== lessonId,
    );
    await enrollment.save();

    res.json(enrollment);
  },
);

export const getCourseProgress = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const studentId = req.user?.userId;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (!enrollment) {
      res.status(404);
      throw new Error("Запись не найдена");
    }

    const totalLessons = await Lesson.countDocuments({ course: courseId });
    const completed = enrollment.completedLessons.length;

    res.json({
      courseId,
      totalLessons,
      completedLessons: completed,
      progress: totalLessons ? Math.round((completed / totalLessons) * 100) : 0,
    });
  },
);

export const getEnrolledCount = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const count = await Enrollment.countDocuments({ course: courseId });
    res.json({ courseId, enrolledStudents: count });
  },
);
