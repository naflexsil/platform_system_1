import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Course from "../models/course";

export const getAllCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      category,
      level,
      search,
    } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter)
      .sort(String(sort))
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.json(courses);
  },
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Курс не найден");
    }

    res.json(course);
  },
);

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, price, image, category, level, tags } =
      req.body;

    const uniqueTags = Array.isArray(tags) ? [...new Set(tags)] : [];

    const newCourse = new Course({
      title,
      description,
      price,
      image,
      category,
      level,
      tags: uniqueTags,
      author: req.user!.userId,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  },
);

export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Курс не найден");
    }

    if (req.body.title && req.body.title !== course.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }

    if (req.body.tags && Array.isArray(req.body.tags)) {
      req.body.tags = [...new Set(req.body.tags)];
    }

    Object.assign(course, req.body);
    await course.save();

    res.json(course);
  },
);

export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Курс не найден");
    }

    res.json({ message: "Курс удалён" });
  },
);
