import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });

export default upload;
