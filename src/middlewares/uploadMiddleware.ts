import multer, { StorageEngine } from "multer";
import path from "path";
import { Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = "uploads/images";
    ensureDirExists(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });
export default upload;

export const processImage = async (req: Request, res: Response) => {
  const reqFile = req as Request & { file: Express.Multer.File };

  try {
    if (!reqFile.file) {
      res.status(400).json({ message: "Файл не найден" });
      return;
    }

    const inputPath = reqFile.file.path;
    const outputPath = path.join("uploads/processed", reqFile.file.filename);
    const watermarkPath = path.join("public", "watermark.png");

    const image = sharp(inputPath)
      .resize({ width: 1080 })
      .jpeg({ quality: 80 });

    const compositeOptions = fs.existsSync(watermarkPath)
      ? [{ input: watermarkPath, gravity: "southeast", opacity: 0.5 }]
      : [];

    await image.composite(compositeOptions).toFile(outputPath);

    res.status(200).json({
      message: "Изображение загружено и обработано",
      path: outputPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка обработки изображения" });
  }
};
