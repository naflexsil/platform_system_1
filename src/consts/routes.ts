import authRoutes from "../routes/authRoutes";
import pingRoutes from "../routes/pingRoutes";
import protectedRoutes from "../routes/protectedRoutes";
import courseRoutes from "../routes/courseRoutes";
import userRoutes from "../routes/userRoutes";
import uploadRoutes from "../routes/uploadRoutes";
import lessonRoutes from "../routes/lessonRoutes";
import commentRoutes from "../routes/commentRoutes";

export const routes = [
  { path: "/api/auth", router: authRoutes },
  { path: "/api/ping", router: pingRoutes },
  { path: "/api/protected", router: protectedRoutes },
  { path: "/api/courses", router: courseRoutes },
  { path: "/api/users", router: userRoutes },
  { path: "/upload", router: uploadRoutes },
  { path: "/api/lessons", router: lessonRoutes },
  { path: "/api/comments", router: commentRoutes },
];
