import amqp from "amqplib";
import { Enrollment } from "../models/enrollment";

export const startConsumer = async () => {
  const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
  const maxRetries = 10;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Попытка подключения к RabbitMQ (consumer), попытка ${attempt}`,
      );
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      await channel.assertExchange("enrollment_exchange", "direct", {
        durable: true,
      });

      await channel.assertQueue("courses_enrollment_queue", { durable: true });

      await channel.bindQueue(
        "courses_enrollment_queue",
        "enrollment_exchange",
        "course.enroll",
      );

      channel.consume("courses_enrollment_queue", async (msg) => {
        if (msg !== null) {
          const data = JSON.parse(msg.content.toString());
          await Enrollment.create(data);
          channel.ack(msg);
        }
      });

      console.log(
        "Consumer подключён к RabbitMQ и слушает очередь courses_enrollment_queue",
      );
      return;
    } catch (error) {
      const err = error as Error;
      console.error("Ошибка подключения к RabbitMQ (consumer):", err.message);
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};
