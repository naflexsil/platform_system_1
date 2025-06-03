import amqp from "amqplib";

export const consumeRabbit = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost",
  );
  const channel = await connection.createChannel();
  await channel.assertQueue("enrollment_queue");

  channel.consume("enrollment_queue", async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log("📥 Получена запись на курс:", data);

      channel.ack(msg);
    }
  });
};
