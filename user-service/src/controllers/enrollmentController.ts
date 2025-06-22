import { sendToQueue } from "../rabbitMQ/publisher";
import asyncHandler from "express-async-handler";

export const enrollInCourse = asyncHandler(async (req, res) => {
  const { courseId, userId } = req.body;
  await sendToQueue({ courseId, userId });
  res.status(200).json({ message: "Enrollment request sent" });
});
