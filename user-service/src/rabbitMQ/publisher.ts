import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const url = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
  const maxRetries = 10;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Попытка подключения к RabbitMQ (user-service), попытка ${attempt}`,
      );
      const connection = await amqp.connect(url);
      channel = await connection.createChannel();

      await channel.assertExchange("enrollment_exchange", "direct", {
        durable: true,
      });

      console.log("RabbitMQ connected (user-service)");
      return;
    } catch (error) {
      const err = error as Error;
      console.error(
        "Ошибка подключения к RabbitMQ (user-service):",
        err.message,
      );
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

export const sendToQueue = async (data: any) => {
  if (!channel) throw new Error("RabbitMQ channel не инициализирован");
  return channel.publish(
    "enrollment_exchange",
    "enroll",
    Buffer.from(JSON.stringify(data)),
    { persistent: true },
  );
};
