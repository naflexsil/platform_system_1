import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

// Регистрация пользователя
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, login, password, role } = req.body;

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const user = new User({
      firstName,
      lastName,
      login,
      password: hashedPassword,
      role,
    });

    // Сохранение пользователя в базе данных
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Авторизация пользователя
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, password } = req.body;

    // Поиск пользователя по логину
    const user = await User.findOne({ login });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    // Генерация JWT токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Получение данных о текущем пользователе
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Поиск пользователя по ID (исключая поле password)
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

// Удаление пользователя
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { userId } = req.user;

    // Удаление пользователя по ID
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
