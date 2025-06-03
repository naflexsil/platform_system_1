import { RequestHandler } from "express";

export const roleMiddleware = (roles: ("student" | "teacher")[]) => {
  const middleware: RequestHandler = (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Доступ запрещён" });
      return;
    }

    next();
  };

  return middleware;
};
