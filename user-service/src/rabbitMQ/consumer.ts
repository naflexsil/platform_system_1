import amqp from "amqplib";

export const startUserConsumer = async () => {
  const url = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
  const conn = await amqp.connect(url);
  const ch = await conn.createChannel();

  await ch.assertExchange("enrollment_exchange", "direct", { durable: true });
  await ch.assertQueue("user_enrollment_queue", { durable: true });
  await ch.bindQueue(
    "user_enrollment_queue",
    "enrollment_exchange",
    "user.enroll",
  );

  ch.consume("user_enrollment_queue", (msg) => {
    if (msg) {
      console.log("user-service получено сообщение:", msg.content.toString());
      ch.ack(msg);
    }
  });
  console.log("User-service слушает user_enrollment_queue");
};
