import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const ping = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Сервер работает!" });
});
