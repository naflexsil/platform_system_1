import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/user";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, login, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    login,
    password: hashedPassword,
    role,
  });

  await user.save();

  res.status(201).json({ message: "Успешная регистрация пользователя" });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });

  if (!user) {
    res.status(400);
    throw new Error("Пользователь не найден");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Неверный пароль");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Неавторизованный");
  }

  const user = await User.findById(req.user.userId).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("Пользователь не найден");
  }

  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Неавторизованный");
  }

  const user = await User.findById(req.user.userId);
  if (!user) {
    res.status(404);
    throw new Error("Пользователь не найден");
  }

  await User.findByIdAndDelete(req.user.userId);

  res.status(200).json({ message: "Пользователь успешно удален" });
});
