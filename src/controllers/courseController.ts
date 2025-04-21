import Course from "../models/course";
import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ error: "Курс не найден" });
      return;
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, price, image, category, level } = req.body;

    const newCourse = new Course({
      title,
      description,
      price,
      image,
      category,
      level,
      author: req.user!.userId,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ error: "Курс не найден" });
      return;
    }

    if (req.body.title && req.body.title !== course.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }

    Object.assign(course, req.body);
    await course.save();

    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404).json({ error: "Курс не найден" });
      return;
    }
    res.json({ message: "Курс удалён" });
  } catch (error) {
    next(error);
  }
};
