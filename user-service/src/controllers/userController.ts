import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/user";

export const addToFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { courseId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: courseId } },
      { new: true },
    ).populate("favorites");

    res.status(200).json(updatedUser?.favorites);
  },
);

export const removeFromFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { courseId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: courseId } },
      { new: true },
    ).populate("favorites");

    res.status(200).json(updatedUser?.favorites);
  },
);

export const getFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      res.status(404);
      throw new Error("Пользователь не найден");
    }

    res.status(200).json(user.favorites);
  },
);
