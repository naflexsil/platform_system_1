import { Request, Response } from "express";

// Простой метод для проверки работоспособности сервера
export const ping = (req: Request, res: Response) => {
  res.status(200).json({ message: "Pong! Server is working." });
};
