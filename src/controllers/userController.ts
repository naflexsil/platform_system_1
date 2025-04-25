import { Request, Response } from "express";
import User from "../models/user";

export const addToFavorites = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { courseId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: courseId } },
      { new: true },
    ).populate("favorites");

    res.status(200).json(updatedUser?.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении в избранное", error });
  }
};

export const removeFromFavorites = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { courseId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: courseId } },
      { new: true },
    ).populate("favorites");

    res.status(200).json(updatedUser?.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении из избранного", error });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения избранного", error });
  }
};
