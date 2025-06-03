import { RequestHandler } from "express";
import { Types } from "mongoose";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  const role = req.headers["x-user-role"];

  if (!userId || !role) {
    res.status(401).json({ message: "Нет авторизационных заголовков" });
    return;
  }

  try {
    req.user = {
      userId: new Types.ObjectId(userId.toString()),
      role: role.toString() as "student" | "teacher",
    };
    next();
  } catch (error) {
    res.status(400).json({ message: "Некорректный userId" });
  }
};
