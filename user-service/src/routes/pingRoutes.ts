import express from "express";
import asyncHandler from "express-async-handler";
import { ping } from "../controllers/pingController";

const router = express.Router();

router.get("/ping", asyncHandler(ping));

export default router;
