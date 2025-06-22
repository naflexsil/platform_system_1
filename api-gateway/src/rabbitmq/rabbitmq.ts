import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const url = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
  const maxRetries = 10;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const connection = await amqp.connect(url);
      channel = await connection.createChannel();

      await channel.assertExchange("enrollment_exchange", "direct", {
        durable: true,
      });
      await channel.assertQueue("gateway_enrollment_queue", { durable: true });
      await channel.bindQueue(
        "gateway_enrollment_queue",
        "enrollment_exchange",
        "enroll",
      );

      console.log("RabbitMQ connected (api-gateway)");
      return;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

export const sendToQueue = (data: any) => {
  if (!channel) throw new Error("RabbitMQ channel не инициализирован");
  channel.publish(
    "enrollment_exchange",
    "enroll",
    Buffer.from(JSON.stringify(data)),
    { persistent: true },
  );
};

export const consumeQueue = (handler: (msg: any) => Promise<void>) => {
  if (!channel) throw new Error("RabbitMQ channel не инициализирован");
  channel.consume("gateway_enrollment_queue", async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      await handler(data);
      channel.ack(msg);
    }
  });
};
