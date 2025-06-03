import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

interface JwtPayload {
  userId: string;
  role: "student" | "teacher";
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
    req.user = {
      userId: new Types.ObjectId(decoded.userId),
      role: decoded.role,
    };
    next();
  } catch {
    res.status(403).json({ message: "Неверный токен" });
  }
};
