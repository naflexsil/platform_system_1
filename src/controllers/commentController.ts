import { Request, Response } from "express";
import Comment from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { text } = req.body;
    const author = req.user!.userId;

    const comment = new Comment({ lesson: lessonId, author, text });
    await comment.save();

    res.status(201).json(comment);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsForLesson = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ lesson: req.params.lessonId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404).json({ message: "Комментарий не найден" });
      return;
    }

    if (comment.author.toString() !== req.user!.userId.toString()) {
      res.status(403).json({ message: "Нет доступа для редактирования" });
      return;
    }

    if (typeof req.body.text === "string" && req.body.text.trim()) {
      comment.text = req.body.text.trim();
    }

    const updated = await comment.save();
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при обновлении комментария", error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404).json({ message: "Комментарий не найден" });
      return;
    }

    if (comment.author.toString() !== req.user!.userId.toString()) {
      res.status(403).json({ message: "Нет доступа для редактирования" });
      return;
    }

    await comment.deleteOne();
    res.json({ message: "Комментарий удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении комментария", error });
  }
};
