import { sendToQueue } from "../utils/rabbitmq";

export const enrollInCourse = asyncHandler(async (req, res) => {
  const { courseId, userId } = req.body;
  await sendToQueue({ courseId, userId });
  res.status(200).json({ message: "Enrollment request sent" });
});
function asyncHandler(arg0: (req: any, res: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}
