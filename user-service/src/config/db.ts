import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Ошибка: MONGO_URI не задан в .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("МонгоДБ успешно подключен");
  } catch (error) {
    console.error("Ошибка при подключении к MongoDB:", error);
    process.exit(1);
  }
};
