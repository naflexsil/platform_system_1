import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
  const maxRetries = 10;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        "Попытка подключения к RabbitMQ (user-service), попытка ${attempt}",
      );
      const connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue("enrollment_queue");
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
  if (!channel) {
    throw new Error("Channel not initialized");
  }
  channel.sendToQueue("enrollment_queue", Buffer.from(JSON.stringify(data)));
};
