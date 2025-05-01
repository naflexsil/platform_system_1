import { Request, Response } from "express";
import Comment from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { content } = req.body;
    const author = req.user!.userId;

    const comment = new Comment({ lesson: lessonId, author, content });
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
