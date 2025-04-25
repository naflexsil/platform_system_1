import path from "path";
import fs from "fs";
import sharp from "sharp";
import { RequestHandler } from "express";
import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, "..", "public", "tempUploads");
    ensureDirExists(tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const upload = multer({ storage });
export default upload;

export const processImage: RequestHandler = async (req, res, next) => {
  const reqFile = req as unknown as Request & { file?: Express.Multer.File };

  try {
    if (!reqFile.file) {
      res.status(400).json({ message: "Файл не найден" });
      return;
    }

    const inputPath = reqFile.file.path;
    const outputDir = path.join(__dirname, "..", "public", "processedImages");
    ensureDirExists(outputDir);
    const outputPath = path.join(outputDir, reqFile.file.filename);

    const watermarkPath = path.join(__dirname, "..", "public", "watermark.png");

    const compositeOptions = fs.existsSync(watermarkPath)
      ? [{ input: watermarkPath, gravity: "southeast" }]
      : [];

    await sharp(inputPath)
      .resize({ width: 1080 })
      .composite(compositeOptions)
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    setTimeout(() => {
      try {
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error("Ошибка при удалении файла:", err);
      }
    }, 100);

    res.status(200).json({
      message: "Изображение загружено и обработано",
      imageUrl: `/processedImages/${reqFile.file.filename}`,
    });
  } catch (error) {
    console.error("Ошибка обработки:", error);
    res.status(500).json({ message: "Ошибка обработки изображения" });
  }
};
