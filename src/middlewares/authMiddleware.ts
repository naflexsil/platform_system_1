import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/user";

interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(403).json({ message: "Токен не предоставлен" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { userId: new Types.ObjectId(decoded.userId) };
    next();
  } catch {
    res.status(403).json({ message: "Неверный токен" });
  }
};

export const roleMiddleware = (roles: ("student" | "teacher")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Неавторизованный" });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user || !roles.includes(user.role)) {
      void res.status(403).json({ message: "Доступ запрещен" });
      return;
    }

    next();
  };
};
