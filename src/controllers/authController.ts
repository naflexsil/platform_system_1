import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Ошибка регистрации пользователя", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      res.status(400).json({ message: "Пользователь не найден" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Неверный пароль" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при входе в систему", error });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Неавторизованный" });
      return;
    }

    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении пользовательских данных", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Неавторизованный" });
      return;
    }

    const { userId } = req.user;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления пользователя", error });
  }
};
