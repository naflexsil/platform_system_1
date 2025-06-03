import courseRoutes from "../routes/courseRoutes";
import lessonRoutes from "../routes/lessonRoutes";
import commentRoutes from "../routes/commentRoutes";
import enrollmentRoutes from "../routes/enrollmentRoutes";
import uploadRoutes from "../routes/uploadRoutes";

export const routes = [
  { path: "/api/courses", router: courseRoutes },
  { path: "/api/lessons", router: lessonRoutes },
  { path: "/api/comments", router: commentRoutes },
  { path: "/api/enrollments", router: enrollmentRoutes },
  { path: "/upload", router: uploadRoutes },
];
