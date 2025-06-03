import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost",
  );
  channel = await connection.createChannel();
  await channel.assertQueue("enrollment_queue");
  console.log("RabbitMQ connected (user-service)");
};

export const sendToQueue = async (data: any) => {
  if (!channel) {
    throw new Error("Channel not initialized");
  }
  channel.sendToQueue("enrollment_queue", Buffer.from(JSON.stringify(data)));
};
