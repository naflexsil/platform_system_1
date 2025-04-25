import express from "express";
import upload, { processImage } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post("/image", upload.single("image"), processImage);

export default router;
