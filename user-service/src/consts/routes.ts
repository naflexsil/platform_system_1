import authRoutes from "../routes/authRoutes";
import pingRoutes from "../routes/pingRoutes";
import protectedRoutes from "../routes/protectedRoutes";
import userRoutes from "../routes/userRoutes";

export const routes = [
  { path: "/api/auth", router: authRoutes },
  { path: "/api/ping", router: pingRoutes },
  { path: "/api/protected", router: protectedRoutes },
  { path: "/api/users", router: userRoutes },
];
