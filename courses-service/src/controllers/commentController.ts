import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Comment from "../models/comment";

export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const { text } = req.body;
    const author = req.user!.userId;

    const comment = new Comment({ lesson: lessonId, author, text });
    await comment.save();

    res.status(201).json(comment);
  },
);

export const getCommentsForLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await Comment.find({ lesson: req.params.lessonId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  },
);

export const updateComment = asyncHandler(
  async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404);
      throw new Error("Комментарий не найден");
    }

    if (comment.author.toString() !== req.user!.userId.toString()) {
      res.status(403);
      throw new Error("Нет доступа для редактирования");
    }

    if (typeof req.body.text === "string" && req.body.text.trim()) {
      comment.text = req.body.text.trim();
    }

    const updated = await comment.save();
    res.json(updated);
  },
);

export const deleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404);
      throw new Error("Комментарий не найден");
    }

    if (comment.author.toString() !== req.user!.userId.toString()) {
      res.status(403);
      throw new Error("Нет доступа для удаления");
    }

    await comment.deleteOne();
    res.json({ message: "Комментарий удален" });
  },
);
