import amqp from "amqplib";
import { Enrollment } from "../models/enrollment";

export const startConsumer = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost",
  );
  const channel = await connection.createChannel();
  await channel.assertQueue("enrollmentQueue");

  channel.consume("enrollmentQueue", async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      await Enrollment.create(data);
      channel.ack(msg);
    }
  });
};
