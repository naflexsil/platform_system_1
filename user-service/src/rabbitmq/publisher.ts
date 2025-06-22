import amqp from "amqplib";

let channel: amqp.Channel;

export const connectPublisher = async () => {
  const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
  const maxRetries = 10;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Подключение к RabbitMQ, попытка ${attempt}`);
      const connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue("enrollmentQueue");
      console.log("Подключение к RabbitMQ установлено");
      return;
    } catch (err) {
      console.error(`Ошибка подключения к RabbitMQ: ${err}`);
      if (attempt === maxRetries) {
        console.error("Превышено количество попыток подключения к RabbitMQ");
        throw err;
      }
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

export const publishEnrollment = (message: object) => {
  if (!channel) throw new Error("RabbitMQ channel not established");
  channel.sendToQueue("enrollmentQueue", Buffer.from(JSON.stringify(message)));
};
