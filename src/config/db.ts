import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("МонгоДБ успешно подкючен");
  } catch (error) {
    console.error("ошибка при подключении МонгоДБ:", error);
    process.exit(1);
  }
};
