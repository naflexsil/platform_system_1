import express from "express";
import asyncHandler from "express-async-handler";
import { getMe, deleteUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const protectedRouter = express.Router();

protectedRouter.use(authMiddleware);

protectedRouter.get("/me", asyncHandler(getMe));
protectedRouter.delete("/delete", asyncHandler(deleteUser));

export default protectedRouter;
