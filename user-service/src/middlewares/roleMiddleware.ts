import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: ("student" | "teacher")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }

    next();
  };
};
