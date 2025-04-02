import express, { Request, Response } from "express";
import { getMe, deleteUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const protectedRouter = express.Router();

protectedRouter.use(authMiddleware);

protectedRouter.get("/me", (req: Request, res: Response) => {
  getMe(req, res).catch((error) => {
    console.error("Ошибка в маршруте getMe:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

protectedRouter.delete("/delete", (req: Request, res: Response) => {
  deleteUser(req, res).catch((error) => {
    console.error("Ошибка в маршруте удаления пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  });
});

export default protectedRouter;
