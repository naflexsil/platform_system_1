import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ message: "Токен не предоставлен" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: "student" | "teacher";
    };

    req.headers["x-user-id"] = decoded.userId;
    req.headers["x-user-role"] = decoded.role;

    next();
  } catch {
    res.status(403).json({ message: "Неверный токен" });
  }
};
