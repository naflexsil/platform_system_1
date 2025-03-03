import mongoose from "mongoose";

// Функция для подключения к MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      // Опции подключения (опционально)
      serverSelectionTimeoutMS: 5000, // Таймаут подключения
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Завершение процесса в случае ошибки
  }
};
