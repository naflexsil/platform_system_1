import amqp from "amqplib";

export const startGatewayConsumer = async () => {
  const url = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
  const conn = await amqp.connect(url);
  const ch = await conn.createChannel();
  await ch.assertExchange("enrollment_exchange", "direct", { durable: true });
  await ch.assertQueue("gateway_enrollment_queue", { durable: true });
  await ch.bindQueue(
    "gateway_enrollment_queue",
    "enrollment_exchange",
    "log.enroll",
  );

  ch.consume("gateway_enrollment_queue", (msg) => {
    if (msg) {
      console.log("api-gateway получил:", msg.content.toString());
      ch.ack(msg);
    }
  });
  console.log("Gateway слушает gateway_enrollment_queue");
};
